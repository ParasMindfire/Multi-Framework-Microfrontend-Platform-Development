import React, { createContext, useContext, useEffect } from 'react'

type EventCallback = (data: any) => void

class EventBus {
  private events: Map<string, EventCallback[]> = new Map()

  subscribe(event: string, callback: EventCallback): () => void {
    console.log('subscribe ho rha kya ? ')
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }

    const callbacks = this.events.get(event)!
    callbacks.push(callback)

    return () => {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  publish(event: string, data?: any): void {
    console.log('data ahh' + data)
    const callbacks = this.events.get(event)
    if (callbacks) {
      callbacks.forEach((callback) => {
        try {
          callback(data)
        } catch (error) {
          console.error(`Error in event handler for ${event}:`, error)
        }
      })
    }
  }

  unsubscribe(event: string, callback?: EventCallback): void {
    if (!callback) {
      this.events.delete(event)
      return
    }

    const callbacks = this.events.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  clear(): void {
    this.events.clear()
  }
}

export const eventBus = new EventBus()

interface EventBusContextValue {
  eventBus: EventBus
  subscribe: (event: string, callback: EventCallback) => () => void
  publish: (event: string, data?: any) => void
}

const EventBusContext = createContext<EventBusContextValue | null>(null)

export function EventBusProvider({ children }: { children: React.ReactNode }) {
  console.log('EventBusProvider mounted')
  const value: EventBusContextValue = {
    eventBus,
    subscribe: (event, callback) => eventBus.subscribe(event, callback),
    publish: (event, data) => eventBus.publish(event, data),
  }

  return <EventBusContext.Provider value={value}>{children}</EventBusContext.Provider>
}

export function useEventBus() {
  const context = useContext(EventBusContext)
  if (!context) {
    throw new Error('useEventBus must be used within EventBusProvider')
  }
  return context
}

export function useEventSubscription(event: string, callback: EventCallback) {
  const { subscribe } = useEventBus()

  useEffect(() => {
    const unsubscribe = subscribe(event, callback)
    return unsubscribe
  }, [event, callback, subscribe])
}
