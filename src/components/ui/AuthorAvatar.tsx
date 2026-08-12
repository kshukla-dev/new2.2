'use client'

interface AuthorAvatarProps {
  name?: string
  initials?: string
  size?: number
  className?: string
}

/**
 * Displays a circular avatar with author initials.
 */
export default function AuthorAvatar({ name, initials, size = 40, className = '' }: AuthorAvatarProps) {
  const display =
    initials ??
    (name
      ? name
          .split(' ')
          .map((p) => p[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : 'JF')

  return (
    <div
      className={`author-avatar ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #0E0F3B 0%, #1a1b6e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: size * 0.38,
        fontWeight: 700,
        letterSpacing: '0.02em',
        flexShrink: 0,
      }}
      aria-label={name ?? 'Author avatar'}
    >
      {display}
    </div>
  )
}
