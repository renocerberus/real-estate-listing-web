import Image from 'next/image'
import Link from 'next/link'
import type { Property } from '@/payload-types'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/${property.slug}`} className="block">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
        <div className="relative w-full h-48 md:h-56 overflow-hidden">
          <Image
            src={
              typeof property.image === 'object'
                ? property.image.url || 'https://picsum.photos/id/164/200/300'
                : 'https://picsum.photos/id/164/200/300'
            }
            alt={
              typeof property.image === 'object'
                ? property.image.alt || property.title
                : property.title
            }
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg font-semibold text-lg">
            ${property.price.toLocaleString()}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
            {property.title}
          </h3>
          <p className="text-gray-600 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {property.location}
          </p>
        </div>
      </div>
    </Link>
  )
}
