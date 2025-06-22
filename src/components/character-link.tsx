'use client'
import { Character } from '@/lib/api'
import Link from 'next/link'
import { css } from '../../styled-system/css'
import { circle, flex } from '../../styled-system/patterns'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
  character: Character
  onNavigate?: () => void
}

export default function CharacterLink({ character: c, onNavigate }: Props) {
  // workaround to prefetch on hover/focus
  const [prefetch, setPrefetch] = useState(false)
  return (
    <Link
      prefetch={prefetch}
      onNavigate={onNavigate}
      onMouseEnter={() => setPrefetch(true)}
      onFocus={() => setPrefetch(true)}
      key={c.id}
      href={`/character/${c.id}`}
      className={css({
        textDecoration: 'none',
        backgroundColor: { base: '#e0e0e0', _hover: '#d0d0d0' },
        padding: '0.5rem 0.75rem',
        borderRadius: '999px',
        fontSize: '0.95rem',
        color: '#333',
        transition: 'background-color 0.2s',
      })}
    >
      <div className={flex({ alignItems: 'center', gap: '0.25rem' })}>
        <Image
          src={c.image || '/placeholder.png'}
          alt={c.name}
          width={32}
          height={32}
          className={circle()}
        />
        <span>{c.name}</span>
      </div>
    </Link>
  )
}
