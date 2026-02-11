import { BusinessInfo, ServiceCategory, GalleryImage } from './types';
import serviceAccess from './assets/service-access.png';

// Gallery images for FEATURED_PROJECTS (Home page)
import galleryCedarFence from './assets/gallery/Cedar Wood fence with 6inch bevel board botton.jpg';
import galleryDrivewayGate from './assets/gallery/Double Driveway Gate at south of Houston.jpg';
import galleryWroughtIron from './assets/gallery/Wrought Iron Fence at the heights.png';
import gallerySecurityGate from './assets/gallery/Security Modern Gate.jpg';
import galleryAccessHerod from './assets/gallery/IMG_0805.JPG';
import galleryRailing from './assets/gallery/IMG_0241.png';
import galleryOrnamentalWall from './assets/gallery/Ornamental wall at a commercial Project.png';
import gatesHeroCustom from './assets/gallery/IMG_8283.png';
import railingsHeroCustom from './assets/gallery/IMG_4194.png';

export const BUSINESS_INFO: BusinessInfo = {
  name: 'JN Ornamental Design LLC',
  shortName: 'JN Ornamental',
  tagline: 'Fencing & Fabrication',
  phone: '(832) 594-6075',
  email: 'jnornamentaldesign@gmail.com',
  address: '410 Northville St, Unit A, Houston, TX 77038',
  website: 'jnornamentaldesign.com',
  languages: ['English', 'Spanish'],
  yearsExperience: '10+',
  rating: 4.9,
  reviewCount: 50,
  serviceAreas: ['Houston, TX', 'Katy', 'Sugar Land', 'The Woodlands', 'Cypress', 'Pearland'],
  credentials: ['BBB Accredited', 'A+ Rating', 'Thumbtack Top Pro', 'Licensed & Insured'],
  socialLinks: {
    facebook: 'https://facebook.com/jnornamentaldesign',
    instagram: 'https://instagram.com/jnornamentaldesign',
    tiktok: 'https://tiktok.com/@jnornamentaldesign',
    thumbtack: 'https://www.thumbtack.com/tx/houston/fence-contractors/jn-ornamental-design-llc',
  }
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    title: 'Fences',
    slug: 'fences',
    description: 'From elegant wrought iron to practical chain link, we build fences that stand the test of time. Every fence is custom-fitted to your property with precision craftsmanship.',
    heroImage: galleryCedarFence,
    services: [
      {
        title: 'Wrought Iron Fencing',
        description: 'Elegant, durable security fencing with decorative options.',
        icon: 'fence',
        features: ['Custom designs', 'Powder coating', 'Decorative finials', 'Security spikes']
      },
      {
        title: 'Chain Link Fencing',
        description: 'Affordable, practical fencing for residential and commercial use.',
        icon: 'chainlink',
        features: ['Galvanized steel', 'Vinyl coated', 'Privacy slats available']
      },
      {
        title: 'Wood Fencing',
        description: 'Classic wooden fences with steel post reinforcement.',
        icon: 'wood',
        features: ['Cedar & pine options', 'Steel posts', 'Stain & seal service']
      },
      {
        title: 'Aluminum Fencing',
        description: 'Low-maintenance aluminum fencing that looks like iron.',
        icon: 'aluminum',
        features: ['Rust-free', 'Multiple colors', 'Pool code compliant']
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600',
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600'
    ]
  },
  {
    title: 'Gates',
    slug: 'gates',
    description: 'Make a statement with a custom-designed gate. Whether you need a grand driveway entrance or a simple side gate, we create gates that combine beauty with security.',
    heroImage: gatesHeroCustom,
    services: [
      {
        title: 'Driveway Gates',
        description: 'Grand entrance gates in swing or sliding configurations.',
        icon: 'gate',
        features: ['Swing gates', 'Slide gates', 'Bi-parting options', 'Custom widths']
      },
      {
        title: 'Pedestrian Gates',
        description: 'Walk-through gates for side yards and garden access.',
        icon: 'pedestrian',
        features: ['Self-closing hinges', 'Keyed locks', 'Matching fence style']
      },
      {
        title: 'Security Gates',
        description: 'Heavy-duty gates for commercial and high-security applications.',
        icon: 'security',
        features: ['Steel construction', 'Anti-climb design', 'Crash rated options']
      },
      {
        title: 'Decorative Gates',
        description: 'Artistic gate designs featuring scrollwork and custom elements.',
        icon: 'decorative',
        features: ['Hand-forged details', 'Family crests', 'Custom artwork']
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=600',
      'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=600',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600'
    ]
  },
  {
    title: 'Railings',
    slug: 'railings',
    description: 'Safety meets artistry in our custom railing designs. From spiral staircases to balcony rails, we craft metalwork that elevates your space.',
    heroImage: railingsHeroCustom,
    services: [
      {
        title: 'Stair Railings',
        description: 'Interior and exterior stair railings built to code.',
        icon: 'rail',
        features: ['ADA compliant', 'Custom balusters', 'Wood & iron combos']
      },
      {
        title: 'Balcony Railings',
        description: 'Safe, stylish railings for balconies and elevated decks.',
        icon: 'balcony',
        features: ['Load tested', 'Weather resistant', 'Glass panel options']
      },
      {
        title: 'Spiral Staircases',
        description: 'Space-saving spiral stairs for indoor and outdoor use.',
        icon: 'spiral',
        features: ['Custom diameters', 'Indoor/outdoor', 'Matching rails']
      },
      {
        title: 'Handrails',
        description: 'Grab rails and handrails for accessibility and safety.',
        icon: 'handrail',
        features: ['Wall mounted', 'Post mounted', 'Continuous rails']
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600'
    ]
  },
  {
    title: 'Access Control',
    slug: 'access-control',
    description: 'Secure your property with professional gate automation and access control systems. From keypads to smartphone-controlled entry, we install and maintain complete access solutions.',
    heroImage: galleryAccessHerod,
    services: [
      {
        title: 'Gate Automation',
        description: 'Electric gate openers for swing and slide gates with remote control access.',
        icon: 'gear',
        features: ['Swing gate operators', 'Slide gate operators', 'Remote controls', 'Battery backup']
      },
      {
        title: 'Keypad Entry Systems',
        description: 'Secure numeric keypad access for residential and commercial properties.',
        icon: 'keypad',
        features: ['Programmable codes', 'Weather resistant', 'Night illumination']
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'
    ]
  }
];



export const FEATURED_PROJECTS: GalleryImage[] = [
  { src: galleryDrivewayGate, alt: 'Double Driveway Gate — South Houston', category: 'Gates' },
  { src: galleryRailing, alt: 'Custom Railing Design', category: 'Railings' },
  { src: galleryWroughtIron, alt: 'Wrought Iron Fence — The Heights', category: 'Fences' },
  { src: gallerySecurityGate, alt: 'Modern Security Gate', category: 'Gates' },
  { src: galleryCedarFence, alt: 'Cedar Wood Fence with Bevel Board', category: 'Fences' },
  { src: galleryOrnamentalWall, alt: 'Ornamental Wall — Commercial Project', category: 'Fences' },
];

export const STATS = [
  { value: '10+', label: 'Years Experience' },
  { value: '1,500+', label: 'Projects Completed' },
  { value: '4.9', label: 'Star Rating' },
  { value: '100%', label: 'Satisfaction' },
];
