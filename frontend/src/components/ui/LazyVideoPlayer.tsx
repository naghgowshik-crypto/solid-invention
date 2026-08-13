import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { LazyImage } from './LazyImage';

interface LazyVideoPlayerProps {
  thumbnailUrl: string;
  videoUrl: string;
  title: string;
  className?: string;
}

export const LazyVideoPlayer: React.FC<LazyVideoPlayerProps> = ({
  thumbnailUrl,
  videoUrl,
  title,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper to extract YouTube embed URL if applicable
  const getEmbedUrl = (url: string): string => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url;
  };

  if (isPlaying) {
    const embedUrl = getEmbedUrl(videoUrl);
    return (
      <div className={`relative overflow-hidden bg-black aspect-video rounded-xl ${className}`}>
        {embedUrl.includes('youtube.com/embed') || embedUrl.includes('player.vimeo.com') ? (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          <video src={videoUrl} controls autoPlay className="w-full h-full object-contain" />
        )}
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsPlaying(true)}
      className={`group relative overflow-hidden bg-navy-900 aspect-video rounded-xl cursor-pointer select-none ${className}`}
    >
      <LazyImage
        src={thumbnailUrl}
        alt={title}
        widthParam={800}
        aspectRatio="wide"
        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
      />

      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gold-400/90 text-navy-950 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-gold-300 transition-all duration-300">
          <Play className="w-8 h-8 fill-navy-950 ml-1" />
        </div>
      </div>
    </div>
  );
};
