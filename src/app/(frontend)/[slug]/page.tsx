import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Property } from '@/payload-types'

import config from '@/payload.config'

interface PropertyDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const resolvedParams = await params
  const _headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Find property by slug
  const propertiesResponse = await payload.find({
    collection: 'property',
    where: {
      slug: {
        equals: resolvedParams.slug,
      },
      isPublished: {
        equals: true,
      },
    },
    depth: 1,
  })

  if (propertiesResponse.docs.length === 0) {
    notFound()
  }

  const property = propertiesResponse.docs[0] as Property

  // Helper function to render rich text content
  const renderRichText = (content: any) => {
    if (!content?.root?.children) return null

    return content.root.children.map((child: any, index: number) => {
      if (child.type === 'paragraph') {
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-4">
            {child.children?.map((textChild: any, textIndex: number) => (
              <span key={textIndex}>{textChild.text}</span>
            ))}
          </p>
        )
      }
      return null
    })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-800 hover:text-blue-700 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Listings
          </Link>
        </div>
      </header>

      <main className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
            {/* Property Image */}
            <div className="relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden">
              <Image
                src={typeof property.image === 'object' ? property.image.url || '' : ''}
                alt={
                  typeof property.image === 'object'
                    ? property.image.alt || property.title
                    : property.title
                }
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1024px"
                className="object-cover"
              />
            </div>

            {/* Property Information */}
            <div className="p-6 md:p-8">
              {/* Property Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8 pb-6 border-b border-gray-200">
                <div className="flex-1 mb-6 lg:mb-0">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 text-lg">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="bg-blue-800 text-white px-6 py-4 rounded-xl text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold">
                    ${property.price.toLocaleString()}
                  </div>
                  <div className="text-yellow-200 text-sm">Price</div>
                </div>
              </div>

              {/* Property Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description</h2>
                <div className="leading-relaxed">{renderRichText(property.description)}</div>
              </div>

              {/* Property Meta Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 text-gray-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-semibold text-gray-900 text-sm">Listed Date</span>
                  </div>
                  <p className="text-gray-700">
                    {new Date(property.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 text-gray-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-semibold text-gray-900 text-sm">Last Updated</span>
                  </div>
                  <p className="text-gray-700">
                    {new Date(property.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="mt-8 p-6 bg-yellow-50 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Interested in this property?
                </h3>
                <p className="text-gray-700 mb-4">
                  Contact us for more information or to schedule a viewing.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-blue-800 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200">
                    Contact Agent
                  </button>
                  <button className="bg-white hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-lg border border-gray-300 transition-colors duration-200">
                    Schedule Viewing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
