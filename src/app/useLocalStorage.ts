import { useState, useEffect } from 'react';

function getSavedValue<T>(key: string, initialValue: T): T {
    const savedValue = JSON.parse(localStorage.getItem(key) ?? 'undefined');

    if (savedValue) return savedValue;

    if (initialValue instanceof Function) return initialValue;

    return initialValue;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => getSavedValue(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}
