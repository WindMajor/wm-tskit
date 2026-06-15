import { describe, it, expect, vi, beforeEach } from "vitest";
import { debounce, throttle, once, memoize } from "./function";

describe("function", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  describe("debounce", () => {
    it("should call function after delay", () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      debounced();
      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should reset timer on repeated calls", () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      debounced();
      vi.advanceTimersByTime(50);
      debounced();
      vi.advanceTimersByTime(50);
      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(50);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe("throttle", () => {
    it("should call immediately on first call", () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100);

      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should not call again within interval", () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100);

      throttled();
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe("once", () => {
    it("should call function only once", () => {
      const fn = vi.fn().mockReturnValue(42);
      const onceFn = once(fn);

      expect(onceFn()).toBe(42);
      expect(onceFn()).toBe(42);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe("memoize", () => {
    it("should cache results", () => {
      const fn = vi.fn((x: number) => x * 2);
      const memoized = memoize(fn as (...args: unknown[]) => unknown);

      expect(memoized(2)).toBe(4);
      expect(memoized(2)).toBe(4);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should recompute for different args", () => {
      const fn = vi.fn((x: number) => x * 2);
      const memoized = memoize(fn as (...args: unknown[]) => unknown);

      memoized(2);
      memoized(3);
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
});
