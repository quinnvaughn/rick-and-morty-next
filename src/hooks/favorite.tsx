'use client'
import { useState, useEffect } from 'react'

// as we don't control this API, we can use localStorage to manage favorites
export function useFavoriteCharacter(id: number) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.includes(id))
  }, [id])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (favorites.includes(id)) {
      favorites.splice(favorites.indexOf(id), 1)
    } else {
      favorites.push(id)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }

  return { isFavorite, toggleFavorite }
}
