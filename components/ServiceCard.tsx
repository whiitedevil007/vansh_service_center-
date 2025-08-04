'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Star } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  image: string
  slug: string
  index: number
}

export default function ServiceCard({ title, description, image, slug, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span className="text-xs font-medium">4.9</span>
          </div>
        </div>
        
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-600 line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Starting from</span>
              <span className="text-lg font-bold text-green-600">₹299</span>
            </div>
            
            <div className="flex space-x-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Link href={`/services/${slug}`}>
                  Learn More
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Link href="/contact">
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}