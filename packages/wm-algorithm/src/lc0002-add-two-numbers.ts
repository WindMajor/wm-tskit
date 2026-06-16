/**
 * LeetCode 2. Add Two Numbers
 *
 * 给你两个非空的链表，表示两个非负的整数。
 * 每位数字都是按照逆序方式存储的，每个节点只能存储一位数字。
 * 将两个数相加，并以相同形式返回一个表示和的链表。
 *
 * @see https://leetcode.cn/problems/add-two-numbers/
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }
}

/*
迭代法（模拟进位加法）

核心思路：
1. 使用哑节点(dummy)简化链表头处理
2. 同时遍历两个链表，逐位相加并处理进位
3. 当两个链表都遍历完且无进位时结束

算法步骤：
- 初始化哑节点和当前指针，进位 carry = 0
- 循环条件：l1 或 l2 不为空，或 carry > 0
- 计算当前位的和：l1.val + l2.val + carry
- 更新进位：carry = Math.floor(sum / 10)
- 创建新节点存储当前位结果：sum % 10
- 移动指针到下一位

时间复杂度：O(max(m, n)) - m、n 分别为两个链表的长度
空间复杂度：O(max(m, n)) - 结果链表最多 max(m, n) + 1 个节点

优点：
- 无副作用，不修改输入链表
- 稳定可靠，无栈溢出风险
- 面试高频解法，易于理解和实现

边界情况：
- 两个链表长度不同
- 最高位产生进位（如 999 + 1 = 1000）
- 其中一个或两个链表为空（题目保证非空，但代码已兼容）
*/
export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  let curr = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
    carry = Math.floor(sum / 10);
    curr.next = new ListNode(sum % 10);
    curr = curr.next;
    l1 = l1?.next ?? null;
    l2 = l2?.next ?? null;
  }

  return dummy.next;
}

/*
递归法

核心思路：
1. 将迭代过程转化为递归分解
2. 每次递归处理当前位的加法，将剩余部分交给下一层递归
3. 通过基准条件（两个节点为空且无进位）终止递归

算法步骤：
- 定义内部 helper 函数，接收两个节点和进位值
- 基准条件：node1、node2 都为空且 carry = 0 时返回 null
- 计算当前位的和：node1.val + node2.val + carry
- 计算新进位：newCarry = Math.floor(sum / 10)
- 创建当前位节点：result = new ListNode(sum % 10)
- 递归处理下一位：result.next = helper(node1.next, node2.next, newCarry)
- 返回结果节点

时间复杂度：O(max(m, n)) - m、n 分别为两个链表的长度
空间复杂度：O(max(m, n)) - 递归调用栈深度最多 max(m, n) + 1

优点：
- 代码简洁优雅，逻辑清晰直观
- 符合函数式编程思想，无显式循环
- 易于理解递归分解的思维模式

缺点：
- 链表很长时可能导致栈溢出（JavaScript 调用栈限制）
- 递归调用有额外的函数调用开销
- 调试相对困难（需要跟踪递归栈）

适用场景：
- 链表长度适中（通常 < 10000 节点）
- 教学演示递归思维
- 面试中展示不同解题思路

边界情况：
- 两个链表长度不同（通过可选链 ?? 处理）
- 最高位产生进位（递归自然处理）
- 其中一个或两个链表为空（题目保证非空，但代码已兼容）
*/
export function addTwoNumbers_2(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  function helper(node1: ListNode | null, node2: ListNode | null, carry: number): ListNode | null {
    if (!node1 && !node2 && carry === 0) {
      return null;
    }

    const sum = (node1?.val ?? 0) + (node2?.val ?? 0) + carry;
    const newCarry = Math.floor(sum / 10);
    const result = new ListNode(sum % 10);

    result.next = helper(node1?.next ?? null, node2?.next ?? null, newCarry);
    return result;
  }

  return helper(l1, l2, 0);
}

/*
BigInt 转换法

核心思路：
1. 将链表转换为 BigInt 类型的整数
2. 利用 BigInt 的无限精度特性进行加法运算
3. 将结果转换回链表形式

算法步骤：
- 定义 toBigInt 函数：遍历链表，逐位累加构建 BigInt 数值
  - 初始化 num = 0n, multiplier = 1n（表示位权）
  - 遍历链表：num += val * multiplier，multiplier *= 10
  - 返回最终的 BigInt 数值
- 定义 toListNodeFromBigInt 函数：将 BigInt 数值转换回链表
  - 特殊情况：num = 0n 时直接返回 ListNode(0)
  - 初始化哑节点和当前指针
  - 循环取模：num % 10n 得到最低位，创建节点
  - 整除降位：num /= 10n，继续处理下一位
  - 返回结果链表
- 主流程：toBigInt(l1) + toBigInt(l2) → toListNodeFromBigInt(result)

时间复杂度：O(m + n) - m、n 分别为两个链表的长度
空间复杂度：O(max(m, n)) - 结果链表最多 max(m, n) + 1 个节点

优点：
- 代码逻辑直观，符合人类思维习惯（先转数字再相加）
- 利用 BigInt 解决了普通 number 类型的数值溢出问题
- 展示了 TypeScript/JavaScript 的 BigInt 特性应用

缺点：
- 不符合题目考察的核心（逐位处理、进位逻辑）
- 需要遍历链表多次（转换2次 + 构建结果1次 = 3次遍历）
- BigInt 运算在极端大数场景下性能不如逐位模拟
- 面试中可能被质疑"投机取巧"，未体现算法思维

边界情况：
- 两个链表长度不同（转换过程自然处理）
- 最高位产生进位（BigInt 自动处理大数）
- 结果为 0 的特殊情况（单独处理）
- 其中一个或两个链表为空（题目保证非空，但代码已兼容）
*/
export function addTwoNumbers_3(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  function toBigInt(head: ListNode | null): bigint {
    let num = 0n;
    let multiplier = 1n;
    while (head) {
      num += BigInt(head.val) * multiplier;
      multiplier *= 10n;
      head = head.next;
    }
    return num;
  }

  function toListNodeFromBigInt(num: bigint): ListNode | null {
    if (num === 0n) return new ListNode(0);
    const dummy = new ListNode();
    let curr = dummy;
    while (num > 0n) {
      curr.next = new ListNode(Number(num % 10n));
      curr = curr.next;
      num /= 10n;
    }
    return dummy.next;
  }

  return toListNodeFromBigInt(toBigInt(l1) + toBigInt(l2));
}

// ========== 内联测试 ==========
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  /** 数组 → 链表 */
  function toListNode(arr: number[]): ListNode | null {
    const dummy = new ListNode();
    let curr = dummy;
    for (const n of arr) {
      curr.next = new ListNode(n);
      curr = curr.next;
    }
    return dummy.next;
  }

  /** 链表 → 数组 */
  function toArray(head: ListNode | null): number[] {
    const result: number[] = [];
    while (head) {
      result.push(head.val);
      head = head.next;
    }
    return result;
  }

  describe('LC0002 Add Two Numbers', () => {
    describe('迭代法', () => {
      it('示例 1', () => {
        const l1 = toListNode([2, 4, 3]);
        const l2 = toListNode([5, 6, 4]);
        expect(toArray(addTwoNumbers(l1, l2))).toEqual([7, 0, 8]);
      });

      it('示例 2', () => {
        expect(toArray(addTwoNumbers(toListNode([0]), toListNode([0])))).toEqual([0]);
      });

      it('示例 3', () => {
        expect(toArray(addTwoNumbers(toListNode([9, 9, 9, 9, 9, 9, 9]), toListNode([9, 9, 9, 9])))).toEqual([8, 9, 9, 9, 0, 0, 0, 1]);
      });
    });

    describe('递归法', () => {
      it('示例 1', () => {
        const l1 = toListNode([2, 4, 3]);
        const l2 = toListNode([5, 6, 4]);
        expect(toArray(addTwoNumbers_2(l1, l2))).toEqual([7, 0, 8]);
      });

      it('示例 2', () => {
        expect(toArray(addTwoNumbers_2(toListNode([0]), toListNode([0])))).toEqual([0]);
      });

      it('示例 3', () => {
        expect(toArray(addTwoNumbers_2(toListNode([9, 9, 9, 9, 9, 9, 9]), toListNode([9, 9, 9, 9])))).toEqual([8, 9, 9, 9, 0, 0, 0, 1]);
      });
    });
  });
}
