/**
 * LeetCode 2. Add Two Numbers
 *
 * 给你两个非空的链表，表示两个非负的整数。
 * 每位数字都是按照逆序方式存储的，每个节点只能存储一位数字。
 * 将两个数相加，并以相同形式返回一个表示和的链表。
 *
 * - 时间复杂度：O(max(m, n))
 * - 空间复杂度：O(max(m, n))
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
}
