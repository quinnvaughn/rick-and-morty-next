'use client'
import { Character, getCharacters } from '@/lib/api'
import { createContext, useContext, useState } from 'react'

type SearchContextType = {
  isLoading: boolean
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  handleClear: () => void
  characters?: Character[]
}

const SearchContext = createContext<SearchContextType | null>(null)

type SearchProviderProps = {
  children: React.ReactNode
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [characters, setCharacters] = useState<Character[] | undefined>(
    undefined
  )

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    setCharacters(undefined)
    event.preventDefault()
    setIsLoading(true)
    const characters = await getCharacters(
      1,
      (event.currentTarget[0] as HTMLInputElement).value
    )
    setIsLoading(false)
    setCharacters(characters)
  }

  function handleClear() {
    setCharacters(undefined)
  }

  return (
    <SearchContext.Provider
      value={{ isLoading, handleSearch, characters, handleClear }}
    >
      {children}
    </SearchContext.Provider>
  )
}
export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
