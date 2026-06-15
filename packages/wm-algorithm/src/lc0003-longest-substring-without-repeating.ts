/**
 * LeetCode 3. Longest Substring Without Repeating Characters
 *
 * 给定一个字符串 s，请你找出其中不含有重复字符的最长子串的长度。
 *
 * - 时间复杂度：O(n)  滑动窗口，每个字符最多被访问两次
 * - 空间复杂度：O(m)  m 为字符集大小
 *
 * @see https://leetcode.cn/problems/longest-substring-without-repeating-characters/
 */
export function lengthOfLongestSubstring(s: string): number {
  const lastSeen: Record<string, number> = {};

  let maxLen = 0;
  let l = 0;
  let r = 0;

  for (r = 0; r < s.length; r++) {
    const i = lastSeen[s[r]]; // 如果不存在，返回的是 undefined

    if (i >= l) {
      // undefined 跟任何数字比大小，结果都是 false。要小心 null 会被转成 0，所以能比出结果，但null除非手动设置，不然几乎不遇到
      l = i + 1; // 如果字符在当前窗口内出现过，收缩左边界
    }

    lastSeen[s[r]] = r;
    maxLen = Math.max(maxLen, r - l + 1);
  }

  return maxLen;
}

// ========== 内联测试 ==========
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('LC0003 Longest Substring Without Repeating', () => {
    it('示例 1', () => {
      expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
    });

    it('示例 2', () => {
      expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
    });

    it('示例 3', () => {
      expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
    });

    it('空字符串', () => {
      expect(lengthOfLongestSubstring('')).toBe(0);
    });

    it('单字符', () => {
      expect(lengthOfLongestSubstring('a')).toBe(1);
    });
  });
}
