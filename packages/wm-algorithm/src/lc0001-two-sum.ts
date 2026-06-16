/**
 * LeetCode 1. Two Sum
 *
 * 给定一个整数数组 nums 和一个整数目标值 target，
 * 请在该数组中找出和为目标值 target 的那两个数，并返回它们的数组下标。
 *
 * @see https://leetcode.cn/problems/two-sum/
 */

/*
普通对象哈希表，也是 JS 祖传的哈希表。键会自动转字符串，比如 map[2] = 0; 实际存的是 map["2"] = 0
普通对象哈希表的大坑："toString" in obj;   // true！← 原型上的
时间复杂度：O(n)
空间复杂度：O(n)
3ms
 */
export function twoSum(nums: number[], target: number): number[] {
  // const map: Record<number, number> = {}; // 有原型链污染风险，toString" in obj; 得到true
  const map: Record<number, number> = Object.create(null); // 无原型链污染风险 "toString" in obj; 得到false

  for (let i = 0, len = nums.length; i < len; i++) {
    const diff = target - nums[i];
    if (diff in map) {
      return [map[diff], i];
    }
    map[nums[i]] = i;
  }
  return [];
}

/*
Map哈希表。专用哈希表，键保持原类型，键可以是对象类型，适合频繁增删
时间复杂度：O(n)
空间复杂度：O(n)
4ms
 */
export function twoSum_2(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0, len = nums.length; i < len; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}

export function twoSum_2_safe(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0, len = nums.length; i < len; i++) {
    const diff = target - nums[i];
    const j = map.get(diff);
    // if (j !== undefined) {  // 直接值检查，进行类型守卫
    if (typeof j === 'number') {
      // 主动类型守卫
      return [j, i];
    }
    map.set(nums[i], i);
  }
  return [];
}

/*
普通对象哈希表，两次遍历。遇到重复数字，会覆盖，只保留最后一个出现的，但不影响正确性
时间复杂度：O(n)
空间复杂度：O(n)
 */
function twoSum_3(nums: number[], target: number): number[] {
  const map: Record<number, number> = Object.create(null);
  for (let i = 0; i < nums.length; i++) {
    map[nums[i]] = i;
  }
  for (let i = 0; i < nums.length; i++) {
    const j = map[target - nums[i]]; // 如果不存在，得到的是 undefined
    if (j !== i) {
      return [i, j];
    }
  }
  return [];
}

/*
排序 + 双指针
时间复杂度：O(n log n)
空间复杂度：O(1)
 */
function twoSum_4(nums: number[], target: number): number[] {
  // const indexed: number[][] = nums.map((v, i) => [v, i]); // 二维数组类型，v是值，i是索引，变成 [[v1, 0], [v2, 1], ...]
  const idxArr: [number, number][] = nums.map((v, i) => [v, i]); // 二维数组类型，指定内层数组是2个数字

  idxArr.sort((a, b) => a[0] - b[0]);

  let l = 0,
    r = idxArr.length - 1;
  while (l < r) {
    const sum = idxArr[l][0] + idxArr[r][0];
    if (sum === target) return [idxArr[l][1], idxArr[r][1]];
    sum < target ? l++ : r--;
  }
  return [];
}

/*
排序 + 二分查找
时间复杂度：O(n log n)
空间复杂度：O(n)
 */
function twoSum_5(nums: number[], target: number): number[] {
  // 创建带索引的数组并排序
  const idxArr: [number, number][] = nums.map((v, i) => [v, i]);
  idxArr.sort((a, b) => a[0] - b[0]);

  // 对每个元素，用二分查找寻找 complement
  for (let i = 0; i < idxArr.length; i++) {
    const diff = target - idxArr[i][0];
    let l = i + 1;
    let r = idxArr.length - 1;

    // 二分查找
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      const midValue = idxArr[mid][0];

      if (midValue === diff) {
        return [idxArr[i][1], idxArr[mid][1]];
      } else if (midValue < diff) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
  }
  return [];
}

/*
暴力枚举
时间复杂度：O(n²)
空间复杂度：O(1)
 */
function twoSum_6(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
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
