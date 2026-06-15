/**
 * 对象相关的工具函数
 */

/**
 * 安全获取深层嵌套属性
 */
export function get<T = unknown>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: T
): T | undefined {
  const keys = path.split(".");
  let result: unknown = obj;
  for (const key of keys) {
    if (result == null || typeof result !== "object") {
      return defaultValue;
    }
    result = (result as Record<string, unknown>)[key];
  }
  return (result as T) ?? defaultValue;
}

/**
 * 从对象中挑选指定 key 组成新对象
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      if (key in obj) {
        acc[key] = obj[key];
      }
      return acc;
    },
    {} as Pick<T, K>
  );
}

/**
 * 从对象中排除指定 key 组成新对象
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const keySet = new Set(keys as string[]);
  return Object.keys(obj).reduce(
    (acc, key) => {
      if (!keySet.has(key)) {
        (acc as Record<string, unknown>)[key] = obj[key];
      }
      return acc;
    },
    {} as Omit<T, K>
  );
}

/**
 * 判断对象是否为空
 */
export function isEmpty(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * 深度合并两个对象
 */
export function deepMerge<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>
>(target: T, source: U): T & U {
  const result = { ...target } as Record<string, unknown>;
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      result[key] &&
      typeof result[key] === "object" &&
      !Array.isArray(result[key])
    ) {
      result[key] = deepMerge(
        result[key] as Record<string, unknown>,
        source[key] as Record<string, unknown>
      );
    } else {
      result[key] = source[key];
    }
  }
  return result as T & U;
}
