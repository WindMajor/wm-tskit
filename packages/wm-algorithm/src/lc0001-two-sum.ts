/**
 * LeetCode 1. Two Sum
 *
 * 给定一个整数数组 nums 和一个整数目标值 target，
 * 请在该数组中找出和为目标值 target 的那两个数，并返回它们的数组下标。
 *
 * - 时间复杂度：O(n)
 * - 空间复杂度：O(n)
 *
 * @see https://leetcode.cn/problems/two-sum/
 */
export function twoSum(nums: number[], target: number): number[] {
  const map: Record<number, number> = {};

  for (let i = 0, len = nums.length; i < len; i++) {
    const diff = target - nums[i];
    if (diff in map) {
      return [map[diff], i];
    }
    map[nums[i]] = i;
  }

  return [];
}

// ========== 内联测试 ==========
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('LC0001 Two Sum', () => {
    it('示例 1', () => {
      expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
    });

    it('示例 2', () => {
      expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
    });

    it('示例 3', () => {
      expect(twoSum([3, 3], 6)).toEqual([0, 1]);
    });
  });
}
