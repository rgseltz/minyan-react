import React, { useEffect, useState } from 'react';
const useLocalStorage = (key, firstVal = null) => {
    const initialValue = localStorage.getItem(key) || firstVal;
    const [item, setItem] = useState(initialValue);
    useEffect(
        () => {
            console.debug('useLocalStorage hook, useEffect, item=', item)
            localStorage.item === null ? localStorage.remove(key) : localStorage.setItem(key, item);
        }, [key, item]
    );
    return [item, setItem];
}
export default useLocalStorage;