import { css } from '../../styled-system/css'

const sectionStyle = css({
  backgroundColor: '#fafafa',
  border: '1px solid #ddd',
  borderRadius: '0.75rem',
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
})

const h2Style = css({
  fontSize: '1.25rem',
})

const h1Style = css({
  fontSize: '1.5rem',
  lineHeight: '1.2',
})

export default function Card({
  children,
  title,
  primaryTitle = false,
}: {
  children: React.ReactNode
  title: string
  primaryTitle?: boolean
}) {
  return (
    <section className={sectionStyle}>
      {primaryTitle ? (
        <h1 className={h1Style}>{title}</h1>
      ) : (
        <h2 className={h2Style}>{title}</h2>
      )}
      {children}
    </section>
  )
}
