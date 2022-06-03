import { useState, useEffect } from 'react';

function getSavedValue<T>(key: string, initialValue: T): T {
    const savedValue = localStorage.getItem(key);

    if (savedValue) return JSON.parse(savedValue);

    if (initialValue instanceof Function) return initialValue;

    return initialValue;
}

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, Function] {
    const [value, setValue] = useState<T>(() =>
        getSavedValue(key, initialValue)
    );

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
