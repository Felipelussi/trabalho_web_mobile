import { Header } from '@/components/header.tsx'

export function FeaturePageLayout({
  title,
  headerButton,
  children,
}: {
  children: React.ReactNode
  title: string
  headerButton?: React.ReactNode
}) {
  return (
    <div className={'flex flex-col gap-8 w-full px-12 py-10'}>
      <Header title={title} button={headerButton} />
      {children}
    </div>
  )
}
