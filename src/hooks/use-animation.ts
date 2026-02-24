'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// Counter Animation - COMPLETELY FIXED VERSION
export function useCounter(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState<number>(start)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  
  const elementRef = useRef<HTMLElement>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const startValueRef = useRef<number>(start)
  const endValueRef = useRef<number>(end)
  const durationRef = useRef<number>(duration)

  // Update refs when props change
  useEffect(() => {
    startValueRef.current = start
    endValueRef.current = end
    durationRef.current = duration
  }, [start, end, duration])

  // Animation function
  const animate = useCallback((currentTime: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = currentTime
    }

    const elapsedTime = currentTime - startTimeRef.current
    const progress = Math.min(elapsedTime / durationRef.current, 1)
    
    // Easing function (ease-out)
    const easedProgress = 1 - Math.pow(1 - progress, 3)
    
    const currentValue = startValueRef.current + (endValueRef.current - startValueRef.current) * easedProgress
    setCount(Math.round(currentValue))

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate)
    } else {
      setIsAnimating(false)
      startTimeRef.current = null
      animationRef.current = null
    }
  }, [])

  // Start animation function
  const startAnimation = useCallback(() => {
    // Don't start if already animating
    if (isAnimating) return
    
    setIsAnimating(true)
    startTimeRef.current = null
    
    // Cancel any existing animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    
    // Start new animation
    animationRef.current = requestAnimationFrame(animate)
  }, [animate, isAnimating])

  // Reset function
  const reset = useCallback(() => {
    // Cancel current animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    
    setCount(startValueRef.current)
    setIsAnimating(false)
    startTimeRef.current = null
  }, [])

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimating) {
            startAnimation()
          }
        })
      },
      { threshold: 0.5 }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
      
      // Clean up animation frame on unmount
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [startAnimation, isAnimating])

  return { 
    ref: elementRef, 
    count, 
    isAnimating,
    startAnimation,
    reset 
  }
}