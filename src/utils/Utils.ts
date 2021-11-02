export class Utils {
  public static generateId(prefix = ""): string {
    return prefix + "_" + Math.random().toString(36).substr(2, 9);
  }

  public static async try<T>(action: Promise<T>): Promise<[T, null] | [null, unknown]> {
    try {
      const res = await action;
      return [res, null];
    } catch (error) {
      return [null, error];
    }
  }
}
