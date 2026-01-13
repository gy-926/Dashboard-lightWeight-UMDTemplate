import { ref, computed } from "vue";

/**
 * 计数器组合式函数
 */
export function useCounter(initialValue = 0) {
  // 响应式状态
  const count = ref(initialValue);

  // 计算属性
  const doubleCount = computed(() => count.value * 2);
  const isEven = computed(() => count.value % 2 === 0);

  // 方法
  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => (count.value = initialValue);
  const setCount = (value: number) => (count.value = value);

  return {
    count,
    doubleCount,
    isEven,
    increment,
    decrement,
    reset,
    setCount,
  };
}
