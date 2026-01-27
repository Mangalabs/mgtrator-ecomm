'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
  theme?: 'light' | 'dark'
}

export const Breadcrumbs = ({ items, className = '', theme = 'light' }: BreadcrumbsProps) => {
  const textColor = theme === 'dark' ? 'text-white/80' : 'text-gray-600'
  const hoverColor = theme === 'dark' ? 'hover:text-white' : 'hover:text-[#213A77]'
  const activeColor = theme === 'dark' ? 'text-white' : 'text-[#213A77]'
  const iconColor = theme === 'dark' ? 'text-white' : 'text-gray-400'
  
  return (
    <nav 
      className={`flex items-center gap-2 text-sm ${textColor} py-4 ${className}`}
      aria-label="Navegação por breadcrumb"
    >
      <ol className="flex items-center gap-2">
        <li>
          <Link
            href="/"
            className={`flex items-center gap-1 ${hoverColor} transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-1 text-white`}
            aria-label="Voltar para página inicial"
          >
            <Home className={`w-4 h-4 ${iconColor}`} aria-hidden="true" />
            <span>Início</span>
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className={`w-4 h-4 ${iconColor}`} aria-hidden="true" />

            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className={`${hoverColor} transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-1 text-gray-100`}
                aria-label={`Navegar para ${item.label}`}
              >
                {item.label}
              </Link>
            ) : (
              <span className={`${activeColor} font-semibold text-gray-400`} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}