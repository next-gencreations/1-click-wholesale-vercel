export default async function handler(req, res) {
  const { barcode } = req.query;

  if (!barcode) {
    return res.status(400).json({ error: "No barcode provided" });
  }

  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(barcode)}.json`
    );
    const data = await response.json();

    if (data.status === 1 && data.product) {
      return res.status(200).json({
        name: data.product.product_name || `Scanned item ${barcode}`,
        brand: data.product.brands || "",
        source: "openfoodfacts"
      });
    }

    return res.status(200).json({
      name: `Scanned item ${barcode}`,
      brand: "",
      source: "fallback"
    });
  } catch (error) {
    return res.status(200).json({
      name: `Scanned item ${barcode}`,
      brand: "",
      source: "fallback"
    });
  }
}
