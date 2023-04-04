import { createContext } from 'react'
import { useContext } from 'react'

export const RootStoreContext = createContext(null)

export const useStore = () => {
  const context = useContext(RootStoreContext)
  if (context === null) {
    throw new Error('You have forgotten to wrap your root component with RootStoreProvider')
  }
  return context
}
