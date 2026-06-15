/**
 * 字符串相关的工具函数
 */

/**
 * 驼峰转短横线 kebab-case
 */
export function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

/**
 * 短横线转驼峰 camelCase
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
}

/**
 * 大写首字母
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 安全截断字符串并添加省略号
 */
export function truncate(str: string, maxLen: number, suffix = "..."): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - suffix.length) + suffix;
}

/**
 * 生成随机字符串
 */
export function randomStr(length = 8): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 移除字符串中所有的空白字符
 */
export function stripWhitespace(str: string): string {
  return str.replace(/\s+/g, "");
}
