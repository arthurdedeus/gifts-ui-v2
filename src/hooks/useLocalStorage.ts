import { CartItem, CartState, Product } from '@/types'
import { useCallback, useEffect, useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

import { useEventCallback, useEventListener } from 'usehooks-ts'

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent
  }
}

const IS_SERVER = typeof window === 'undefined'

type LocalStorageHook = {
  storedValue: CartState
  totalPrice: number
  addItem: (item: Product) => void
  removeItem: (id: number) => void
  removeValue: () => void
  updateQuantity: (id: number, quantity: number) => void
}

export function useLocalStorage(
  key: string
): LocalStorageHook {
  const initializeWithValue = false
  const [totalPrice, setTotalPrice] = useState(0)
  const [storedValue, setStoredValue] = useState(() => {
    if (initializeWithValue) {
      return readValue()
    }

    return { items: []}
  })

  useEffect(() => {
    const totalPrice = storedValue.items.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
    setTotalPrice(totalPrice)
  }, [storedValue])

  const serializer = useCallback<(value: CartState) => string>(
    value => (JSON.stringify(value)),
    [],
  )

  const deserializer = useCallback<(value: string) => CartState>(
    value => {
      if (value === 'undefined') {
        return undefined as unknown as CartState
      }

      const defaultValue = { items: [] }

      let parsed: unknown
      try {
        parsed = JSON.parse(value)
      } catch (error) {
        console.error('Error parsing JSON:', error)
        return defaultValue // Return initialValue if parsing fails
      }

      return parsed as CartState
    },
    [],
  )

  const readValue = useCallback((): CartState => {
    const initialValueToUse = { items: [] }

    if (IS_SERVER) {
      return initialValueToUse
    }

    try {
      const raw = window.localStorage.getItem(key)
      return raw ? deserializer(raw) : initialValueToUse
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValueToUse
    }
  }, [key, deserializer])

  const setValue: Dispatch<SetStateAction<CartState>> = useEventCallback(value => {
    if (IS_SERVER) {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`,
      )
    }

    try {
      const newValue = value instanceof Function ? value(readValue()) : value
      window.localStorage.setItem(key, serializer(newValue))
      setStoredValue(newValue)
      window.dispatchEvent(new StorageEvent('local-storage', { key }))
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error)
    }
  })

  const removeValue = useEventCallback(() => {
    if (IS_SERVER) {
      console.warn(
        `Tried removing localStorage key “${key}” even though environment is not a client`,
      )
    }

    const defaultValue = { items: [] }

    window.localStorage.removeItem(key)
    setStoredValue(defaultValue)
    window.dispatchEvent(new StorageEvent('local-storage', { key }))
  })

  const addItem = useEventCallback((item: Product) => {
    const itemIndex = storedValue.items.findIndex(i => i.id === item.id)

    if (itemIndex !== -1) {
      const newItems = [...storedValue.items]
      newItems[itemIndex].quantity += 1
      setValue({ items: newItems })
      return
    }

    setValue({ items: [...storedValue.items, { ...item, quantity: 1}] })
    }
  )

  const removeItem = useEventCallback((id: number) => {
    const newItems = storedValue.items.filter(item => item.id !== id)
    setValue({ items: newItems })
  })

  const updateQuantity = useEventCallback((id: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
      return
    }

    const itemIndex = storedValue.items.findIndex(i => i.id === id)

    if (itemIndex !== -1) {
      const newItems = [...storedValue.items]
      newItems[itemIndex].quantity = quantity
      setValue({ items: newItems })
      return
    }
  })

  useEffect(() => {
    setStoredValue(readValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent).key && (event as StorageEvent).key !== key) {
        return
      }
      setStoredValue(readValue())
    },
    [key, readValue],
  )

  useEventListener('storage', handleStorageChange)
  useEventListener('local-storage', handleStorageChange)

  return {storedValue, totalPrice, addItem, removeItem, removeValue, updateQuantity}
}
