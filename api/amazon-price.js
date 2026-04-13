export default async function handler(req, res) {
  const { barcode, query } = req.query;

  if (!barcode && !query) {
    return res.status(400).json({ error: "Missing barcode or query" });
  }

  const demoProducts = {
    "50002214": {
      title: "True Aroma Ylang Ylang & Honeysuckle Candle",
      price: 11.00,
      affiliateUrl: "https://www.amazon.co.uk/s?k=ylang+ylang+honeysuckle+candle",
      source: "demo"
    },
    "5012345678901": {
      title: "Smart Watch",
      price: 39.99,
      affiliateUrl: "https://www.amazon.co.uk/s?k=smart+watch",
      source: "demo"
    },
    "5901234123457": {
      title: "Wireless Earbuds",
      price: 24.99,
      affiliateUrl: "https://www.amazon.co.uk/s?k=wireless+earbuds",
      source: "demo"
    },
    "5055555555555": {
      title: "Bluetooth Speaker",
      price: 18.50,
      affiliateUrl: "https://www.amazon.co.uk/s?k=bluetooth+speaker",
      source: "demo"
    }
  };

  try {
    if (barcode && demoProducts[barcode]) {
      return res.status(200).json(demoProducts[barcode]);
    }

    const searchTerm = encodeURIComponent(query || barcode);

    return res.status(200).json({
      title: query || `Retail product (${barcode || ""})`.trim(),
      price: null,
      affiliateUrl: `https://www.amazon.co.uk/s?k=${searchTerm}`,
      source: "fallback-search"
    });
  } catch (error) {
    return res.status(200).json({
      title: query || `Retail product (${barcode || ""})`.trim(),
      price: null,
      affiliateUrl: `https://www.amazon.co.uk/s?k=${encodeURIComponent(query || barcode || "")}`,
      source: "fallback-search"
    });
  }
}
