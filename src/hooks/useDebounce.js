import { useState, useEffect } from "react";


function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value)
    if (value === '') {
        delay = 0
    }
    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value), delay)

        return () => clearTimeout(handler)
        // eslint-disable-next-line 
    }, [value])
    return debounceValue
}
export default useDebounce