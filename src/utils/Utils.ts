export class Utils {
  public static generateId(): string {
    return "_" + Math.random().toString(36).substr(2, 9);
  }
}
