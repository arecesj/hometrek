'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

const AppContext = createContext<ContextProps>({} as ContextProps);

export const AppWrapper = ({ children } : {
  children: ReactNode
}) => {
  let [context, setContext] = useState<ContextStateProps>({} as ContextStateProps)

  return (
    <AppContext.Provider value={{context, setContext}}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
