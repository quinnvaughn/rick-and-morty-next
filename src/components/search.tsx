'use client'
import { css } from '../../styled-system/css'
import { flex } from '../../styled-system/patterns'
import { useSearch } from '@/context/search'

export default function Search() {
  const { handleSearch } = useSearch()
  return (
    <form onSubmit={handleSearch}>
      <div className={flex({ wrap: 'wrap', gap: '0.75rem' })}>
        <input
          type="text"
          placeholder="e.g. Rick, Morty, Summer..."
          className={css({
            flex: 1,
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #ccc',
          })}
        />
        <button
          type="submit"
          className={css({
            padding: '0.75rem 1.25rem',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
          })}
        >
          Search
        </button>
      </div>
    </form>
  )
}
