import Image from 'next/image'
import { Breadcrumbs } from '../layout/Breadcrumbs'

interface PageHeroProps {
  title: string
  description?: string
  breadcrumbs?: Array<{ label: string; href: string }>
  height?: string
}

const PageHero = ({
  title,
  description,
  breadcrumbs,
  height = '320px',
}: PageHeroProps) => {
  return (
    <section
      className='relative bg-gradient-to-br from-[var(--primary)] via-[#1a2d5e] to-[var(--primary)] text-white overflow-hidden'
      style={{ height }}>
      <div
        className="
          absolute inset-0
          bg-[url('/icon-branco.png')]
          bg-repeat
          opacity-[0.06]
          bg-[length:80px_80px]
          pointer-events-none
          z-0
        "
        style={{
          WebkitMaskImage:
            'linear-gradient(to left, black 0%, transparent 80%)',
          maskImage: 'linear-gradient(to left, black 0%, transparent 80%)',
        }}
      />

      <div className='absolute inset-y-0 right-[-5%] w-[60%] hidden sm:block z-10 pointer-events-none'>
        <Image
          src='/maq5.png'
          alt='Máquinas pesadas'
          fill
          quality={100}
          className='object-contain object-bottom select-none'
          style={{ mixBlendMode: 'screen' }}
          priority
        />
      </div>

      <div className='absolute inset-0 bg-linear-to-r from-(--primary)/95 via-[#1a2d5e]/90 to-[#1a2d5e]/90 sm:to-transparent lg:bg-none z-15 pointer-events-none' />

      <div className='absolute inset-0 opacity-5 z-0 pointer-events-none'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2'></div>
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 h-full flex items-center relative z-20'>
        <div className='max-w-2xl'>
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

          <h1 className='text-yellow-400 mt-6 mb-2 drop-shadow-md'>{title}</h1>

          {description && (
            <p className='text-xl max-w-2xl text-white/95 drop-shadow-md'>
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default PageHero
