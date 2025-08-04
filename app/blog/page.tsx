'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import BlogCard from '@/components/BlogCard'
import { supabase, BlogPost } from '@/lib/supabase'
import { Search, Calendar, User } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (data) {
        setPosts(data)
        setFilteredPosts(data)
      }
      setLoading(false)
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredPosts(filtered)
    } else {
      setFilteredPosts(posts)
    }
  }, [searchTerm, posts])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Our Blog
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Expert tips, maintenance guides, and insights for keeping your home appliances running smoothly
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{filteredPosts.length} articles found</span>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Latest first</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  summary={post.summary}
                  slug={post.slug}
                  author={post.author}
                  imageUrl={post.image_url}
                  createdAt={post.created_at}
                  index={index}
                />
              ))}
            </div>
          )}

          {!loading && filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}