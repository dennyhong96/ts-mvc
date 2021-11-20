import { ISSEService } from "@/types/interfaces/services/ISSEService";

export class SSEService implements ISSEService {
  public eventSourcesMap = new Map<string, EventSource>();
  public handlersMap = new Map<string, Set<(evt: MessageEvent) => void>>();
  public eventSourceCount = 0;

  registerEventsource(url: string, handler: (evt: MessageEvent) => void): void {
    console.log("eventSourceCount", this.eventSourceCount);
    if (!this.eventSourcesMap.get(url)) {
      const eventSource = new EventSource(url);
      eventSource.addEventListener("message", (evt) => {
        this.handlersMap.get(url)?.forEach((handler) => handler(evt));
      });
      this.eventSourcesMap.set(url, eventSource);
      this.eventSourceCount++;
    }

    if (!this.handlersMap.get(url)) {
      this.handlersMap.set(url, new Set<() => void>());
      this.handlersMap.get(url)!.add(handler);
    } else {
      this.handlersMap.get(url)!.add(handler);
    }
  }

  closeEventSource(url: string): void {
    console.log("closeEventSource", this.eventSourceCount);
    const eventSource = this.eventSourcesMap.get(url)!;
    if (!eventSource) return;
    eventSource.close();
    this.eventSourceCount--;
    this.handlersMap.delete(url);
    this.eventSourcesMap.delete(url);
  }
}
