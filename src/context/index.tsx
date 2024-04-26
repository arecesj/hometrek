'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

const AppContext = createContext<ContextProps>({} as ContextProps);

export const AppWrapper = ({ children } : {
  children: ReactNode
}) => {
  let [trekContext, setTrekContext] = useState<TrekContext>({} as TrekContext)
  let [aggContext, setAggContext] = useState<AggContext>({} as AggContext)

  return (
    <AppContext.Provider value={{trekContext, setTrekContext, aggContext, setAggContext}}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
