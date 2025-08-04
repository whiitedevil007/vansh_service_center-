import Link from 'next/link'
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter, Settings } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Vansh Service Center</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted partner for fast, affordable, and professional home appliance repair services. 
              We specialize in repairing all major appliances across all major brands.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Our Services
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors text-sm">
                About Us
              </Link>
              <Link href="/blog" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Blog
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Contact Us
              </Link>
              <Link href="/admin" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Admin Panel
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <div className="space-y-2">
              <Link href="/services/refrigerator-repair" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Refrigerator Repair
              </Link>
              <Link href="/services/washing-machine-repair" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Washing Machine Repair
              </Link>
              <Link href="/services/ac-repair-service" className="block text-gray-300 hover:text-white transition-colors text-sm">
                AC Repair & Service
              </Link>
              <Link href="/services/microwave-repair" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Microwave Repair
              </Link>
              <Link href="/services/tv-repair" className="block text-gray-300 hover:text-white transition-colors text-sm">
                TV Repair
              </Link>
              <Link href="/services/water-purifier-service" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Water Purifier Service
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-white transition-colors text-sm">
                  +91 8386848281
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-4 w-4 text-green-400" />
                <a href="https://wa.me/+918386848281" className="text-gray-300 hover:text-white transition-colors text-sm">
                  WhatsApp Support
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-orange-400" />
                <a href="mailto:support@vanshservice.com" className="text-gray-300 hover:text-white transition-colors text-sm">
                  support@vanshservice.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-red-400 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Street no 0B, Vansh Service Center, Bibi Wala Road Bathinda, Punjab 151001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Vansh Service Center. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}