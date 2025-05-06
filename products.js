// Standalone products API for Vercel deployment
module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle GET request
  if (req.method === 'GET') {
    const products = [
      {
        id: 1,
        name: "Professional Grade Electric Mixer",
        price: 249.99,
        description: "High-performance stand mixer with multiple attachments for all your baking needs.",
        category: "Kitchen",
        stock: 15,
        rating: 4.8,
        image: "https://cdn-icons-png.flaticon.com/512/2082/2082275.png",
        isTopSeller: true
      },
      {
        id: 2,
        name: "Smart Home Hub with Voice Control",
        price: 129.99,
        description: "Control your entire home with this smart hub featuring advanced voice recognition.",
        category: "Electronics",
        stock: 8,
        rating: 4.5,
        image: "https://cdn-icons-png.flaticon.com/512/2936/2936585.png",
        isTopSeller: false
      },
      {
        id: 3,
        name: "Abstract Canvas Wall Art Set",
        price: 89.99,
        description: "Set of 3 high-quality canvas prints with modern abstract designs to enhance any room.",
        category: "Home Decor",
        stock: 32,
        rating: 4.7,
        image: "https://cdn-icons-png.flaticon.com/512/2342/2342938.png",
        isTopSeller: false
      },
      {
        id: 4,
        name: "Mid-Century Modern Coffee Table",
        price: 159.99,
        description: "Elegant coffee table featuring solid wood construction with mid-century modern aesthetics.",
        category: "Furniture",
        stock: 12,
        rating: 4.6,
        image: "https://cdn-icons-png.flaticon.com/512/2662/2662308.png",
        isTopSeller: false
      },
      {
        id: 5,
        name: "Stainless Steel Kitchen Knife Set",
        price: 45.99,
        description: "Professional-grade knife set with ergonomic handles and precision-crafted blades.",
        category: "Kitchen",
        stock: 20,
        rating: 4.9,
        image: "https://cdn-icons-png.flaticon.com/512/1676/1676745.png",
        isTopSeller: true
      },
      {
        id: 6,
        name: "Advanced Fitness & Activity Tracker",
        price: 79.99,
        description: "Water-resistant tracker with heart rate monitoring, sleep tracking, and 7-day battery life.",
        category: "Wearables",
        stock: 5,
        rating: 4.9,
        image: "https://cdn-icons-png.flaticon.com/512/3165/3165590.png",
        isTopSeller: false
      },
      {
        id: 7,
        name: "Digital Air Fryer with 8 Presets",
        price: 119.99,
        description: "Cook healthier meals with this 5.8-quart digital air fryer featuring 8 cooking presets.",
        category: "Kitchen",
        stock: 25,
        rating: 4.7,
        image: "https://cdn-icons-png.flaticon.com/512/1065/1065570.png",
        isTopSeller: false
      },
      {
        id: 8,
        name: "Wireless Noise-Cancelling Headphones",
        price: 199.99,
        description: "Premium over-ear headphones with adaptive noise cancellation and 30-hour battery life.",
        category: "Electronics",
        stock: 18,
        rating: 4.8,
        image: "https://cdn-icons-png.flaticon.com/512/2536/2536050.png",
        isTopSeller: true
      },
      {
        id: 9,
        name: "Minimalist LED Floor Lamp",
        price: 129.99,
        description: "Modern floor lamp with dimmable LED, adjustable height, and sleek minimalist design.",
        category: "Home Decor",
        stock: 10,
        rating: 4.5,
        image: "https://cdn-icons-png.flaticon.com/512/8053/8053017.png",
        isTopSeller: false
      },
      {
        id: 10,
        name: "Ergonomic Office Chair",
        price: 229.99,
        description: "Fully adjustable office chair with lumbar support, breathable mesh back, and smooth castors.",
        category: "Furniture",
        stock: 7,
        rating: 4.8,
        image: "https://cdn-icons-png.flaticon.com/512/2647/2647519.png",
        isTopSeller: false
      }
    ];

    return res.json({ products });
  }

  // Handle unsupported methods
  return res.status(405).json({ error: 'Method Not Allowed' });
};