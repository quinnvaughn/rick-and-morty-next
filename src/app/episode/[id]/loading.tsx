import CardSkeleton from '@/components/card-skeleton'
import Main from '@/components/main'

export default function Loading() {
  return (
    <Main>
      <CardSkeleton primaryTitle={true} title="Loading episode" />
      <CardSkeleton title="👥 Characters Appearing" />
    </Main>
  )
}
