export interface IPubSubService {
  subscribe(fn: () => void): void;
  publish(): void;
  clean(): void;
}
