'use client'

import React, { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function ScrollReveal({ children, delay = 0, className = '' }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export function ScrollRevealGrid({ 
  children, 
  staggerDelay = 100,
  className = '' 
}: { 
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          
          const container = containerRef.current
          if (container) {
            const childElements = container.children
            const childArray = Array.from(childElements)
            
            childArray.forEach((child, index) => {
              const htmlChild = child as HTMLElement
              setTimeout(() => {
                htmlChild.style.opacity = '1'
                htmlChild.style.transform = 'translateY(0)'
              }, index * staggerDelay)
            })
          }
          
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
      
      const childElements = containerRef.current.children
      const childArray = Array.from(childElements)
      
      childArray.forEach((child) => {
        const htmlChild = child as HTMLElement
        htmlChild.style.opacity = '0'
        htmlChild.style.transform = 'translateY(30px)'
        htmlChild.style.transition = 'all 0.7s ease-out'
      })
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [staggerDelay])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}