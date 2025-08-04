import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Service = {
  id: string
  title: string
  slug: string
  description: string
  image_url: string
  brands: string[]
  faqs: { question: string; answer: string }[]
  created_at: string
}

export type Review = {
  id: string
  name: string
  rating: number
  message: string
  service: string
  created_at: string
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  author: string
  image_url: string
  created_at: string
  published: boolean
}

export type ContactSubmission = {
  id: string
  name: string
  email: string
  phone: string
  appliance_type: string
  message: string
  location: string
  status: 'new' | 'in_progress' | 'resolved'
  created_at: string
}