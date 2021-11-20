import { IPubSubService } from "@/types/interfaces/services/IPubSubService";

export class PubSubService implements IPubSubService {
  public subscribersMap: Map<string, Set<() => void>> = new Map<string, Set<() => void>>();

  public subscribe(key: string, fn: () => void): void {
    if (!this.subscribersMap.get(key)) {
      this.subscribersMap.set(key, new Set<() => void>());
    }
    this.subscribersMap.get(key)!.add(fn);
  }

  public publish(key: string): void {
    this.subscribersMap.get(key)?.forEach((subscriber) => subscriber());
  }

  public clean(key: string): void {
    this.subscribersMap.get(key)?.clear();
  }
}
