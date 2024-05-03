'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

const AppContext = createContext<ContextProps>({} as ContextProps);

export const AppWrapper = ({ children } : {
  children: ReactNode
}) => {
  let [userContext, setUserContext] = useState<UserContext>({} as UserContext)
  let [homeClosingContext, setHomeClosingContext] = useState<HomeClosingContext>({} as HomeClosingContext)
  let [routeContext, setRouteContext] = useState<string>("")

  return (
    <AppContext.Provider
      value={
        {
        userContext,
        setUserContext,
        homeClosingContext,
        setHomeClosingContext,
        routeContext,
        setRouteContext
        }
      }
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
