import { DependencyList, EffectCallback, useEffect } from "react";

export default function useAsyncEffect<T>(
    effect: () => Promise<T> | EffectCallback,
    deps?: DependencyList
) {
    useEffect(() => {
        effect();
    }, deps);
}
