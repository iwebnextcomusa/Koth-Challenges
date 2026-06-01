/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Testimonial, DiscountCoupon } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "ok-001",
    name: "Sooner State Cotton Trench",
    price: 189.00,
    originalPrice: 245.00,
    category: "Women",
    subcategory: "Outerwear",
    description: "Crafted in celebration of Oklahoma's warm tones, this premium double-breasted trench coat is made of fine combed cotton twill. Featuring custom storm flaps, a structured waist belt, and adjustable wrist loops, it is both elegant and durable against rolling prairie winds.",
    details: [
      "100% fine long-staple combed cotton",
      "Rain-repellent finish",
      "Stitched tortoise shell-inspired hardware",
      "Deep side pockets & interior breast pocket",
      "Designed and refined in Oklahoma City, USA",
      "Dry clean only"
    ],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=700",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=700"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Prairie Camel", value: "#C68E65" },
      { name: "Dusk Charcoal", value: "#2C2C2C" },
      { name: "Cream Alabaster", value: "#F4EFEA" }
    ],
    inventory: 24,
    rating: 4.9,
    reviewsCount: 18,
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: "ok-002",
    name: "Thunder City Varsity Jacket",
    price: 145.00,
    category: "Unisex",
    subcategory: "Jackets",
    description: "Inspired by the high energy of downtown Oklahoma City, this minimalist retro varsity bomber combines thick felt wool with soft faux-leather sleeves. With clean striped rib knit trims and a heavy metal zip, it commands attention both in the arena and on the city streets.",
    details: [
      "Premium blended melton wool body",
      "Artisan eco-leather sleeves",
      "Quilted windproof champagne lining",
      "Embossed interior serial number",
      "Two hand-warmer welt pockets"
    ],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=700",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=700"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Electric Navy", value: "#0A2540" },
      { name: "Sleek Obsidian", value: "#121212" }
    ],
    inventory: 15,
    rating: 4.8,
    reviewsCount: 32,
    isBestSeller: true,
    isFeatured: true
  },
  {
    id: "ok-003",
    name: "Red Dirt Organic Sweatshirt",
    price: 79.00,
    originalPrice: 95.00,
    category: "Unisex",
    subcategory: "Hoodies & Sweaters",
    description: "Dyed with natural mineral pigments reflecting Oklahoma's iconic rich red earth, this classic crewneck is spun from ultra-soft, GOTS-certified organic loopback Egyptian cotton. Designed with a structured, relaxed silhouette that layers beautifully.",
    details: [
      "100% GOTS-certified organic loopback cotton",
      "Naturally dyed with mineral soils",
      "Pre-shrunk and custom enzyme washed for maximum softness",
      "Reinforced coverstitched seams",
      "Ethically produced and package-minimal"
    ],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=700",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=700"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Oklahoma Red Soil", value: "#A84430" },
      { name: "Cimarron Clay", value: "#C96D55" },
      { name: "Sage Creek White", value: "#ECEAE1" }
    ],
    inventory: 48,
    rating: 4.7,
    reviewsCount: 41,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: "ok-004",
    name: "Oklahoma Horizon Linen Shirt",
    price: 68.00,
    category: "Men",
    subcategory: "Shirts",
    description: "Stay incredibly cool under the southern sun with our breathable, linen-cotton blended shirt. Featuring fine wooden buttons, a structured band collar, and a curved hem, it represents Oklahoma's relaxed charm mixed with modern versatility.",
    details: [
      "55% French flax linen, 45% combed cotton",
      "Classic modern band collar",
      "Sustainably harvested pearwood buttons",
      "Breathable, moisture-wicking weave",
      "Garment washed for a soft lived-in feel"
    ],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=700",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=700"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Salt Plains Ivory", value: "#F8F6F0" },
      { name: "Sky Blue Horizon", value: "#8CA9C2" },
      { name: "Prairie Grass Olive", value: "#6E7A60" }
    ],
    inventory: 35,
    rating: 4.6,
    reviewsCount: 14,
    isNewArrival: true
  },
  {
    id: "ok-005",
    name: "Route 66 Relaxed Denim",
    price: 110.00,
    originalPrice: 135.00,
    category: "Men",
    subcategory: "Pants",
    description: "Paying homage to the historic highway crossing through the heart of Oklahoma, these straight-leg jeans are crafted from 13.5oz robust selvedge denim. Over time, they break in to display a unique personal wear pattern that lasts a lifetime.",
    details: [
      "13.5oz genuine raw selvedge denim",
      "Reinforced copper-plated brass rivets",
      "Straight-fit, relaxed mid-rise silhouette",
      "Signature pocket embroidery",
      "Includes collectible Route 66 leather patch"
    ],
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=700",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=700"
    ],
    sizes: ["30x30", "32x32", "34x32", "36x34"],
    colors: [
      { name: "Vintage Indigo", value: "#1A2E40" },
      { name: "Worn Prairie Gray", value: "#4A4D50" }
    ],
    inventory: 19,
    rating: 4.9,
    reviewsCount: 27,
    isBestSeller: true
  },
  {
    id: "ok-006",
    name: "Norman Luxe Wool Sweater",
    price: 125.00,
    category: "Women",
    subcategory: "Hoodies & Sweaters",
    description: "A super-warm, elegant cable-knit sweater made from superfine Australian Merino Wool. With drop shoulders and a subtle mock turtleneck, it’s the ultimate statement of luxury comfort for chilly Oklahoma winter evenings.",
    details: [
      "100% Superfine Merino Wool",
      "Intricate Oklahoma wheat-patterned knit",
      "Naturally temperature-regulating",
      "Ultra-soft, zero-itch ribbed cuffs",
      "Breathable and odor-resistant"
    ],
    images: [
      "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=700",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=700"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal Heather", value: "#DFD9CE" },
      { name: "Soft Lilac Mist", value: "#C6C1CF" },
      { name: "Terracotta Glow", value: "#C07560" }
    ],
    inventory: 12,
    rating: 5.0,
    reviewsCount: 9,
    isFeatured: true
  },
  {
    id: "ok-007",
    name: "Crosstimbers Utility Parka",
    price: 155.00,
    category: "Men",
    subcategory: "Outerwear",
    description: "Designed for Oklahoman outdoor explorers, this jacket pairs rugged utility with elegant lines. Outfitted with multiple micro-fleece lined utility pockets, a storm-baffle hood, and a thermal insulation layer made entirely of recycled fibers.",
    details: [
      "Tough, tear-resistant nylon outer shell",
      "DWR water-resistant barrier",
      "Recycled eco-down filling for sub-zero warmth",
      "Hidden adjustable storm drawcords",
      "Tactile brass snap-button closures"
    ],
    images: [
      "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=700",
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=700"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Deep Forest", value: "#26402E" },
      { name: "Stealth Graphite", value: "#1F2124" }
    ],
    inventory: 9,
    rating: 4.8,
    reviewsCount: 15,
    isNewArrival: false
  },
  {
    id: "ok-008",
    name: "Prairie Winds Chiffon Dress",
    price: 115.00,
    originalPrice: 150.00,
    category: "Women",
    subcategory: "Dresses",
    description: "Capture the fluid motion of central plains breezes in this gorgeous, airy chiffon dress. Embellished with custom wildflower motifs, subtle ruffles, and an elegant waist sash, it flows gracefully from daytime galas to romantic starry nights.",
    details: [
      "Premium lightweight recycled polyester chiffon",
      "Soft, breathable interior satin lining",
      "Delicate ruffled mock neck",
      "Discreet and elegant side zipper",
      "Hand-sketched floral prairie designs"
    ],
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=700",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=700"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Wildflower Meadows", value: "#EEDBB0" },
      { name: "Prairie Rose Pink", value: "#D29F9C" }
    ],
    inventory: 16,
    rating: 4.7,
    reviewsCount: 22,
    isFeatured: true
  },
  {
    id: "ok-009",
    name: "Tulsa Art Deco Silk Scarf",
    price: 49.00,
    category: "Accessories",
    subcategory: "Scarves",
    description: "A gorgeous luxury accessory featuring intricate geometric motifs inspired by Tulsa's legendary Art Deco golden age architecture. Hand-rolled hems and exquisite luster that enhances any autumn outfit with artistic heritage.",
    details: [
      "100% heavy mulberry satin silk",
      "Hand-rolled and stitched hems",
      "Archival-grade permanent silk dyes",
      "Packaged in a premium signature box",
      "Measures 36”x36” square layout"
    ],
    images: [
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=700",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=700"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Deco Gold Black", value: "#1A140F" },
      { name: "Empire Sage Teal", value: "#385652" }
    ],
    inventory: 40,
    rating: 4.9,
    reviewsCount: 11,
    isBestSeller: true
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "t-001",
    name: "Sarah Jenkins",
    location: "Oklahoma City, OK",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    rating: 5,
    comment: "I absolute adore the Red Dirt Sweatshirt! The color matches our Oklahoma soil perfectly, and it is so soft. The fact that the ingredients are G0TS cotton and organic pigment represents real care."
  },
  {
    id: "t-002",
    name: "David Vance",
    location: "Tulsa, OK",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    rating: 5,
    comment: "The Thunder City Varsity Jacket is an absolute masterpiece. It fits perfectly, blocking chilly winds and gathering compliments everywhere I go. True Oklahoma pride paired with elite styling!"
  },
  {
    id: "t-003",
    name: "Amanda Mitchell",
    location: "Norman, OK",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    rating: 5,
    comment: "Shipping was incredibly fast. I ordered the Trench coat on Tuesday and it got to my doorstep in Norman by Thursday afternoon. The custom presentation box feels super exclusive."
  }
];

export const AVAILABLE_COUPONS: DiscountCoupon[] = [
  {
    code: "KOTH10",
    type: "percentage",
    value: 10,
    description: "Get 10% off your entire order!"
  },
  {
    code: "SOONER20",
    type: "percentage",
    value: 20,
    minSpend: 150,
    description: "Enjoy 20% off on premium purchases over $150."
  },
  {
    code: "FREESHIP",
    type: "free_shipping",
    value: 0,
    description: "Free standard ground shipping on any order across the USA."
  }
];
