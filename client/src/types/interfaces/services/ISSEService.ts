export interface ISSEService {
  eventSourcesMap: Map<string, EventSource>;
  handlersMap: Map<string, Set<(evt: MessageEvent) => void>>;
  eventSourceCount: number;
  registerEventsource(url: string, handler: (evt: MessageEvent) => void): void;
  closeEventSource(url: string): void;
}
