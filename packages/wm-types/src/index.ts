/**
 * 通用 TypeScript 类型定义
 */

/** 可为空的类型 */
export type Nullable<T> = T | null | undefined;

/** 深度只读 */
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

/** 深度可选 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/** 提取 Promise 包裹的类型 */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

/** 将联合类型转为交叉类型 */
export type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/** 排除值为 never 的键 */
export type PickByValue<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};
