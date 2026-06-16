/**
 * LeetCode 3. Longest Substring Without Repeating Characters
 *
 * 给定一个字符串 s，请你找出其中不含有重复字符的最长子串的长度。
 *
 * @see https://leetcode.cn/problems/longest-substring-without-repeating-characters/
 */

/*
滑动窗口 + Set（逐字符收缩）
时间复杂度：O(n)
空间复杂度：O(m)  m 为字符集大小
*/
export function lengthOfLongestSubstring(s: string): number {
  const set = new Set<string>();
  let max = 0,
    l = 0;
  for (let r = 0; r < s.length; r++) {
    while (set.has(s[r])) {
      set.delete(s[l++]);
    }
    set.add(s[r]);
    max = Math.max(max, r - l + 1);
  }
  return max;
}

/*
定长数组（纯 ASCII 输入时），速度最快，性能最优
时间复杂度：O(n)
空间复杂度：O(1)
3ms
*/
export function lengthOfLongestSubstring_2(s: string): number {
  const seen = new Int32Array(128).fill(-1);
  let max = 0,
    l = 0;
  for (let r = 0; r < s.length; r++) {
    const code: number = s.charCodeAt(r); // 得到的是数字
    const i: number = seen[code];
    if (i >= l) {
      l = i + 1;
    }
    seen[code] = r;
    max = Math.max(max, r + 1 - l);
  }
  return max;
}

/*
Record 跳跃缩窗
时间复杂度：O(n)
空间复杂度：O(m)
18ms
*/
export function lengthOfLongestSubstring_3(s: string): number {
  const lastSeen: Record<string, number> = {};

  let maxLen = 0,
    l = 0,
    r = 0;

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

/*
暴力枚举
时间复杂度：O(n³)
*/
export function lengthOfLongestSubstring_4(s: string): number {
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      if (new Set(s.slice(i, j + 1)).size === j - i + 1) {
        max = Math.max(max, j - i + 1);
      }
    }
  }
  return max;
}

/*
动态规划
核心递推：dp = min(dp + 1, i - prev)
时间复杂度：O(n)
空间复杂度：O(m)
*/
function lengthOfLongestSubstring_5(s: string): number {
  const lastSeen = new Map<string, number>();
  let dp = 0,
    max = 0; // dp = 以当前字符结尾的最长无重复子串长度

  for (let i = 0; i < s.length; i++) {
    const prev = lastSeen.get(s[i]) ?? -1;
    dp = Math.min(dp + 1, i - prev); // 核心递推
    lastSeen.set(s[i], i);
    max = Math.max(max, dp);
  }
  return max;
}

/*
二分答案
猜长度 k → 定长滑动窗口验证是否存在长度为 k 的无重复子串
时间复杂度：O(n log n)
空间复杂度：O(m)
*/
function lengthOfLongestSubstring_6(s: string): number {
  const hasUniqueLenK = (k: number): boolean => {
    const count: Record<string, number> = {};
    let dupes = 0;
    for (let i = 0; i < s.length; i++) {
      count[s[i]] = (count[s[i]] ?? 0) + 1;
      if (count[s[i]] === 2) dupes++;
      if (i >= k) {
        count[s[i - k]]--;
        if (count[s[i - k]] === 1) dupes--;
      }
      if (i >= k - 1 && dupes === 0) return true;
    }
    return false;
  };

  let lo = 0,
    hi = s.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    hasUniqueLenK(mid) ? (lo = mid) : (hi = mid - 1);
  }
  return lo;
}

/*
双指针无额外空间
每个起点独立探索窗口，不需要哈希存位置
时间复杂度：O(n²)
空间复杂度：O(m)（每轮重建 Set）
*/
function lengthOfLongestSubstring_7(s: string): number {
  let max = 0;
  for (let l = 0; l < s.length; l++) {
    const seen = new Set<string>();
    for (let r = l; r < s.length; r++) {
      if (seen.has(s[r])) break;
      seen.add(s[r]);
      max = Math.max(max, r - l + 1);
    }
  }
  return max;
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
