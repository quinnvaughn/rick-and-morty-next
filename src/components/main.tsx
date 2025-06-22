import { cva } from '../../styled-system/css'

type Props = {
  children: React.ReactNode
  direction?: 'column' | 'row'
}

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

export default function Main({ children, direction = 'column' }: Props) {
  return <main className={mainStyle({ direction })}>{children}</main>
}
