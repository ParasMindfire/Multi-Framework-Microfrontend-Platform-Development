// packages/common/src/eventBus.ts (Pure JS - no JSX)
type EventCallback = (data: unknown) => void

class EventBus {
  private events: Map<string, Set<EventCallback>> = new Map()

  subscribe(event: string, callback: EventCallback): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set())
    }

    this.events.get(event)!.add(callback)

    return () => {
      this.events.get(event)?.delete(callback)
    }
  }

  publish(event: string, data?: unknown): void {
    const callbacks = this.events.get(event)

    if (callbacks) {
      callbacks.forEach((callback) => {
        try {
          callback(data)
        } catch (error) {
          console.error(`Error in ${event} handler:`, error)
        }
      })
    }
  }

  clear(): void {
    this.events.clear()
  }
}

export const eventBus = new EventBus()
