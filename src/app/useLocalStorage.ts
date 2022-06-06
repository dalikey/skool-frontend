import { useState, useEffect } from 'react';

function getSavedValue<T>(key: string, initialValue?: T): T | undefined {
    const savedValue = localStorage.getItem(key);

    if (savedValue) return JSON.parse(savedValue);

    if (initialValue instanceof Function) return initialValue;

    return initialValue;
}

export function useLocalStorage<T>(key: string, initialValue?: T): [T | undefined, Function] {
    const [value, setValue] = useState<T | undefined>(() => getSavedValue(key, initialValue));

    useEffect(() => {
        if (value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]);

    return [value, setValue];
}
