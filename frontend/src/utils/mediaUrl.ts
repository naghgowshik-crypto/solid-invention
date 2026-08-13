/**
 * Media URL utility designed for scalable CDN/Cloudinary integration.
 * In Phase 1, it formats Unsplash and local asset URLs with optimized resolution parameters.
 * In Phase 2, this function can transparently append Cloudinary transformation parameters (e.g. w_800,q_auto,f_auto).
 */

interface ImageOptions {
  width?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'auto';
}

export function getOptimizedImageUrl(url: string, options: ImageOptions = {}): string {
  if (!url) return 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop';
  
  const { width = 800, quality = 80 } = options;

  // Unsplash image optimization
  if (url.includes('images.unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?q=${quality}&w=${width}&auto=format&fit=crop`;
  }

  // Future Cloudinary URL handling placeholder
  if (url.includes('res.cloudinary.com')) {
    return url.replace('/upload/', `/upload/w_${width},q_${quality},f_auto/`);
  }

  return url;
}

export function getSrcSet(url: string, widths: number[] = [400, 800, 1200]): string {
  if (!url || !url.includes('images.unsplash.com')) return '';
  return widths.map(w => `${getOptimizedImageUrl(url, { width: w })} ${w}w`).join(', ');
}
