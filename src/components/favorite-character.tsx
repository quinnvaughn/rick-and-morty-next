'use client'
import { css } from '../../styled-system/css'
import { useFavoriteCharacter } from '@/hooks/favorite'

type Props = {
  id: number
}

export default function FavoriteCharacter({ id }: Props) {
  const { toggleFavorite, isFavorite } = useFavoriteCharacter(id)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        toggleFavorite()
      }}
    >
      <button
        type="submit"
        className={css({
          padding: '0.4rem 0.75rem',
          fontSize: '0.9rem',
          backgroundColor: '#ffe680',
          color: '#333',
          border: '1px solid #f2c94c',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          _hover: {
            backgroundColor: '#ffd84d',
          },
          _active: {
            backgroundColor: '#ffc107',
          },
        })}
      >
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </form>
  )
}
