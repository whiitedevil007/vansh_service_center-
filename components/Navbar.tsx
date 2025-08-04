'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, MessageCircle, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Vansh Service Center</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Contact Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-green-500 text-green-600 hover:bg-green-50"
              >
                <a href="https://wa.me/+918386848281" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <a href="tel:+919876543210">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile Contact Buttons */}
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-green-500 text-green-600 hover:bg-green-50"
                  >
                    <a href="https://wa.me/9876543210" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <a href="tel:+919876543210">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}