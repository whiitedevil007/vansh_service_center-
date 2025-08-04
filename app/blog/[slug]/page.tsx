'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { supabase, BlogPost } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, User, Share2, MessageCircle, Phone } from 'lucide-react'
import { format } from 'date-fns'

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      if (!params.slug) return

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', params.slug)
        .eq('published', true)
        .single()

      if (data) {
        setPost(data)
      }
      setLoading(false)
    }

    fetchPost()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(post.created_at), 'MMMM dd, yyyy')}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <p className="text-xl text-gray-600 leading-relaxed">
                {post.summary}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <div 
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    style={{ 
                      fontSize: '18px', 
                      lineHeight: '1.8',
                      fontFamily: 'Georgia, serif'
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: post.content.replace(/\n/g, '<br><br>') 
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-6 space-y-6">
                {/* Share Card */}
                <Card className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Share this article</h3>
                    <div className="space-y-3">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Share2 className="h-4 w-4 mr-2" />
                        Copy Link
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-blue-600">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Share on WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-blue-900 mb-3">Need Help?</h3>
                    <p className="text-blue-700 text-sm mb-4">
                      Have questions about appliance repair? Our experts are here to help!
                    </p>
                    <div className="space-y-2">
                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        <a href="tel:+919876543210">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Expert
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full border-green-500 text-green-600 hover:bg-green-50"
                      >
                        <a href="https://wa.me/+918386848281" target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <Card className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                    <div className="space-y-2">
                      <Link href="/services" className="block text-blue-600 hover:text-blue-700 text-sm">
                        View All Services
                      </Link>
                      <Link href="/contact" className="block text-blue-600 hover:text-blue-700 text-sm">
                        Book a Service
                      </Link>
                      <Link href="/about" className="block text-blue-600 hover:text-blue-700 text-sm">
                        About Us
                      </Link>
                      <Link href="/blog" className="block text-blue-600 hover:text-blue-700 text-sm">
                        More Articles
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Need Professional Appliance Repair?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Don't let appliance problems disrupt your daily routine. Book our expert repair service today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-xl"
              >
                <Link href="/contact">
                  Book Service Now
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-6 text-lg font-semibold rounded-xl"
              >
                <a href="tel:+919876543210">
                  Call: +91 8386848281
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}