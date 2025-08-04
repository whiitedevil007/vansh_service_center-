'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ServiceCard from '@/components/ServiceCard'
import ReviewCard from '@/components/ReviewCard'
import { supabase, Service, Review } from '@/lib/supabase'
import { 
  Phone, 
  MessageCircle, 
  Shield, 
  Clock, 
  Award, 
  Users, 
  CheckCircle,
  Wrench,
  MapPin,
  Star
} from 'lucide-react'

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([])
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    async function fetchData() {
      const [servicesData, reviewsData] = await Promise.all([
        supabase.from('services').select('*').limit(6),
        supabase.from('reviews').select('*').eq('approved', true).limit(6)
      ])

      if (servicesData.data) setServices(servicesData.data)
      if (reviewsData.data) setReviews(reviewsData.data)
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/5691610/pexels-photo-5691610.jpeg"
            alt="Professional appliance repair"
            fill
            className="object-cover opacity-20"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Expert Appliance
                  <span className="text-orange-400"> Repair</span>
                  <br />Services
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100">
                  Fast, affordable, and professional home appliance repair services at your doorstep
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/contact">
                    <Wrench className="h-5 w-5 mr-2" />
                    Book Repair Now
                  </Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-black hover:bg-white hover:text-blue-900 px-8 py-6 text-lg font-semibold rounded-xl"
                >
                  <a href="tel:+919876543210">
                    <Phone className="h-5 w-5 mr-2" />
                    Call: +91 8386848281
                  </a>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Same Day Service</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>All Brands</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Warranty</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">10,000+</div>
                    <div className="text-blue-100">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">4.9★</div>
                    <div className="text-blue-100">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">24/7</div>
                    <div className="text-blue-100">Support Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">200+</div>
                    <div className="text-blue-100">Cities Served</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Expert Repair Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide professional repair services for all major home appliances with certified technicians and genuine parts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                image={service.image_url}
                slug={service.slug}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg font-semibold rounded-xl"
            >
              <Link href="/services">
                View All Services
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Vansh Service Center?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are committed to providing the best appliance repair experience with professional service and customer satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Certified Technicians',
                description: 'All our technicians are certified and experienced professionals',
                color: 'bg-blue-500'
              },
              {
                icon: Clock,
                title: 'Quick Service',
                description: 'Same-day service with on-time arrival guarantee',
                color: 'bg-green-500'
              },
              {
                icon: Award,
                title: 'Quality Parts',
                description: 'We use only genuine and high-quality replacement parts',
                color: 'bg-orange-500'
              },
              {
                icon: Users,
                title: 'Customer Support',
                description: '24/7 customer support for all your service needs',
                color: 'bg-purple-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-full mb-6`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - see what our satisfied customers have to say about our service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <ReviewCard
                key={review.id}
                name={review.name}
                rating={review.rating}
                message={review.message}
                service={review.service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Fix Your Appliance?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Book your repair service today and experience hassle-free appliance care with our professional technicians
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/contact">
                  <Wrench className="h-5 w-5 mr-2" />
                  Book Service Now
                </Link>
              </Button>
              
              <div className="flex items-center space-x-4">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-black hover:bg-white hover:text-blue-900 px-6 py-6 rounded-xl"
                >
                  <a href="https://wa.me/+918386848281" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp
                  </a>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-black hover:bg-white hover:text-blue-900 px-6 py-6 rounded-xl"
                >
                  <a href="tel:+919876543210">
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-8 text-blue-100 mt-8">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Serving 200+ Cities</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Same Day Service</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}