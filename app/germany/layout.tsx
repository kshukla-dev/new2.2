import { ReactNode } from 'react'

export const dynamic = 'force-dynamic'

export default function GermanyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
