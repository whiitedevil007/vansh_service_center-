'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

interface BlogCardProps {
  title: string
  summary: string
  slug: string
  author: string
  imageUrl: string
  createdAt: string
  index: number
}

export default function BlogCard({ title, summary, slug, author, imageUrl, createdAt, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        
        <CardHeader className="pb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{format(new Date(createdAt), 'MMM dd, yyyy')}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-gray-600 line-clamp-3 mb-4">
            {summary}
          </p>
          
          <Button
            asChild
            variant="ghost"
            className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-700 group"
          >
            <Link href={`/blog/${slug}`}>
              Read More
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}