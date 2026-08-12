import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  Building2,
  Globe,
  Calculator,
  Shield,
  Package,
  Truck,
  Zap,
  TrendingUp,
  Car,
  Code,
  BookOpen,
  FileText,
  GraduationCap,
  DollarSign,
  Star,
  Award,
  Users,
  Lightbulb,
  Calendar,
  Newspaper,
} from "lucide-react"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

type IconComponent = React.ComponentType<{ className?: string }>

export const getIcon = (name: string): IconComponent => {
  const icons: Record<string, IconComponent> = {
    Building2,
    Globe,
    Calculator,
    Shield,
    Package,
    Truck,
    Zap,
    TrendingUp,
    Car,
    Code,
    BookOpen,
    FileText,
    GraduationCap,
    DollarSign,
    Star,
    Award,
    Users,
    Lightbulb,
    Calendar,
    Newspaper,
  }
  return icons[name] || Building2
}

/**
 * Adds cache-busting query parameter to image URLs to prevent stale cached images
 * Uses the updated_at timestamp to ensure images are refreshed when updated
 * 
 * @param imageUrl - The original image URL
 * @param updatedAt - The timestamp when the blog post was last updated (ISO string or Date)
 * @returns The image URL with cache-busting query parameter
 */
export function addImageCacheBusting(imageUrl: string | null | undefined, updatedAt?: string | Date | null): string {
  if (!imageUrl) return '';
  
  try {
    const url = new URL(imageUrl);
    
    // Use updated_at timestamp for cache-busting, or current timestamp as fallback
    let cacheKey: string;
    if (updatedAt) {
      const timestamp = typeof updatedAt === 'string' ? new Date(updatedAt).getTime() : updatedAt.getTime();
      cacheKey = timestamp.toString();
    } else {
      // Fallback to current timestamp if no updated_at is provided
      cacheKey = Date.now().toString();
    }
    
    // Add or update the cache-busting parameter
    url.searchParams.set('v', cacheKey);
    
    return url.toString();
  } catch {
    // If URL parsing fails (e.g., relative URL), append query parameter manually
    const separator = imageUrl.includes('?') ? '&' : '?';
    const cacheKey = updatedAt 
      ? (typeof updatedAt === 'string' ? new Date(updatedAt).getTime() : updatedAt.getTime()).toString()
      : Date.now().toString();
    return `${imageUrl}${separator}v=${cacheKey}`;
  }
}
