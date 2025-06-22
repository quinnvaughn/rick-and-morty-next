import Card from '@/components/card'
import Main from '@/components/main'
import Search from '@/components/search'
import { flex } from '../../styled-system/patterns'
import { getPopularCharacters } from '@/lib/api'
import CharacterLink from '@/components/character-link'
import CharacterSearchResults from '@/components/character-search-results'

export default async function Home() {
  const popularCharacters = await getPopularCharacters()
  return (
    <Main>
      <Card primaryTitle title="🔍 Search for a character">
        <Search />
      </Card>
      <CharacterSearchResults />
      <Card title="⭐ Popular Characters">
        <div className={flex({ wrap: 'wrap', gap: '0.75rem' })}>
          {popularCharacters.map((c) => (
            <CharacterLink key={c.id} character={c} />
          ))}
        </div>
      </Card>
    </Main>
  )
}
