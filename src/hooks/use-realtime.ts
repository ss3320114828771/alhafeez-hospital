'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface RealtimeOptions {
  enabled?: boolean
  onMessage?: (data: any) => void
  onStatusChange?: (status: ConnectionStatus) => void
  reconnectAttempts?: number
  reconnectDelay?: number
}

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error'

interface RealtimeMessage {
  type: string
  payload: any
  timestamp: string
}

export function useRealtime(options: RealtimeOptions = {}) {
  const {
    enabled = true,
    onMessage,
    onStatusChange,
    reconnectAttempts = 5,
    reconnectDelay = 3000
  } = options

  const [status, setStatus] = useState<ConnectionStatus>('disconnected')
  const [lastMessage, setLastMessage] = useState<RealtimeMessage | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectCountRef = useRef<number>(0)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Update status and call callback
  const updateStatus = useCallback((newStatus: ConnectionStatus) => {
    setStatus(newStatus)
    onStatusChange?.(newStatus)
  }, [onStatusChange])

  // Connect WebSocket
  const connect = useCallback(() => {
    if (!enabled) return

    try {
      updateStatus('connecting')
      
      // In production, use your actual WebSocket URL
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'
      const ws = new WebSocket(wsUrl)
      
      wsRef.current = ws

      ws.onopen = () => {
        console.log('WebSocket connected')
        updateStatus('connected')
        reconnectCountRef.current = 0
        setError(null)
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          const message: RealtimeMessage = {
            ...data,
            timestamp: data.timestamp || new Date().toISOString()
          }
          setLastMessage(message)
          onMessage?.(message)
        } catch (err) {
          console.error('Failed to parse message:', err)
        }
      }

      ws.onerror = (event) => {
        console.error('WebSocket error:', event)
        setError('Connection error')
        updateStatus('error')
      }

      ws.onclose = () => {
        console.log('WebSocket closed')
        updateStatus('disconnected')
        
        // Attempt to reconnect
        if (reconnectCountRef.current < reconnectAttempts) {
          reconnectCountRef.current++
          
          // Clear any existing timeout
          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
          }
          
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log(`Reconnecting... Attempt ${reconnectCountRef.current}`)
            connect()
          }, reconnectDelay * reconnectCountRef.current)
        }
      }
    } catch (err) {
      setError('Failed to connect')
      updateStatus('error')
    }
  }, [enabled, reconnectAttempts, reconnectDelay, updateStatus, onMessage])

  // Disconnect WebSocket
  const disconnect = useCallback(() => {
    // Clear any pending reconnect timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = undefined
    }
    
    // Close WebSocket connection
    if (wsRef.current) {
      // Remove event listeners to prevent memory leaks
      wsRef.current.onopen = null
      wsRef.current.onmessage = null
      wsRef.current.onerror = null
      wsRef.current.onclose = null
      
      // Close the connection
      wsRef.current.close()
      wsRef.current = null
    }
    
    // Reset reconnect counter
    reconnectCountRef.current = 0
    
    updateStatus('disconnected')
  }, [updateStatus])

  // Send message
  const sendMessage = useCallback((type: string, payload: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message: RealtimeMessage = {
        type,
        payload,
        timestamp: new Date().toISOString()
      }
      wsRef.current.send(JSON.stringify(message))
      return true
    }
    return false
  }, [])

  // Subscribe to specific event type
  const subscribe = useCallback((eventType: string, callback: (data: any) => void) => {
    // This is a placeholder for subscription logic
    // In a real implementation, you'd maintain a map of subscribers
    const messageHandler = (message: RealtimeMessage) => {
      if (message.type === eventType) {
        callback(message.payload)
      }
    }
    
    // Return unsubscribe function
    return () => {
      // Cleanup subscription
    }
  }, [])

  // Auto-connect on mount
  useEffect(() => {
    if (enabled) {
      connect()
    }

    return () => {
      disconnect()
    }
  }, [enabled, connect, disconnect])

  return {
    status,
    lastMessage,
    error,
    isConnected: status === 'connected',
    isConnecting: status === 'connecting',
    sendMessage,
    subscribe,
    reconnect: connect,
    disconnect
  }
}

// Specialized hooks for hospital use cases

export function usePatientUpdates(patientId: string) {
  const { status, lastMessage, sendMessage } = useRealtime({
    enabled: !!patientId,
    onMessage: (msg) => {
      if (msg.type === 'patient_update' && msg.payload.patientId === patientId) {
        // Handle patient update
        console.log('Patient updated:', msg.payload)
      }
    }
  })

  const requestPatientUpdate = useCallback(() => {
    sendMessage('request_patient_update', { patientId })
  }, [patientId, sendMessage])

  return {
    status,
    lastMessage,
    requestPatientUpdate
  }
}

export function useEmergencyAlerts() {
  const [alerts, setAlerts] = useState<any[]>([])
  
  const { status, lastMessage } = useRealtime({
    enabled: true,
    onMessage: (msg) => {
      if (msg.type === 'emergency_alert') {
        setAlerts(prev => [msg.payload, ...prev].slice(0, 10))
        
        // Play sound for emergency alerts
        if (msg.payload.severity === 'critical') {
          // You could play a sound here
          console.log('CRITICAL ALERT:', msg.payload)
        }
      }
    }
  })

  return {
    status,
    alerts,
    hasActiveAlerts: alerts.some(a => a.status === 'active')
  }
}

export function useAppointmentUpdates() {
  const [appointments, setAppointments] = useState<any[]>([])
  
  const { status, lastMessage } = useRealtime({
    enabled: true,
    onMessage: (msg) => {
      switch (msg.type) {
        case 'appointment_created':
          setAppointments(prev => [msg.payload, ...prev])
          break
        case 'appointment_updated':
          setAppointments(prev => 
            prev.map(apt => apt.id === msg.payload.id ? msg.payload : apt)
          )
          break
        case 'appointment_cancelled':
          setAppointments(prev => 
            prev.filter(apt => apt.id !== msg.payload.id)
          )
          break
      }
    }
  })

  return {
    status,
    appointments,
    lastUpdate: lastMessage
  }
}

export function useBedOccupancyUpdates() {
  const [occupancy, setOccupancy] = useState({
    total: 200,
    occupied: 156,
    available: 44,
    maintenance: 0
  })
  
  const { status, lastMessage } = useRealtime({
    enabled: true,
    onMessage: (msg) => {
      if (msg.type === 'bed_occupancy_update') {
        setOccupancy(msg.payload)
      }
    }
  })

  return {
    status,
    occupancy,
    occupancyRate: Math.round((occupancy.occupied / occupancy.total) * 100)
  }
}

export function useStaffUpdates() {
  const [onlineStaff, setOnlineStaff] = useState<string[]>([])
  
  const { status, sendMessage } = useRealtime({
    enabled: true,
    onMessage: (msg) => {
      if (msg.type === 'staff_status') {
        setOnlineStaff(msg.payload.online)
      }
    }
  })

  const updateStatus = useCallback((status: 'online' | 'away' | 'offline') => {
    sendMessage('update_staff_status', { status })
  }, [sendMessage])

  return {
    status,
    onlineStaff,
    onlineCount: onlineStaff.length,
    updateStatus
  }
}