'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  CheckCircle,
  Send,
  Headphones
} from 'lucide-react'
import MapEmbed from '@/components/MapEmbed'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  appliance_type: z.string().min(1, 'Please select an appliance type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  location: z.string().min(5, 'Please provide your location'),
})

type ContactForm = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  })

  const applianceTypes = [
    'Refrigerator',
    'Washing Machine',
    'Air Conditioner',
    'Microwave',
    'TV/Home Theatre',
    'Water Purifier',
    'Dishwasher',
    'Induction Cooktop',
    'Other'
  ]

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([data])

      if (error) throw error

      toast({
        title: 'Form submitted successfully!',
        description: 'We will contact you within 30 minutes to schedule your service.',
      })

      reset()
    } catch (error) {
      toast({
        title: 'Submission failed',
        description: 'Please try again or call us directly.',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
              Contact Us
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with our expert team for quick and reliable appliance repair services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardTitle className="text-2xl font-bold flex items-center text-blue-900">
                    <Send className="h-6 w-6 mr-2" />
                    Book Your Service
                  </CardTitle>
                  <p className="text-blue-700">Fill out the form and we'll contact you within 30 minutes</p>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          {...register('name')}
                          placeholder="Enter your full name"
                          className="mt-1"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          {...register('phone')}
                          placeholder="Enter your phone number"
                          className="mt-1"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="Enter your email address"
                        className="mt-1"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="appliance_type">Appliance Type *</Label>
                      <Select onValueChange={(value) => setValue('appliance_type', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select appliance type" />
                        </SelectTrigger>
                        <SelectContent>
                          {applianceTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.appliance_type && (
                        <p className="text-red-500 text-sm mt-1">{errors.appliance_type.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        {...register('location')}
                        placeholder="Enter your complete address"
                        className="mt-1"
                      />
                      {errors.location && (
                        <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message">Describe the Problem *</Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder="Please describe the issue with your appliance"
                        rows={4}
                        className="mt-1"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-semibold rounded-xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Submit Request
                        </>
                      )}
                    </Button>

                    <div className="text-center text-sm text-gray-500">
                      By submitting this form, you agree to our terms of service
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Quick Contact */}
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                  <CardTitle className="text-2xl font-bold flex items-center text-green-900">
                    <Headphones className="h-6 w-6 mr-2" />
                    Quick Contact
                  </CardTitle>
                  <p className="text-green-700">Need immediate assistance? Contact us directly</p>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                      <div className="bg-blue-600 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Call Us</h3>
                        <a href="tel:+919876543210" className="text-blue-600 font-medium hover:text-blue-700">
                          +91 8386848281
                        </a>
                        <p className="text-sm text-gray-500">24/7 Available</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                      <div className="bg-green-600 p-3 rounded-full">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                        <a 
                          href="https://wa.me/+918386848281" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-green-600 font-medium hover:text-green-700"
                        >
                          Chat with us
                        </a>
                        <p className="text-sm text-gray-500">Instant response</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-xl">
                      <div className="bg-orange-600 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Email</h3>
                        <a 
                          href="mailto:support@vanshservice.com" 
                          className="text-orange-600 font-medium hover:text-orange-700"
                        >
                          support@vanshservice.com
                        </a>
                        <p className="text-sm text-gray-500">24-hour response</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-xl">
                      <div className="bg-red-600 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Address</h3>
                        <p className="text-red-600 font-medium">Street no 0B Bibi Wala Road</p>
                        <p className="text-sm text-gray-500">Vansh Service Center  Bathinda, punjab 151001</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                  <CardTitle className="text-xl font-bold flex items-center text-purple-900">
                    <Clock className="h-5 w-5 mr-2" />
                    Service Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Monday - Saturday</span>
                      <span className="font-semibold text-purple-600">8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Sunday</span>
                      <span className="font-semibold text-purple-600">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Emergency Service</span>
                      <span className="font-semibold text-green-600">24/7 Available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Guarantee */}
              <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-400" />
                  <h3 className="text-xl font-bold mb-2">Service Guarantee</h3>
                  <p className="text-blue-100 mb-4">
                    We guarantee same-day service with 30-day warranty on all repairs
                  </p>
                  <div className="text-sm text-blue-200">
                    ⚡ Same day service • 🛡️ 30-day warranty • 📍 Doorstep service
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Find Us
            </h2>
            <p className="text-lg text-gray-600">
              Visit our service center or we can come to you
            </p>
          </motion.div>

            <div className="bg-gray-200 rounded-2xl h-96 w-full overflow-hidden">
            <MapEmbed />
            </div>
        </div>
      </section>
    </div>
  )
}