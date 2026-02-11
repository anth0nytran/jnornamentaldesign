import { GalleryImage } from './types';

// ── Image imports ────────────────────────────────────────────
import cedarFence from './assets/gallery/Cedar Wood fence with 6inch bevel board botton.jpg';
import doubleDrivewayGate from './assets/gallery/Double Driveway Gate at south of Houston.jpg';
import img0003 from './assets/gallery/IMG_0003.png';
import img0236 from './assets/gallery/IMG_0236.png';
import img0241 from './assets/gallery/IMG_0241.png';
import img0348 from './assets/gallery/IMG_0348.JPG';
import img0389 from './assets/gallery/IMG_0389.JPG';
import img0447 from './assets/gallery/IMG_0447.png';
import img0448 from './assets/gallery/IMG_0448.png';
import img0586 from './assets/gallery/IMG_0586.jpeg';
import img0672 from './assets/gallery/IMG_0672.png';
import img0696 from './assets/gallery/IMG_0696.png';
import img0803 from './assets/gallery/IMG_0803.png';
import img0805 from './assets/gallery/IMG_0805.JPG';
import img1361 from './assets/gallery/IMG_1361.JPG';
import img1606 from './assets/gallery/IMG_1606.PNG';
import img4194 from './assets/gallery/IMG_4194.png';
import img4927 from './assets/gallery/IMG_4927.png';
import img5091 from './assets/gallery/IMG_5091.PNG';
import img5137 from './assets/gallery/IMG_5137.png';
import img5159 from './assets/gallery/IMG_5159.png';
import img6960 from './assets/gallery/IMG_6960.png';
import img8283 from './assets/gallery/IMG_8283.png';
import ornamentalWall from './assets/gallery/Ornamental wall at a commercial Project.png';
import securityGate from './assets/gallery/Security Modern Gate.jpg';
import wroughtIronFence from './assets/gallery/Wrought Iron Fence at the heights.png';
import dadGarage from './assets/gallery/starting at my Dad Garage.png';

// ── Video imports ────────────────────────────────────────────
import video1542 from './assets/gallery/IMG_1542.MOV';
import video7788 from './assets/gallery/IMG_7788.mov';

// ── Gallery data ─────────────────────────────────────────────
export const GALLERY_IMAGES: GalleryImage[] = [
    // ─ Named / descriptive photos ──────────────────────────────
    { src: cedarFence, alt: 'Cedar Wood Fence with Bevel Board', category: 'Fences', orientation: 'landscape' },
    { src: doubleDrivewayGate, alt: 'Double Driveway Gate — South Houston', category: 'Gates', orientation: 'landscape' },
    { src: ornamentalWall, alt: 'Ornamental Wall — Commercial Project', category: 'Fences', orientation: 'portrait' },
    { src: securityGate, alt: 'Modern Security Gate', category: 'Gates', orientation: 'landscape' },
    { src: wroughtIronFence, alt: 'Wrought Iron Fence — The Heights', category: 'Fences', orientation: 'portrait' },
    { src: dadGarage, alt: 'Where It All Started — Dad\'s Garage', category: 'Projects', orientation: 'portrait' },

    // ─ Project photos ──────────────────────────────────────────
    { src: img0003, alt: 'Custom Iron Gate Installation', category: 'Gates', orientation: 'portrait' },
    { src: img0236, alt: 'Ornamental Fence Panel Detail', category: 'Fences', orientation: 'portrait' },
    { src: img0241, alt: 'Custom Railing Design', category: 'Railings', orientation: 'portrait' },
    { src: img0348, alt: 'Residential Fence Project', category: 'Fences', orientation: 'landscape' },
    { src: img0389, alt: 'Iron Gate Close-Up', category: 'Gates', orientation: 'landscape' },
    { src: img0447, alt: 'Decorative Iron Work', category: 'Projects', orientation: 'portrait' },
    { src: img0448, alt: 'Custom Fabrication Detail', category: 'Projects', orientation: 'portrait' },
    { src: img0586, alt: 'Completed Fence Installation', category: 'Fences', orientation: 'landscape' },
    { src: img0672, alt: 'Ornamental Gate Design', category: 'Gates', orientation: 'portrait' },
    { src: img0696, alt: 'Welding & Fabrication In Progress', category: 'Projects', orientation: 'portrait' },
    { src: img0803, alt: 'Custom Iron Railing', category: 'Railings', orientation: 'portrait' },
    { src: img0805, alt: 'Finished Gate Project', category: 'Gates', orientation: 'landscape' },
    { src: img1361, alt: 'Fence & Gate Combo', category: 'Fences', orientation: 'landscape' },
    { src: img1606, alt: 'Decorative Security Fence', category: 'Fences', orientation: 'portrait' },
    { src: img4194, alt: 'Iron Work Craftsmanship', category: 'Projects', orientation: 'portrait' },
    { src: img4927, alt: 'Property Gate Installation', category: 'Gates', orientation: 'portrait' },
    { src: img5091, alt: 'Custom Stair Railing', category: 'Railings', orientation: 'portrait' },
    { src: img5137, alt: 'Large Gate Fabrication', category: 'Gates', orientation: 'portrait' },
    { src: img5159, alt: 'Ornamental Iron Panel', category: 'Fences', orientation: 'portrait' },
    { src: img6960, alt: 'Driveway Gate — Houston', category: 'Gates', orientation: 'portrait' },
    { src: img8283, alt: 'Iron Fence & Column Detail', category: 'Fences', orientation: 'portrait' },

    // ─ Videos ──────────────────────────────────────────────────
    { src: video1542, alt: 'Gate Installation Walkthrough', category: 'Videos', type: 'video', orientation: 'portrait' },
    { src: video7788, alt: 'Fabrication Process', category: 'Videos', type: 'video', orientation: 'portrait' },
];
