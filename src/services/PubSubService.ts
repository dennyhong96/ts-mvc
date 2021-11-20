import { IPubSubService } from "@/types/interfaces/services/IPubSubService";

export class PubSubService implements IPubSubService {
  public subscribers: Set<() => void> = new Set();

  public subscribe(fn: () => void): void {
    this.subscribers.add(fn);
    console.log("subscribe", this.subscribers);
  }

  public publish(): void {
    this.subscribers.forEach((subscriber) => subscriber());
  }

  public clean(): void {
    this.subscribers.clear();
  }
}
