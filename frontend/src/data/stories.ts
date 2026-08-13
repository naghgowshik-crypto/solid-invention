import { StoryItem } from '../types/models';

export const STORIES_DATA: StoryItem[] = [
  {
    id: 'story-1',
    title: 'Behind the Lens: A Day with the Capture Team',
    slug: 'behind-the-lens-capture-team',
    excerpt: 'Step behind the camera to discover how our photography crew prepares for high-pressure live event coverage, golden hour chasing, and post-production perfection.',
    content: `When the sun dips below the horizon at Sreyas Institute of Engineering and Technology, casting warm golden light across the central quadrangle, most students head home. But for the Capture Team, the real work is just beginning.

### The Anatomy of a Live Event Coverage
Covering an annual fest or guest keynote requires precision, speed, and sharp anticipation. Our photographers carry dual camera bodies—one equipped with a fast 24-70mm f/2.8 lens for wide environmental context, and another with an 85mm f/1.4 prime for intimate facial expressions.

"You can't ask a speaker to repeat an emotional gesture or an artist to replay a high note," explains Siddharth Rao, Capture Lead. "You have to read the room 3 seconds before it happens."

### Color Grading the Campus Identity
Post-processing is where raw sensor data converts into the signature Sreyas Media Club aesthetic. Using custom Lightroom presets tuned for rich shadow detail, warm highlights, and subtle gold accents, every image published meets professional editorial standards.`,
    category: 'Behind the Lens',
    coverImageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
    author: {
      name: 'Ananya Reddy',
      role: 'Vice President & Editor',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop'
    },
    publishedAt: '05 August 2026',
    readTimeMinutes: 4,
    featured: true
  },
  {
    id: 'story-2',
    title: 'Moments That Made Our Campus Come Alive',
    slug: 'moments-that-made-our-campus-come-alive',
    excerpt: 'A retrospective look at the defining visual highlights of the past academic year, from flash mobs to tech fest victory ceremonies.',
    content: `A college campus is a living organism, vibrating with energy, intellect, and emotion. Over the past 12 months, Sreyas Media Club documented over 20 major events, capturing over 10,000 raw frames.

### From Flash Mobs to Hackathon Finals
What makes a moment memorable? It isn't just the stage lights; it is the raw human reaction. The exhausted smile of a team winning a 36-hour hackathon at 4 AM; the synchronized energy of 200 students breaking into dance; the quiet focus of a researcher presenting a prototype.

### Archiving Memories for Generations
"Long after degrees are awarded and graduates move across the world, these photographs remain," says President K. Sreyas Vardhan. "We aren't just taking photos; we are building the permanent history of our institution."`,
    category: 'Campus Life',
    coverImageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
    author: {
      name: 'Rahul Sharma',
      role: 'General Secretary',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop'
    },
    publishedAt: '28 July 2026',
    readTimeMinutes: 5,
    featured: true
  },
  {
    id: 'story-3',
    title: 'From an Idea to the First Frame',
    slug: 'from-idea-to-first-frame',
    excerpt: 'The story of how four passionate student creators pitched, structured, and founded the official Sreyas Media Club.',
    content: `Every movement starts with a single conversation. In late 2025, four students met in the cafeteria with a shared observation: while Sreyas produced world-class engineers, its vibrant campus stories remained untold or hidden in personal phone galleries.

### Unifying Creative Talent Under One Banner
Instead of fragmented social media pages, the vision was clear: build a professional media ecosystem. Four dedicated divisions—Capture, Shoot, Ambassadors, and Film—were established, complete with camera equipment checkout systems, soundproofed editing suites, and structured student leadership.

### Looking Ahead to FIRST FRAME
As we count down to our official launch event, FIRST FRAME, the club stands 50+ members strong, ready to elevate campus media to industry standards.`,
    category: 'Creative Journey',
    coverImageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop',
    author: {
      name: 'Vikramaditya Rao',
      role: 'Creative Director',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop'
    },
    publishedAt: '15 July 2026',
    readTimeMinutes: 3,
    featured: true
  }
];
