import { IPubSubService } from "@/types/interfaces/services/IPubSubService";

export class PubSubService implements IPubSubService {
  public subscribersMap: Map<string, Set<() => void>> = new Map<string, Set<() => void>>();

  public subscribe(key: string, fn: () => void): void {
    console.log("subscribe", { key, fn });
    if (!this.subscribersMap.get(key)) {
      this.subscribersMap.set(key, new Set<() => void>());
    }
    this.subscribersMap.get(key)!.add(fn);
  }

  public publish(key: string): void {
    console.log("publish", { key });
    this.subscribersMap.get(key)?.forEach((subscriber) => subscriber());
  }

  public clean(key: string, fn?: () => void): void {
    console.log("clean", { key, fn });
    const set = this.subscribersMap.get(key);
    if (!set) return;
    if (fn) {
      set.delete(fn);
    } else {
      set.clear();
    }
  }
}
