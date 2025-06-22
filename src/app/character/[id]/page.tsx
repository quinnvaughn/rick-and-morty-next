import { Character, Episode, getCharacterById } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { css, cva } from '../../../../styled-system/css'
import Card from '@/components/card'
import Main from '@/components/main'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const id = parseInt((await params).id, 10)
  if (isNaN(id)) {
    return {
      title: 'Invalid Character ID',
      description: 'The character ID provided is not valid.',
    }
  }
  try {
    const character = await getCharacterById(id)
    return {
      title: `${character.name}'s Details - Rick and Morty`,
      description: `Details about ${character.name}, a character from Rick and Morty.`,
    }
  } catch (error) {
    return {
      title: 'Character Not Found',
      description: 'The character you are looking for does not exist.',
    }
  }
}

const sectionStyle = css({
  backgroundColor: '#fafafa',
  border: '1px solid #ddd',
  borderRadius: '0.75rem',
  padding: '1.25rem',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1.5rem',
})

const h2Style = css({
  fontSize: '1.25rem',
})

export default async function Page({ params }: Props) {
  const id = (await params).id

  const character = await getCharacterById(parseInt(id, 10))
  if (!character) {
    return <div>Character not found</div>
  }

  const isHighVolume = character.episode.length > 10

  if (isHighVolume) {
    return (
      <Main direction="row">
        <div
          className={css({
            flex: 1,
            overflowY: 'auto',
            height: 'calc(100vh - 4rem)',
          })}
        >
          <h2 className={h2Style}>Episodes</h2>
          <EpisodeList episodes={character.episode} />
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            flex: 2,
          })}
        >
          <CharacterHeader character={character} />
          <CharacterInfo character={character} />
          <CharacterLocationInfo character={character} />
        </div>
      </Main>
    )
  } else {
    return (
      <Main>
        <CharacterHeader character={character} />
        <CharacterInfo character={character} />
        <CharacterLocationInfo character={character} />
        <Card title="📺 Episodes">
          <EpisodeList episodes={character.episode} />
        </Card>
      </Main>
    )
  }
}

function CharacterHeader({ character }: { character: Character }) {
  return (
    <section className={sectionStyle}>
      <Image
        src={character.image || '/placeholder.png'}
        alt={character.name}
        width={180}
        height={180}
        className={css({ borderRadius: '1rem', objectFit: 'cover' })}
      />
      <div>
        <h1 className={css({ fontSize: '2rem', lineHeight: 1 })}>
          {character.name}
        </h1>
        <p className={css({ fontStyle: 'italic', color: '#666' })}>
          {character.status} {character.species} {character.gender || 'Unknown'}
        </p>
      </div>
    </section>
  )
}

function CharacterInfo({ character }: { character: Character }) {
  return (
    <Card title="⚙️ Character Info">
      <p>
        <strong>ID: </strong>
        {character.id}
      </p>
      <p>
        <strong>Species: </strong>
        {character.species}
      </p>
      <p>
        <strong>Type: </strong>
        {character.type || 'N/A'}
      </p>
    </Card>
  )
}

function CharacterLocationInfo({ character }: { character: Character }) {
  return (
    <Card title="📍 Location Info">
      <div>
        <p className={css({ fontWeight: 600, paddingBottom: '0.25rem' })}>
          🧬 Origin:
        </p>
        <p>
          <strong>Name:</strong> {character.origin.name}
        </p>
        <p>
          <strong>Type:</strong> {character.origin.type || 'Unknown'}
        </p>
        <p>
          <strong>Dimension:</strong> {character.origin.dimension || 'Unknown'}
        </p>
      </div>

      <div>
        <p className={css({ fontWeight: 600, paddingBottom: '0.25rem' })}>
          🛰️ Current Location:
        </p>
        <p>
          <strong>Name:</strong> {character.location.name}
        </p>
        <p>
          <strong>Type:</strong> {character.location.type || 'Unknown'}
        </p>
        <p>
          <strong>Dimension:</strong>{' '}
          {character.location.dimension || 'Unknown'}
        </p>
      </div>
    </Card>
  )
}

function EpisodeList({ episodes }: { episodes: Episode[] }) {
  return (
    <ul className={css({ paddingLeft: '1.5rem' })}>
      {episodes.map((ep) => (
        <li key={ep.id}>
          <Link
            href={`/episode/${ep.id}`}
            className={css({
              color: '#0070f3',
              textDecoration: 'none',
              _hover: { textDecoration: 'underline' },
            })}
          >
            {ep.episode}: {ep.name}{' '}
            <span className={css({ color: '#888' })}>({ep.air_date})</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
