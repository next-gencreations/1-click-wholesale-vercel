export default async function handler(req, res) {
  const { barcode } = req.query;

  if (!barcode) {
    return res.status(400).json({ error: "No barcode provided" });
  }

  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data = await response.json();

    if (data.status === 1) {
      const product = data.product;

      res.status(200).json({
        name: product.product_name || "Unknown Product",
        brand: product.brands || "",
      });
    } else {
      res.status(404).json({ error: "Product not found" });
    }

  } catch (err) {
    res.status(500).json({ error: "Lookup failed" });
  }
}
