import { getEpisodeById } from '@/lib/api'
import { css } from '../../../../styled-system/css'
import Card from '@/components/card'
import { flex } from '../../../../styled-system/patterns'
import CharacterLink from '@/components/character-link'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const id = parseInt((await params).id, 10)
  if (isNaN(id)) {
    return {
      title: 'Invalid Episode ID',
      description: 'The episode ID provided is not valid.',
    }
  }
  try {
    const episode = await getEpisodeById(id)
    return {
      title: `${episode.name}'s Details - Rick and Morty`,
      description: `Details about ${episode.name}, an episode from Rick and Morty.`,
    }
  } catch (error) {
    return {
      title: 'Episode Not Found',
      description: 'The episode you are looking for does not exist.',
    }
  }
}

const mainStyle = css({
  padding: '2rem',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  maxWidth: '800px',
})

const headerParagraphStyle = css({
  fontSize: '1rem',
  color: '#666',
})

export default async function EpisodePage({ params }: Props) {
  const id = parseInt((await params).id, 10)
  if (isNaN(id)) {
    return <div>Invalid Episode ID</div>
  }

  const episode = await getEpisodeById(id)
  if (!episode) {
    return <div>Episode Not Found</div>
  }

  return (
    <main className={mainStyle}>
      <Card primaryTitle title={`🎬 ${episode.episode} – ${episode.name}`}>
        <p className={headerParagraphStyle}>🗓️ Aired: {episode.air_date}</p>
      </Card>
      <Card title="👥 Characters Appearing">
        <div className={flex({ wrap: 'wrap', gap: '0.75rem' })}>
          {episode.characters?.map((c) => (
            <CharacterLink key={c.id} character={c} />
          ))}
        </div>
      </Card>
    </main>
  )
}
