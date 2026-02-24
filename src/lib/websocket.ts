// Types
export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error'

export interface WebSocketMessage {
  type: string
  payload: any
  timestamp: string
  messageId?: string
}

export interface WebSocketConfig {
  url?: string
  reconnectAttempts?: number
  reconnectDelay?: number
  heartbeatInterval?: number
  onOpen?: (event: Event) => void
  onMessage?: (message: WebSocketMessage) => void
  onClose?: (event: CloseEvent) => void
  onError?: (event: Event) => void
  onReconnect?: (attempt: number) => void
}

export interface WebSocketSubscription {
  unsubscribe: () => void
}

// WebSocket Manager Class
class WebSocketManager {
  private static instance: WebSocketManager
  private ws: WebSocket | null = null
  private status: WebSocketStatus = 'disconnected'
  private messageQueue: WebSocketMessage[] = []
  private subscribers: Map<string, Set<(message: WebSocketMessage) => void>> = new Map()
  private reconnectCount = 0
  private reconnectTimeout: NodeJS.Timeout | null = null
  private heartbeatInterval: NodeJS.Timeout | null = null
  private config: WebSocketConfig = {}
  private messageCounter = 0

  private constructor() {}

  static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager()
    }
    return WebSocketManager.instance
  }

  // Connect to WebSocket server
  connect(config: WebSocketConfig = {}): void {
    this.config = {
      url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
      reconnectAttempts: 5,
      reconnectDelay: 3000,
      heartbeatInterval: 30000,
      ...config
    }

    if (this.ws?.readyState === WebSocket.OPEN) {
      return
    }

    this.updateStatus('connecting')
    
    try {
      this.ws = new WebSocket(this.config.url!)

      this.ws.onopen = (event) => {
        this.updateStatus('connected')
        this.reconnectCount = 0
        this.processMessageQueue()
        this.startHeartbeat()
        this.config.onOpen?.(event)
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as WebSocketMessage
          this.handleMessage(data)
          this.config.onMessage?.(data)
        } catch (error) {
          console.error('Failed to parse message:', error)
        }
      }

      this.ws.onclose = (event) => {
        this.updateStatus('disconnected')
        this.stopHeartbeat()
        this.config.onClose?.(event)
        this.handleReconnect()
      }

      this.ws.onerror = (event) => {
        this.updateStatus('error')
        this.config.onError?.(event)
      }
    } catch (error) {
      console.error('WebSocket connection error:', error)
      this.updateStatus('error')
      this.handleReconnect()
    }
  }

  // Disconnect WebSocket
  disconnect(): void {
    this.stopHeartbeat()
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }

    if (this.ws) {
      this.ws.close()
      this.ws = null
    }

    this.updateStatus('disconnected')
    this.reconnectCount = 0
  }

  // Send message
  send(type: string, payload: any, retryOnDisconnect: boolean = true): boolean {
    const message: WebSocketMessage = {
      type,
      payload,
      timestamp: new Date().toISOString(),
      messageId: `msg_${Date.now()}_${this.messageCounter++}`
    }

    if (this.isConnected()) {
      try {
        this.ws?.send(JSON.stringify(message))
        return true
      } catch (error) {
        console.error('Failed to send message:', error)
        if (retryOnDisconnect) {
          this.messageQueue.push(message)
        }
        return false
      }
    } else {
      if (retryOnDisconnect) {
        this.messageQueue.push(message)
      }
      return false
    }
  }

  // Subscribe to message type
  subscribe(type: string, callback: (message: WebSocketMessage) => void): WebSocketSubscription {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set())
    }

    this.subscribers.get(type)!.add(callback)

    return {
      unsubscribe: () => {
        const callbacks = this.subscribers.get(type)
        if (callbacks) {
          callbacks.delete(callback)
          if (callbacks.size === 0) {
            this.subscribers.delete(type)
          }
        }
      }
    }
  }

  // Subscribe to multiple message types
  subscribeToMany(types: string[], callback: (message: WebSocketMessage) => void): WebSocketSubscription {
    const subscriptions = types.map(type => this.subscribe(type, callback))
    
    return {
      unsubscribe: () => {
        subscriptions.forEach(sub => sub.unsubscribe())
      }
    }
  }

  // Get connection status
  getStatus(): WebSocketStatus {
    return this.status
  }

  // Check if connected
  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }

  // Get message queue length
  getQueueLength(): number {
    return this.messageQueue.length
  }

  // Clear message queue
  clearQueue(): void {
    this.messageQueue = []
  }

  // Reconnect
  reconnect(): void {
    this.disconnect()
    this.connect(this.config)
  }

  // Update status
  private updateStatus(newStatus: WebSocketStatus): void {
    this.status = newStatus
  }

  // Handle reconnection
  private handleReconnect(): void {
    if (this.reconnectCount >= (this.config.reconnectAttempts || 5)) {
      return
    }

    this.reconnectCount++
    
    const delay = (this.config.reconnectDelay || 3000) * this.reconnectCount
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
    }

    this.reconnectTimeout = setTimeout(() => {
      this.config.onReconnect?.(this.reconnectCount)
      this.connect(this.config)
      this.reconnectTimeout = null
    }, delay)
  }

  // Process queued messages
  private processMessageQueue(): void {
    while (this.messageQueue.length > 0 && this.isConnected()) {
      const message = this.messageQueue.shift()
      if (message) {
        this.ws?.send(JSON.stringify(message))
      }
    }
  }

  // Start heartbeat
  private startHeartbeat(): void {
    this.stopHeartbeat()
    
    this.heartbeatInterval = setInterval(() => {
      if (this.isConnected()) {
        this.send('heartbeat', { timestamp: Date.now() }, false)
      }
    }, this.config.heartbeatInterval || 30000)
  }

  // Stop heartbeat
  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  // Handle incoming message
  private handleMessage(message: WebSocketMessage): void {
    // Call general subscribers
    const generalSubscribers = this.subscribers.get('*')
    if (generalSubscribers) {
      generalSubscribers.forEach(callback => callback(message))
    }

    // Call type-specific subscribers
    const typeSubscribers = this.subscribers.get(message.type)
    if (typeSubscribers) {
      typeSubscribers.forEach(callback => callback(message))
    }
  }
}

// Export singleton instance
export const ws = WebSocketManager.getInstance()

// React hook for WebSocket
export function useWebSocket() {
  return {
    connect: ws.connect.bind(ws),
    disconnect: ws.disconnect.bind(ws),
    send: ws.send.bind(ws),
    subscribe: ws.subscribe.bind(ws),
    subscribeToMany: ws.subscribeToMany.bind(ws),
    getStatus: ws.getStatus.bind(ws),
    isConnected: ws.isConnected.bind(ws),
    reconnect: ws.reconnect.bind(ws),
    getQueueLength: ws.getQueueLength.bind(ws),
    clearQueue: ws.clearQueue.bind(ws)
  }
}

// Hospital-specific message types
export const MessageTypes = {
  // Patient updates
  PATIENT_ADMITTED: 'patient_admitted',
  PATIENT_DISCHARGED: 'patient_discharged',
  PATIENT_TRANSFERRED: 'patient_transferred',
  PATIENT_VITALS_UPDATED: 'patient_vitals_updated',
  
  // Emergency alerts
  EMERGENCY_ALERT: 'emergency_alert',
  CODE_BLUE: 'code_blue',
  CODE_RED: 'code_red',
  
  // Appointments
  APPOINTMENT_SCHEDULED: 'appointment_scheduled',
  APPOINTMENT_CANCELLED: 'appointment_cancelled',
  APPOINTMENT_UPDATED: 'appointment_updated',
  
  // Bed management
  BED_OCCUPANCY_UPDATED: 'bed_occupancy_updated',
  BED_AVAILABLE: 'bed_available',
  
  // Staff updates
  STAFF_ONLINE: 'staff_online',
  STAFF_OFFLINE: 'staff_offline',
  STAFF_STATUS_CHANGED: 'staff_status_changed',
  
  // Lab results
  LAB_RESULT_READY: 'lab_result_ready',
  LAB_RESULT_CRITICAL: 'lab_result_critical',
  
  // System
  HEARTBEAT: 'heartbeat',
  SYSTEM_ALERT: 'system_alert',
  MAINTENANCE: 'maintenance'
} as const

// Helper functions for hospital-specific messages

// Send patient update
export function sendPatientUpdate(patientId: string, update: any): boolean {
  return ws.send(MessageTypes.PATIENT_VITALS_UPDATED, { patientId, ...update })
}

// Send emergency alert
export function sendEmergencyAlert(alert: {
  type: string
  location: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
}): boolean {
  return ws.send(MessageTypes.EMERGENCY_ALERT, {
    ...alert,
    timestamp: new Date().toISOString()
  })
}

// Send bed update
export function sendBedUpdate(departmentId: string, availableBeds: number, totalBeds: number): boolean {
  return ws.send(MessageTypes.BED_OCCUPANCY_UPDATED, {
    departmentId,
    availableBeds,
    totalBeds,
    occupancyRate: Math.round((1 - availableBeds / totalBeds) * 100)
  })
}

// Send staff status
export function sendStaffStatus(staffId: string, status: 'online' | 'away' | 'offline'): boolean {
  return ws.send(MessageTypes.STAFF_STATUS_CHANGED, {
    staffId,
    status,
    timestamp: new Date().toISOString()
  })
}

// Send lab result
export function sendLabResult(testId: string, patientId: string, result: any, isCritical: boolean): boolean {
  return ws.send(
    isCritical ? MessageTypes.LAB_RESULT_CRITICAL : MessageTypes.LAB_RESULT_READY,
    {
      testId,
      patientId,
      result,
      timestamp: new Date().toISOString()
    }
  )
}

// Subscribe to patient updates
export function subscribeToPatient(patientId: string, callback: (message: WebSocketMessage) => void): WebSocketSubscription {
  return ws.subscribeToMany(
    [
      MessageTypes.PATIENT_VITALS_UPDATED,
      MessageTypes.PATIENT_ADMITTED,
      MessageTypes.PATIENT_DISCHARGED,
      MessageTypes.PATIENT_TRANSFERRED
    ],
    (message) => {
      if (message.payload.patientId === patientId) {
        callback(message)
      }
    }
  )
}

// Subscribe to emergency alerts
export function subscribeToEmergencies(callback: (message: WebSocketMessage) => void): WebSocketSubscription {
  return ws.subscribeToMany(
    [MessageTypes.EMERGENCY_ALERT, MessageTypes.CODE_BLUE, MessageTypes.CODE_RED],
    callback
  )
}

// Subscribe to department updates
export function subscribeToDepartment(departmentId: string, callback: (message: WebSocketMessage) => void): WebSocketSubscription {
  return ws.subscribe(MessageTypes.BED_OCCUPANCY_UPDATED, (message) => {
    if (message.payload.departmentId === departmentId) {
      callback(message)
    }
  })
}

// Subscribe to all messages (for debugging)
export function subscribeToAll(callback: (message: WebSocketMessage) => void): WebSocketSubscription {
  return ws.subscribe('*', callback)
}