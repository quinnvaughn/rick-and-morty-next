'use client'
import { useSearch } from '@/context/search'
import Card from './card'
import CharacterLink from './character-link'
import { flex } from '../../styled-system/patterns'

// could probably use pattern matching here, but I'm keeping this simple for now
export default function CharacterSearchResults() {
  const { isLoading, characters, handleClear } = useSearch()
  if (isLoading) {
    return <Card title="Search Results">Loading...</Card>
  }
  if (characters?.length === 0) {
    return <Card title="Search Results">No characters found</Card>
  }
  if (!characters) {
    return (
      <Card title="Search Results">Search for a character to see results</Card>
    )
  }
  return (
    <Card title="Search Results">
      <div className={flex({ wrap: 'wrap', gap: '0.75rem' })}>
        {characters.map((c) => (
          <CharacterLink key={c.id} character={c} onNavigate={handleClear} />
        ))}
      </div>
    </Card>
  )
}
