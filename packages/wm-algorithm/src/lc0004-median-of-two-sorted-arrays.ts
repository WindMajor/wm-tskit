/**
 * LeetCode 4. Median of Two Sorted Arrays
 *
 * 给定两个大小分别为 m 和 n 的正序数组 nums1 和 nums2，找出并返回这两个正序数组的中位数。
 *
 * @see https://leetcode.cn/problems/median-of-two-sorted-arrays/
 */

/*
二分查找较短的数组
时间复杂度：O(log(min(m, n)))
空间复杂度：O(1)
*/
export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // 保证 nums1 始终是较短的数组，以减少二分查找次数
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const m = nums1.length;
  const n = nums2.length;
  const halfLen = Math.floor((m + n + 1) / 2);

  let left = 0;
  let right = m;

  while (left <= right) {
    const i = Math.floor((left + right) / 2); // nums1 的切分位置
    const j = halfLen - i; // nums2 的切分位置

    const nums1LeftMax = i === 0 ? -Infinity : nums1[i - 1];
    const nums1RightMin = i === m ? Infinity : nums1[i];
    const nums2LeftMax = j === 0 ? -Infinity : nums2[j - 1];
    const nums2RightMin = j === n ? Infinity : nums2[j];

    if (nums1LeftMax <= nums2RightMin && nums2LeftMax <= nums1RightMin) {
      // 找到正确的切分点
      if ((m + n) % 2 === 1) {
        return Math.max(nums1LeftMax, nums2LeftMax);
      } else {
        return (Math.max(nums1LeftMax, nums2LeftMax) + Math.min(nums1RightMin, nums2RightMin)) / 2;
      }
    } else if (nums1LeftMax > nums2RightMin) {
      // nums1 左半部分太大，向左收缩
      right = i - 1;
    } else {
      // nums1 右半部分太小，向右扩展
      left = i + 1;
    }
  }

  // 根据约束 1 <= m + n，不会走到这里
  throw new Error('Input arrays are invalid');
}

/*
暴力解法：先合并数组再取中位数，用于对比
时间复杂度: O((m+n) log(m+n))
 - 合并数组: O(m+n)
 - 排序: O((m+n) log(m+n)) ← 主要开销
 - 取值: O(1)
*/
function findMedianSortedArrays_2(nums1: number[], nums2: number[]): number {
  const merged = [...nums1, ...nums2].sort((a, b) => a - b);
  const mid = Math.floor(merged.length / 2);

  if (merged.length % 2 === 1) {
    return merged[mid];
  } else {
    return (merged[mid - 1] + merged[mid]) / 2;
  }
}

/*
双指针归并(优化版)
时间复杂度: O(m+n) - 只需要遍历到中位数位置 空间复杂度: O(1) - 只用几个变量
*/
function findMedianSortedArrays_3(nums1: number[], nums2: number[]): number {
  const m = nums1.length;
  const n = nums2.length;
  const total = m + n;
  const half = Math.floor(total / 2);

  let i = 0,
    j = 0;
  let current = 0,
    prev = 0;

  for (let k = 0; k <= half; k++) {
    prev = current;

    if (i < m && (j >= n || nums1[i] <= nums2[j])) {
      current = nums1[i++];
    } else {
      current = nums2[j++];
    }
  }

  if (total % 2 === 1) {
    return current;
  } else {
    return (prev + current) / 2;
  }
}

// ========== 内联测试 ==========
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('LC0004 Median of Two Sorted Arrays', () => {
    it('示例 1', () => {
      expect(findMedianSortedArrays([1, 3], [2])).toBe(2);
    });

    it('示例 2', () => {
      expect(findMedianSortedArrays([1, 2], [3, 4])).toBe(2.5);
    });

    it('一个数组为空', () => {
      expect(findMedianSortedArrays([], [1])).toBe(1);
    });

    it('长度相差较大的数组', () => {
      expect(findMedianSortedArrays([1, 2], [3, 4, 5, 6, 7, 8, 9])).toBe(5);
    });

    it('包含负数', () => {
      expect(findMedianSortedArrays([-5, 3, 6], [-2, -1, 0])).toBe(-0.5);
    });
  });
}
