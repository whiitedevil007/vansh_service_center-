'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Settings, 
  FileText, 
  MessageSquare, 
  Star, 
  Users, 
  BarChart3,
  Plus,
  Edit,
  Eye,
  Trash2
} from 'lucide-react'

export default function AdminPage() {
  const [services, setServices] = useState<any[]>([])
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalServices: 0,
    totalPosts: 0,
    totalReviews: 0,
    totalContacts: 0
  })

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const [servicesData, postsData, reviewsData, contactsData] = await Promise.all([
      supabase.from('services').select('*').order('created_at', { ascending: false }),
      supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
      supabase.from('reviews').select('*').order('created_at', { ascending: false }),
      supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
    ])

    if (servicesData.data) setServices(servicesData.data)
    if (postsData.data) setBlogPosts(postsData.data)
    if (reviewsData.data) setReviews(reviewsData.data)
    if (contactsData.data) setContactSubmissions(contactsData.data)

    setStats({
      totalServices: servicesData.data?.length || 0,
      totalPosts: postsData.data?.length || 0,
      totalReviews: reviewsData.data?.length || 0,
      totalContacts: contactsData.data?.length || 0
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Settings className="h-8 w-8 mr-3" />
                Admin Panel
              </h1>
              <p className="text-gray-300 mt-2">Manage your website content and view analytics</p>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold">{stats.totalContacts}</div>
              <div className="text-gray-300 text-sm">Total Inquiries</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Services', value: stats.totalServices, icon: Settings, color: 'bg-blue-500' },
              { title: 'Blog Posts', value: stats.totalPosts, icon: FileText, color: 'bg-green-500' },
              { title: 'Reviews', value: stats.totalReviews, icon: Star, color: 'bg-yellow-500' },
              { title: 'Contacts', value: stats.totalContacts, icon: MessageSquare, color: 'bg-purple-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-full`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="contacts" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Contact Submissions */}
            <TabsContent value="contacts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Contact Submissions</span>
                    <Badge variant="secondary">{contactSubmissions.length} total</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contactSubmissions.map((contact) => (
                      <div key={contact.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold">{contact.name}</h3>
                            <Badge 
                              variant={contact.status === 'new' ? 'destructive' : 
                                     contact.status === 'in_progress' ? 'default' : 'secondary'}
                            >
                              {contact.status}
                            </Badge>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Phone: {contact.phone}</p>
                            <p className="text-gray-600">Email: {contact.email}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Appliance: {contact.appliance_type}</p>
                            <p className="text-gray-600">Location: {contact.location}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Message:</p>
                            <p className="text-sm">{contact.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services */}
            <TabsContent value="services" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Services Management</span>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Service
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{service.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline">{service.brands.length} brands</Badge>
                              <Badge variant="outline">{service.faqs.length} FAQs</Badge>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Blog Posts */}
            <TabsContent value="blog" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Blog Posts</span>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{post.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{post.summary}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant={post.published ? 'default' : 'secondary'}>
                                {post.published ? 'Published' : 'Draft'}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {new Date(post.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold">{review.name}</h3>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <Badge variant={review.approved ? 'default' : 'secondary'}>
                              {review.approved ? 'Approved' : 'Pending'}
                            </Badge>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Service: {review.service}</p>
                        <p className="text-sm">{review.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}