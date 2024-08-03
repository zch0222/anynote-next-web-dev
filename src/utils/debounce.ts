export default function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate: boolean
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function(this: ThisParameterType<T>, ...args: Parameters<T>): void {
        const context = this;

        if (timeout !== null) {
            clearTimeout(timeout);
        }

        if (immediate) {
            const callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
            if (callNow) {
                func.apply(context, args);
            }
        } else {
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        }
    };
}