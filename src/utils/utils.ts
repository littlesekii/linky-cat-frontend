export const utils = {
  debounce<T extends (...args: unknown[]) => void>(
    func: T,
    delay: number
  ) {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const debounced = (...args: Parameters<T>): void => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };

    debounced.cancel = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };

    return debounced;
  },
  timer<T extends (...args: unknown[]) => void> (
    func: T,
    delay: number
  ) {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const interval = (...args: Parameters<T>): void => {
      if (intervalId) {
        clearInterval(intervalId);
      }

      intervalId = setInterval(() => {
        func.apply(self, args);
      }, delay);
    };

    interval.cancel = () => {
      if (intervalId) {
        clearTimeout(intervalId);
        intervalId = undefined;
      }
    };

    return interval;
  }
};
