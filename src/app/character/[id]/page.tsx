import { Character, Episode, getCharacterById } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { css, cva } from '../../../../styled-system/css'

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

const sectionStyle = css.raw({
  backgroundColor: '#fafafa',
  border: '1px solid #ddd',
  borderRadius: '0.75rem',
  padding: '1.25rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
})

const h2Style = css({
  fontSize: '1.25rem',
})

const mainStyle = cva({
  base: {
    padding: '2rem',
    width: '100%',
    display: 'flex',
    gap: '2rem',
  },
  variants: {
    direction: {
      column: {
        flexDirection: 'column',
        maxWidth: '800px',
      },
      row: {
        flexDirection: 'row',
        maxWidth: '100%',
      },
    },
  },
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
      <main className={mainStyle({ direction: 'row' })}>
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
      </main>
    )
  } else {
    return (
      <main className={mainStyle({ direction: 'column' })}>
        <CharacterHeader character={character} />
        <CharacterInfo character={character} />
        <CharacterLocationInfo character={character} />
        <CharacterSection title="📺 Episodes">
          <EpisodeList episodes={character.episode} />
        </CharacterSection>
      </main>
    )
  }
}

function CharacterHeader({ character }: { character: Character }) {
  return (
    <section
      className={css(sectionStyle, {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1.5rem',
      })}
    >
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
    <CharacterSection title="⚙️ Character Info">
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
    </CharacterSection>
  )
}

function CharacterLocationInfo({ character }: { character: Character }) {
  return (
    <CharacterSection title="📍 Location Info">
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
    </CharacterSection>
  )
}

function EpisodeList({ episodes }: { episodes: Episode[] }) {
  return (
    <ul className={css({ paddingLeft: '1.25rem' })}>
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

function CharacterSection({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <section
      className={css(sectionStyle, {
        flexDirection: 'column',
        gap: '0.5rem',
      })}
    >
      <h2 className={h2Style}>{title}</h2>
      {children}
    </section>
  )
}
