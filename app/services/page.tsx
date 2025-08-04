'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ServiceCard from '@/components/ServiceCard'
import { supabase, Service } from '@/lib/supabase'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) {
        setServices(data)
        setFilteredServices(data)
      }
      setLoading(false)
    }

    fetchServices()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredServices(filtered)
    } else {
      setFilteredServices(services)
    }
  }, [searchTerm, services])

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
              Our Repair Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Professional appliance repair services for all major brands with certified technicians and genuine parts
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
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{filteredServices.length} services found</span>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
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
          )}

          {!loading && filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No services found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Need Help Choosing a Service?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our expert team is ready to help you find the right repair solution for your appliance
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-xl"
              >
                <a href="/contact">
                  Get Free Consultation
                </a>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-black hover:bg-white hover:text-blue-900 px-8 py-6 text-lg font-semibold rounded-xl"
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