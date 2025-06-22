import CardSkeleton from '@/components/card-skeleton'
import Main from '@/components/main'

export default function Loading() {
  return (
    <Main>
      <CardSkeleton primaryTitle={true} title="Loading character" />
      <CardSkeleton title="⚙️ Character Info" />
      <CardSkeleton title="📍 Location Info" />
      <CardSkeleton title="👥 Episodes Appearing" />
    </Main>
  )
}
