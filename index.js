// Enhanced API endpoint for Vercel serverless deployment
module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  // Handle OPTIONS request for preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Parse URL and query parameters
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathSegments = url.pathname.split('/').filter(Boolean);
  const queryParams = Object.fromEntries(url.searchParams);
  
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

  // Full supplier data
  const suppliers = [
    {
      id: 1,
      name: "KitchenPro Supplies",
      description: "Leading provider of high-quality kitchen appliances and tools for both home cooks and professional chefs.",
      rating: 4.9,
      established: 1998,
      location: "Chicago, IL",
      shippingSpeed: "Fast",
      specialties: ["Kitchen Appliances", "Cookware", "Baking Tools"],
      contactInfo: {
        email: "support@kitchenpro.example.com",
        phone: "+1-800-123-4567",
        website: "kitchenpro.example.com"
      },
      paymentTerms: "Net 30",
      minimumOrderValue: 100,
      returnPolicy: "30-day returns on most items",
      fulfillmentOptions: ["Direct to Amazon FBA", "Dropshipping"]
    },
    {
      id: 2,
      name: "Chef's Warehouse",
      description: "Premium supplier of professional-grade cutlery and cooking utensils used by top restaurants and culinary schools.",
      rating: 4.7,
      established: 2005,
      location: "New York, NY",
      shippingSpeed: "Standard",
      specialties: ["Cutlery", "Kitchen Utensils", "Professional Tools"],
      contactInfo: {
        email: "info@chefswarehouse.example.com",
        phone: "+1-800-234-5678",
        website: "chefswarehouse.example.com"
      },
      paymentTerms: "Net 45",
      minimumOrderValue: 200,
      returnPolicy: "14-day returns on unused items",
      fulfillmentOptions: ["Direct to Amazon FBA", "Wholesale"]
    },
    {
      id: 3,
      name: "Global Electronics",
      description: "International distributor of consumer electronics, specializing in audio equipment, TVs, and smart home devices.",
      rating: 4.5,
      established: 2010,
      location: "San Jose, CA",
      shippingSpeed: "Express",
      specialties: ["TVs", "Audio Equipment", "Smart Home", "Accessories"],
      contactInfo: {
        email: "sales@globalelectronics.example.com",
        phone: "+1-800-345-6789",
        website: "globalelectronics.example.com"
      },
      paymentTerms: "Net 30",
      minimumOrderValue: 500,
      returnPolicy: "30-day returns with restocking fee",
      fulfillmentOptions: ["Direct to Amazon FBA", "Dropshipping", "Wholesale"]
    },
    {
      id: 4,
      name: "Office Solutions Inc",
      description: "Complete office furniture and supply provider focusing on ergonomic designs and modern workplace solutions.",
      rating: 4.2,
      established: 2003,
      location: "Grand Rapids, MI",
      shippingSpeed: "Standard",
      specialties: ["Office Furniture", "Ergonomic Chairs", "Desks", "Office Supplies"],
      contactInfo: {
        email: "contact@officesolutions.example.com",
        phone: "+1-800-456-7890",
        website: "officesolutions.example.com"
      },
      paymentTerms: "Net 60",
      minimumOrderValue: 300,
      returnPolicy: "45-day satisfaction guarantee",
      fulfillmentOptions: ["Direct to Amazon FBA", "White Label"]
    }
  ];

  // User data (would be in a database in a real application)
  const users = [
    {
      id: 1,
      username: "demo",
      email: "demo@example.com",
      firstName: "Demo",
      lastName: "User",
      role: "admin",
      createdAt: "2024-01-15"
    }
  ];

  // Handle different API routes
  
  // Root API - return basic information
  if (pathSegments.length === 0) {
    return res.status(200).json({
      name: "1-Click-Wholesale API",
      version: "1.0.0",
      description: "API for 1-Click-Wholesale platform",
      endpoints: [
        "/api/products",
        "/api/products/{id}",
        "/api/suppliers",
        "/api/suppliers/{id}",
        "/api/categories",
        "/api/auth/login",
        "/api/auth/register"
      ]
    });
  }
  
  // Products endpoint
  if (pathSegments[0] === "products") {
    // Get specific product by ID
    if (pathSegments[1] && !isNaN(pathSegments[1])) {
      const productId = parseInt(pathSegments[1]);
      const product = products.find(p => p.id === productId);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      return res.status(200).json({ product });
    }
    
    // List all products with optional filtering
    let filteredProducts = [...products];
    
    // Apply filters based on query parameters
    if (queryParams.category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === queryParams.category.toLowerCase()
      );
    }
    
    if (queryParams.minPrice) {
      filteredProducts = filteredProducts.filter(p => 
        p.price >= parseFloat(queryParams.minPrice)
      );
    }
    
    if (queryParams.maxPrice) {
      filteredProducts = filteredProducts.filter(p => 
        p.price <= parseFloat(queryParams.maxPrice)
      );
    }
    
    if (queryParams.supplier) {
      filteredProducts = filteredProducts.filter(p => 
        p.supplier.id === parseInt(queryParams.supplier) ||
        p.supplier.name.toLowerCase().includes(queryParams.supplier.toLowerCase())
      );
    }
    
    if (queryParams.search) {
      const searchTerm = queryParams.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
      );
    }
    
    if (queryParams.topSeller === 'true') {
      filteredProducts = filteredProducts.filter(p => p.isTopSeller);
    }
    
    // Implement pagination
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || filteredProducts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Return paginated response
    return res.status(200).json({
      products: paginatedProducts,
      pagination: {
        total: filteredProducts.length,
        page,
        limit,
        pages: Math.ceil(filteredProducts.length / limit)
      }
    });
  }
  
  // Suppliers endpoint
  if (pathSegments[0] === "suppliers") {
    // Get specific supplier by ID
    if (pathSegments[1] && !isNaN(pathSegments[1])) {
      const supplierId = parseInt(pathSegments[1]);
      const supplier = suppliers.find(s => s.id === supplierId);
      
      if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
      }
      
      // Get supplier's products if requested
      if (pathSegments[2] === "products") {
        const supplierProducts = products.filter(p => p.supplier.id === supplierId);
        return res.status(200).json({ 
          supplier,
          products: supplierProducts 
        });
      }
      
      return res.status(200).json({ supplier });
    }
    
    // List all suppliers
    return res.status(200).json({ suppliers });
  }
  
  // Categories endpoint
  if (pathSegments[0] === "categories") {
    const categories = [...new Set(products.map(p => p.category))];
    return res.status(200).json({ 
      categories,
      count: categories.length
    });
  }
  
  // Authentication endpoints
  if (pathSegments[0] === "auth") {
    // Login endpoint
    if (pathSegments[1] === "login") {
      // This would normally verify credentials against a database
      // For demo, we just return a mock success response
      if (req.method === "POST") {
        return res.status(200).json({
          success: true,
          message: "Login successful",
          user: {
            id: 1,
            username: "demo",
            email: "demo@example.com"
          },
          token: "mock-jwt-token"
        });
      }
      
      return res.status(405).json({ error: "Method not allowed" });
    }
    
    // Register endpoint
    if (pathSegments[1] === "register") {
      // This would normally create a new user in the database
      // For demo, we just return a mock success response
      if (req.method === "POST") {
        return res.status(201).json({
          success: true,
          message: "Registration successful",
          user: {
            id: 2,
            username: "newuser",
            email: "newuser@example.com"
          }
        });
      }
      
      return res.status(405).json({ error: "Method not allowed" });
    }
    
    return res.status(404).json({ error: "Authentication endpoint not found" });
  }
  
  // If no routes match, return 404
  return res.status(404).json({ error: "API endpoint not found" });
};