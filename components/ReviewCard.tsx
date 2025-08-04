'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

interface ReviewCardProps {
  name: string
  rating: number
  message: string
  service: string
  index: number
}

export default function ReviewCard({ name, rating, message, service, index }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <Quote className="h-6 w-6 text-blue-200" />
          </div>
          
          <p className="text-gray-700 mb-4 italic line-clamp-3">
            "{message}"
          </p>
          
          <div className="border-t pt-4">
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">{service}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}