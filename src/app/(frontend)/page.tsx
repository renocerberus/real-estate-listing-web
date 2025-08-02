import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import type { Property } from '@/payload-types'
import { PropertyGrid } from '@/components/PropertyGrid'

import config from '@/payload.config'

interface SearchParams {
  search?: string
  page?: string
  limit?: string
}

export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const resolvedSearchParams = await searchParams
  const _headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Get search parameters
  const search = resolvedSearchParams.search || ''
  const page = parseInt(resolvedSearchParams.page || '1')
  const limit = parseInt(resolvedSearchParams.limit || '12')

  // Build query
  const query: Record<string, any> = {
    isPublished: {
      equals: true,
    },
  }

  // Add search functionality
  if (search) {
    query.or = [
      {
        title: {
          contains: search,
        },
      },
      {
        location: {
          contains: search,
        },
      },
    ]
  }

  // Fetch properties with pagination
  const propertiesResponse = await payload.find({
    collection: 'property',
    where: query,
    page,
    limit,
    depth: 1,
  })

  const properties = propertiesResponse.docs as Property[]
  const totalPages = propertiesResponse.totalPages
  const totalDocs = propertiesResponse.totalDocs

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary to-secondary text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Real Estate Listings
            </h1>
            <p className="text-lg md:text-xl text-accent max-w-3xl mx-auto">
              Find your perfect property in the most desirable locations
            </p>
          </div>
        </div>
      </header>

      <main className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Section */}
          <div className="mb-8 md:mb-12">
            <form className="max-w-2xl mx-auto" method="GET">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="search"
                  placeholder="Search by title or location..."
                  defaultValue={search}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-secondary text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap"
                >
                  Search Properties
                </button>
              </div>
            </form>
          </div>

          {/* Results Info */}
          <div className="text-center mb-8">
            <p className="text-gray-600 text-lg">
              Showing {properties.length} of {totalDocs} properties
              {search && (
                <span className="text-primary font-medium"> for &quot;{search}&quot;</span>
              )}
            </p>
          </div>

          {/* Properties Grid */}
          <PropertyGrid properties={properties} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              {page > 1 && (
                <Link
                  href={`/?${new URLSearchParams({
                    ...(search && { search }),
                    page: (page - 1).toString(),
                  })}`}
                  className="bg-white hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg border border-gray-300 transition-colors"
                >
                  ← Previous
                </Link>
              )}

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/?${new URLSearchParams({
                      ...(search && { search }),
                      page: pageNum.toString(),
                    })}`}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      pageNum === page
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </Link>
                ))}
              </div>

              {page < totalPages && (
                <Link
                  href={`/?${new URLSearchParams({
                    ...(search && { search }),
                    page: (page + 1).toString(),
                  })}`}
                  className="bg-white hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg border border-gray-300 transition-colors"
                >
                  Next →
                </Link>
              )}
            </div>
          )}

          {/* No Results */}
          {properties.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No properties found</h2>
                <p className="text-gray-600 mb-8">
                  {search
                    ? `No properties match your search for "${search}". Try adjusting your search terms.`
                    : 'No properties are currently available.'}
                </p>
                {search && (
                  <Link
                    href="/"
                    className="bg-primary hover:bg-secondary text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                  >
                    Clear search
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
