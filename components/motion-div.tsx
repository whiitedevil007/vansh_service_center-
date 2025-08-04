'use client'

import { motion } from 'framer-motion'
import { ComponentProps } from 'react'

interface MotionDivProps extends ComponentProps<typeof motion.div> {}

export function MotionDiv({ children, ...props }: MotionDivProps) {
  return <motion.div {...props}>{children}</motion.div>
}