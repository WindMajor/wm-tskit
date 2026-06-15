import { describe, it, expect } from "vitest";
import { chunk, unique, uniqueBy, shuffle, partition, last } from "./array";

describe("array", () => {
  describe("chunk", () => {
    it("should split array into chunks of given size", () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it("should return empty array for empty input", () => {
      expect(chunk([], 3)).toEqual([]);
    });

    it("should return single chunk when size >= array length", () => {
      expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
    });
  });

  describe("unique", () => {
    it("should remove duplicates", () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });

    it("should handle empty array", () => {
      expect(unique([])).toEqual([]);
    });
  });

  describe("uniqueBy", () => {
    it("should deduplicate by key", () => {
      const data = [
        { id: 1, name: "a" },
        { id: 2, name: "b" },
        { id: 1, name: "c" },
      ];
      expect(uniqueBy(data, "id")).toEqual([
        { id: 1, name: "a" },
        { id: 2, name: "b" },
      ]);
    });
  });

  describe("shuffle", () => {
    it("should return an array of same length", () => {
      const arr = [1, 2, 3, 4, 5];
      expect(shuffle(arr)).toHaveLength(arr.length);
    });

    it("should contain all elements", () => {
      const arr = [1, 2, 3, 4, 5];
      expect(shuffle(arr).sort()).toEqual([1, 2, 3, 4, 5]);
    });

    it("should not mutate original", () => {
      const arr = [1, 2, 3];
      const copy = [...arr];
      shuffle(arr);
      expect(arr).toEqual(copy);
    });
  });

  describe("partition", () => {
    it("should split by predicate", () => {
      expect(partition([1, 2, 3, 4, 5], (n) => n % 2 === 0)).toEqual([
        [2, 4],
        [1, 3, 5],
      ]);
    });
  });

  describe("last", () => {
    it("should return last element", () => {
      expect(last([1, 2, 3])).toBe(3);
    });

    it("should return undefined for empty array", () => {
      expect(last([])).toBeUndefined();
    });
  });
});
