// Enhanced products API with more categories and wearables
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
      },
      {
        id: 11,
        name: "Premium Smart Watch",
        price: 189.99,
        description: "Feature-rich smartwatch with health monitoring, GPS, and seamless smartphone integration.",
        category: "Wearables",
        stock: 14,
        rating: 4.7,
        image: "https://cdn-icons-png.flaticon.com/512/2972/2972531.png",
        isTopSeller: true
      },
      {
        id: 12,
        name: "Professional Chef's Knife",
        price: 79.99,
        description: "High-carbon stainless steel 8-inch chef knife with perfect balance and precision cutting.",
        category: "Kitchen",
        stock: 22,
        rating: 4.9,
        image: "https://cdn-icons-png.flaticon.com/512/3014/3014553.png",
        isTopSeller: false
      },
      {
        id: 13,
        name: "Portable Bluetooth Speaker",
        price: 69.99,
        description: "Waterproof portable speaker with 20-hour battery life and immersive 360° sound.",
        category: "Electronics",
        stock: 30,
        rating: 4.6,
        image: "https://cdn-icons-png.flaticon.com/512/2777/2777199.png",
        isTopSeller: false
      },
      {
        id: 14,
        name: "Indoor Plant Collection",
        price: 49.99,
        description: "Set of 3 low-maintenance houseplants with decorative pots to refresh any space.",
        category: "Home Decor",
        stock: 18,
        rating: 4.4,
        image: "https://cdn-icons-png.flaticon.com/512/628/628324.png",
        isTopSeller: false
      },
      {
        id: 15,
        name: "Adjustable Standing Desk",
        price: 349.99,
        description: "Electric height-adjustable desk with memory settings and spacious work surface.",
        category: "Furniture",
        stock: 8,
        rating: 4.7,
        image: "https://cdn-icons-png.flaticon.com/512/2933/2933254.png",
        isTopSeller: true
      },
      {
        id: 16,
        name: "Wireless Earbuds with Charging Case",
        price: 89.99,
        description: "True wireless earbuds with noise isolation, touch controls, and 24-hour battery life.",
        category: "Electronics",
        stock: 25,
        rating: 4.6,
        image: "https://cdn-icons-png.flaticon.com/512/3655/3655959.png",
        isTopSeller: false
      },
      {
        id: 17,
        name: "Smart Fitness Scale",
        price: 49.99,
        description: "Bluetooth-enabled scale that measures weight, BMI, body fat, and 14 other metrics.",
        category: "Wearables",
        stock: 18,
        rating: 4.5,
        image: "https://cdn-icons-png.flaticon.com/512/3165/3165589.png",
        isTopSeller: false
      },
      {
        id: 18,
        name: "Running Shoes with Responsive Cushioning",
        price: 129.99,
        description: "Lightweight running shoes with responsive cushioning and breathable mesh upper.",
        category: "Wearables",
        stock: 12,
        rating: 4.7,
        image: "https://cdn-icons-png.flaticon.com/512/2405/2405432.png",
        isTopSeller: false
      },
      {
        id: 19,
        name: "Smart Coffee Maker",
        price: 149.99,
        description: "Programmable coffee maker with smartphone app control and customizable brewing settings.",
        category: "Kitchen",
        stock: 9,
        rating: 4.5,
        image: "https://cdn-icons-png.flaticon.com/512/2935/2935239.png",
        isTopSeller: false
      },
      {
        id: 20,
        name: "Wireless Charging Pad",
        price: 29.99,
        description: "Fast 15W wireless charging pad compatible with Qi-enabled devices.",
        category: "Electronics",
        stock: 35,
        rating: 4.4,
        image: "https://cdn-icons-png.flaticon.com/512/3659/3659724.png",
        isTopSeller: false
      }
    ];

    return res.json({ products });
  }

  // Handle unsupported methods
  return res.status(405).json({ error: 'Method Not Allowed' });
};