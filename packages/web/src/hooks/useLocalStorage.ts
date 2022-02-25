import { useEffect, useState } from 'react'

export function useLocalStorage<T> (key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  const getValueFromLocalStorage = () => {
    const value = window.localStorage.getItem(key)

    if (!value) {
      return null
    }

    try {
      return JSON.parse(value) as T
    } catch (_) { }

    return null
  }

  const setValueInLocalStorage = (value: T) => {
    const newValue = JSON.stringify(value)
    setStoredValue(value)
    window.localStorage.setItem(key, newValue)
  }

  useEffect(() => {
    const value = getValueFromLocalStorage()
    if (value !== null) {
      setStoredValue(value)
    }
  }, [])

  return [storedValue, setValueInLocalStorage]
}
