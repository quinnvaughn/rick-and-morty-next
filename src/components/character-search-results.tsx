'use client'
import { useSearch } from '@/context/search'
import Card from './card'
import CharacterLink from './character-link'
import { flex } from '../../styled-system/patterns'

// could probably use pattern matching here, but I'm keeping this simple for now
export default function CharacterSearchResults() {
  const { isLoading, characters, handleClear } = useSearch()
  return (
    <Card title="Search Results">
      {isLoading ? (
        <span>Loading...</span>
      ) : characters?.length === 0 ? (
        <span>No characters found</span>
      ) : !characters ? (
        <span>Search for a character to see results</span>
      ) : (
        <div className={flex({ wrap: 'wrap', gap: '0.75rem' })}>
          {characters.map((c) => (
            <CharacterLink key={c.id} character={c} onNavigate={handleClear} />
          ))}
        </div>
      )}
    </Card>
  )
}
