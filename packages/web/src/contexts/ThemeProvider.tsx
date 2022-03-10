import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from './../hooks'

const THEME_KEY = 'THEME_DATA'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface ThemeContextData {
  theme: Theme
  toggleTheme: () => void
}

export const themeContextDefaultValues: ThemeContextData = {
  theme: Theme.LIGHT,
  toggleTheme: () => { }
}

export const ThemeContext = createContext<ThemeContextData>(
  themeContextDefaultValues
)

export interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeFromLocalStorage, setThemeInLocalStorage] =
    useLocalStorage<Theme>(THEME_KEY, Theme.LIGHT)

  const handleChangeTheme = (newTheme: Theme) => {
    const root = document.documentElement
    const oldTheme = newTheme === Theme.DARK
      ? Theme.LIGHT
      : Theme.DARK
    root.classList.remove(oldTheme)
    root.classList.add(newTheme)
  }

  const toggleTheme = () => {
    const newTheme = themeFromLocalStorage === Theme.DARK
      ? Theme.LIGHT
      : Theme.DARK
    setThemeInLocalStorage(newTheme)
  }

  useEffect(
    () => handleChangeTheme(themeFromLocalStorage),
    [themeFromLocalStorage]
  )

  return (
    <ThemeContext.Provider value={{
      theme: themeFromLocalStorage,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
