// Dedicated API endpoint for products to fix Vercel deployment
module.exports = (req, res) => {
  // Set CORS and Content-Type headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Content-Type', 'application/json');
  
  // Handle OPTIONS request for preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Professional Grade Electric Mixer",
      price: 249.99,
      description: "High-performance stand mixer with 10 speed settings and multiple attachments. Perfect for baking enthusiasts and professional chefs alike. Features a powerful motor and durable construction.",
      category: "Kitchen Appliances",
      stock: 42,
      rating: 4.8,
      tags: ["appliance", "baking", "premium", "cooking"],
      supplier: {
        id: 1,
        name: "KitchenPro Supplies",
        rating: 4.9,
        contactInfo: {
          email: "support@kitchenpro.example.com",
          phone: "+1-800-123-4567"
        }
      },
      discount: 0,
      isTopSeller: true,
      imageUrl: "https://images.unsplash.com/photo-1622480916113-9897a97b5da9",
      amazonUrl: "https://amazon.com/dp/B00F8H0IVQ",
      profitMargin: 35,
      specifications: {
        weight: "22 lbs",
        dimensions: "14 x 8 x 14 inches",
        color: "Silver",
        warranty: "3 years"
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDelivery: "3-5 business days",
        amazonFBAEligible: true
      }
    },
    {
      id: 2,
      name: "Stainless Steel Knife Set",
      price: 129.99,
      description: "Complete 15-piece knife set with sharpener and wooden block. Made from high-quality stainless steel with ergonomic handles for comfort and precision cutting.",
      category: "Kitchen Utensils",
      stock: 78,
      rating: 4.5,
      tags: ["cutlery", "cooking", "chef", "kitchen"],
      supplier: {
        id: 2,
        name: "Chef's Warehouse",
        rating: 4.7,
        contactInfo: {
          email: "info@chefswarehouse.example.com",
          phone: "+1-800-234-5678"
        }
      },
      discount: 15,
      isTopSeller: true,
      imageUrl: "https://images.unsplash.com/photo-1566454825481-9668a9a44de3",
      amazonUrl: "https://amazon.com/dp/B084MHVKVN",
      profitMargin: 42,
      specifications: {
        material: "German Stainless Steel",
        pieces: "15 pieces",
        dishwasherSafe: true,
        warranty: "Lifetime"
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDelivery: "2-4 business days",
        amazonFBAEligible: true
      }
    },
    {
      id: 3,
      name: "Smart LED TV 55-inch",
      price: 499.99,
      description: "4K Ultra HD Smart LED TV with voice control and streaming apps. Enjoy crystal-clear picture quality and access to all your favorite streaming services with built-in smart features.",
      category: "Electronics",
      stock: 23,
      rating: 4.6,
      tags: ["entertainment", "smart home", "4k", "television"],
      supplier: {
        id: 3,
        name: "Global Electronics",
        rating: 4.5,
        contactInfo: {
          email: "sales@globalelectronics.example.com",
          phone: "+1-800-345-6789"
        }
      },
      discount: 0,
      isTopSeller: true,
      imageUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406",
      amazonUrl: "https://amazon.com/dp/B08QZGB6NS",
      profitMargin: 28,
      specifications: {
        resolution: "4K Ultra HD (3840 x 2160)",
        refreshRate: "120Hz",
        connectivity: "HDMI x4, USB x2, Ethernet, Wi-Fi",
        warranty: "2 years"
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDelivery: "5-7 business days",
        amazonFBAEligible: true
      }
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      price: 179.99,
      description: "Adjustable height mesh chair with lumbar support. Designed for comfort during long work hours with breathable mesh material and multiple adjustment points for personalized positioning.",
      category: "Office Furniture",
      stock: 35,
      rating: 4.3,
      tags: ["office", "furniture", "ergonomic", "chair"],
      supplier: {
        id: 4,
        name: "Office Solutions Inc",
        rating: 4.2,
        contactInfo: {
          email: "contact@officesolutions.example.com",
          phone: "+1-800-456-7890"
        }
      },
      discount: 10,
      isTopSeller: false,
      imageUrl: "https://images.unsplash.com/photo-1571722355291-11095605830a",
      amazonUrl: "https://amazon.com/dp/B08L8LCRS3",
      profitMargin: 45,
      specifications: {
        maxWeight: "300 lbs",
        material: "Mesh and steel frame",
        adjustableHeight: true,
        warranty: "5 years"
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDelivery: "3-5 business days",
        amazonFBAEligible: true
      }
    },
    {
      id: 5,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      description: "Noise-cancelling over-ear headphones with 30-hour battery life. Experience immersive sound quality with advanced noise cancellation technology and comfortable over-ear design for extended listening sessions.",
      category: "Electronics",
      stock: 56,
      rating: 4.4,
      tags: ["audio", "wireless", "bluetooth", "headphones"],
      supplier: {
        id: 3,
        name: "Global Electronics",
        rating: 4.5,
        contactInfo: {
          email: "sales@globalelectronics.example.com",
          phone: "+1-800-345-6789"
        }
      },
      discount: 0,
      isTopSeller: false,
      imageUrl: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3",
      amazonUrl: "https://amazon.com/dp/B08FC9TNXL",
      profitMargin: 50,
      specifications: {
        batteryLife: "30 hours",
        connectivity: "Bluetooth 5.0, 3.5mm jack",
        noiseControl: "Active Noise Cancellation",
        warranty: "1 year"
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDelivery: "1-3 business days",
        amazonFBAEligible: true
      }
    },
    {
      id: 6,
      name: "Smart Home Security Camera",
      price: 79.99,
      description: "Wireless indoor/outdoor security camera with motion detection and night vision. Monitor your home remotely with real-time alerts and HD video quality, even in low light conditions.",
      category: "Smart Home",
      stock: 42,
      rating: 4.2,
      tags: ["security", "smart home", "camera", "wireless"],
      supplier: {
        id: 3,
        name: "Global Electronics",
        rating: 4.5,
        contactInfo: {
          email: "sales@globalelectronics.example.com",
          phone: "+1-800-345-6789"
        }
      },
      discount: 5,
      isTopSeller: false,
      imageUrl: "https://images.unsplash.com/photo-1558002038-1055e2ff8a21",
      amazonUrl: "https://amazon.com/dp/B07KPT9F9G",
      profitMargin: 38,
      specifications: {
        resolution: "1080p HD",
        storage: "Cloud + local SD card",
        weatherproof: "IP65 rated",
        warranty: "2 years"
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDelivery: "2-4 business days",
        amazonFBAEligible: true
      }
    },
    {
      id: 7,
      name: "Automatic Coffee Maker",
      price: 149.99,
      description: "Programmable coffee maker with built-in grinder and thermal carafe. Wake up to freshly ground and brewed coffee with customizable strength settings and keep-warm function.",
      category: "Kitchen Appliances",
      stock: 28,
      rating: 4.7,
      tags: ["coffee", "appliance", "kitchen", "morning"],
      supplier: {
        id: 1,
        name: "KitchenPro Supplies",
        rating: 4.9,
        contactInfo: {
          email: "support@kitchenpro.example.com",
          phone: "+1-800-123-4567"
        }
      },
      discount: 0,
      isTopSeller: true,
      imageUrl: "https://images.unsplash.com/photo-1510972527921-ce03766a1cf1",
      amazonUrl: "https://amazon.com/dp/B07NQKH4TC",
      profitMargin: 32,
      specifications: {
        capacity: "12 cups",
        material: "Stainless steel",
        programmable: true,
        warranty: "2 years"
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDelivery: "2-4 business days",
        amazonFBAEligible: true
      }
    }
  ];

  // Return product data
  return res.status(200).json({ products });
};