/**
 * 类型判断工具函数
 */

/** 获取值的原始类型字符串 */
export function getType(val: unknown): string {
  return Object.prototype.toString.call(val).slice(8, -1);
}

/** 是否为数组 */
export function isArray(val: unknown): val is unknown[] {
  return Array.isArray(val);
}

/** 是否为普通对象 */
export function isPlainObject(val: unknown): val is Record<string, unknown> {
  return getType(val) === "Object";
}

/** 是否为 Promise */
export function isPromise(val: unknown): val is Promise<unknown> {
  return (
    !!val &&
    typeof val === "object" &&
    typeof (val as Promise<unknown>).then === "function"
  );
}
