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

  public static async sleep(duration = 500): Promise<void> {
    await new Promise((res) => setTimeout(res, duration));
  }

  public static generateAvatarText(username: string): string {
    return username
      .split(" ")
      .map((p) => p.slice(0, 1).toUpperCase())
      .join("");
  }
}
