'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { supabase, Service } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { 
  Phone, 
  MessageCircle, 
  CheckCircle, 
  Star, 
  Clock, 
  Shield, 
  Award,
  ArrowLeft,
  Wrench
} from 'lucide-react'

export default function ServiceDetailPage() {
  const params = useParams()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchService() {
      if (!params.slug) return

      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', params.slug)
        .single()

      if (data) {
        setService(data)
      }
      setLoading(false)
    }

    fetchService()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <Link href="/services">
            <Button>Back to Services</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/services" className="inline-flex items-center text-blue-200 hover:text-white mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Services
              </Link>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                {service.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-xl"
                >
                  <Link href="/contact">
                    <Wrench className="h-5 w-5 mr-2" />
                    Book This Service
                  </Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-6 text-lg font-semibold rounded-xl"
                >
                  <a href="tel:+919876543210">
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </a>
                </Button>
              </div>

              <div className="flex items-center space-x-6 mt-8 text-blue-100">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span>4.9 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Same Day Service</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Warranty Included</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={service.image_url}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Brands Supported */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2 text-blue-600" />
                      Brands We Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {service.brands.map((brand: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Service Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Service Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'Certified Technicians',
                        'Genuine Parts Only',
                        'Same Day Service',
                        'Warranty Coverage',
                        'Free Diagnosis',
                        'Transparent Pricing',
                        'Doorstep Service',
                        '100% Satisfaction Guarantee'
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* FAQs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {service.faqs.map((faq: any, index: number) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="sticky top-6 border-2 border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="text-center text-blue-900">
                      Book This Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">Starting from ₹299</div>
                      <div className="text-sm text-gray-500">+ parts cost (if any)</div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        asChild
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-semibold rounded-xl"
                      >
                        <Link href="/contact">
                          <Wrench className="h-5 w-5 mr-2" />
                          Book Online
                        </Link>
                      </Button>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          asChild
                          variant="outline"
                          className="border-green-500 text-green-600 hover:bg-green-50"
                        >
                          <a href="https://wa.me/9876543210" target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            WhatsApp
                          </a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                          <a href="tel:+919876543210">
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-500 pt-4 border-t">
                      ⚡ Same day service available<br />
                      🛡️ 30-day warranty included<br />
                      📍 Doorstep service
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span>+91 8386848281</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="h-4 w-4 text-green-600" />
                        <span>WhatsApp Support</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span>24/7 Available</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}