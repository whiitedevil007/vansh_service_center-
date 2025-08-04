'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Users,
  Award,
  Clock,
  MapPin,
  CheckCircle,
  Target,
  Eye,
  Heart,
  Phone,
  MessageCircle,
  Star,
  Wrench,
  Shield,
  TrendingUp
} from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Customers' },
    { icon: Award, value: '4.9★', label: 'Average Rating' },
    { icon: Clock, value: '5+', label: 'Years Experience' },
    { icon: MapPin, value: '200+', label: 'Cities Served' },
  ]

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide fast, reliable, and affordable appliance repair services that exceed customer expectations and keep homes running smoothly.'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To become the most trusted and preferred appliance repair service provider, known for excellence, integrity, and customer satisfaction.'
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'We believe in honesty, quality workmanship, customer-first approach, and building long-term relationships based on trust and reliability.'
    }
  ]

  const timeline = [
    {
      year: '2019',
      title: 'Founded',
      description: 'Started as a small local repair service with a vision to provide quality appliance repairs'
    },
    {
      year: '2020',
      title: 'Team Expansion',
      description: 'Grew our team of certified technicians and expanded to multiple neighborhoods'
    },
    {
      year: '2021',
      title: '5,000 Repairs',
      description: 'Reached the milestone of 5,000 successful repairs with 98% customer satisfaction'
    },
    {
      year: '2022',
      title: 'Multi-City Service',
      description: 'Expanded operations to serve customers across 50+ cities'
    },
    {
      year: '2023',
      title: 'Digital Innovation',
      description: 'Launched online booking platform and mobile app for seamless customer experience'
    },
    {
      year: '2024',
      title: 'Industry Leader',
      description: 'Became the leading appliance repair service with 10,000+ satisfied customers'
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Certified Technicians',
      description: 'All our technicians are certified professionals with extensive training and experience'
    },
    {
      icon: Clock,
      title: 'Same-Day Service',
      description: 'We understand urgency and provide same-day repair services for most appliances'
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: 'We use only genuine parts and provide warranty on all our repair services'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Innovation',
      description: 'We constantly upgrade our skills and tools to handle latest appliance technologies'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                About
                <span className="text-orange-400"> Vansh</span>
                <br />Service Center
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Your trusted partner for professional home appliance repair services. 
                We've been serving families with fast, reliable, and affordable repairs since 2019.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-xl"
                >
                  <Link href="/contact">
                    <Wrench className="h-5 w-5 mr-2" />
                    Book Service
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
                    Call Us
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/5691597/pexels-photo-5691597.jpeg"
                  alt="Professional technician at work"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
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
              Our Foundation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on strong values and driven by a clear mission to serve our customers better
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
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
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small local service to a trusted brand serving thousands of customers
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-200"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-full lg:w-5/12 ${index % 2 === 1 ? 'text-right' : ''}`}>
                    <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full inline-block text-sm font-bold mb-3">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              Why Choose Vansh Service Center?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We stand out from the competition with our commitment to excellence and customer satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Experience Our Service?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust Vansh Service Center for all their appliance repair needs
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
                  <a href="https://wa.me/9876543210" target="_blank" rel="noopener noreferrer">
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
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>10,000+ Happy Customers</span>
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