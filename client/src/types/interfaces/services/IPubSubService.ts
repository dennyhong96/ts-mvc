export interface IPubSubService {
  subscribe(key: string, fn: () => void): void;
  publish(key: string): void;
  clean(key: string): void;
}
