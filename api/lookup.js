export default async function handler(req, res) {
  const { barcode } = req.query;

  if (!barcode) {
    return res.status(400).json({ error: "No barcode provided" });
  }

  // 1) Try UPCitemdb first for general retail items
  try {
    const upcRes = await fetch(
      `https://api.upcitemdb.com/prod/trial/lookup?upc=${encodeURIComponent(barcode)}`
    );
    const upcData = await upcRes.json();

    if (upcData && Array.isArray(upcData.items) && upcData.items.length > 0) {
      const item = upcData.items[0];
      return res.status(200).json({
        name: item.title || `Retail product (${barcode})`,
        brand: item.brand || "",
        category: item.category || "",
        source: "upcitemdb"
      });
    }
  } catch (error) {
    // silently continue
  }

  // 2) Fallback to Open Food Facts for groceries/consumables
  try {
    const foodRes = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(barcode)}.json`
    );
    const foodData = await foodRes.json();

    if (foodData.status === 1 && foodData.product) {
      return res.status(200).json({
        name: foodData.product.product_name || `Retail product (${barcode})`,
        brand: foodData.product.brands || "",
        category: "",
        source: "openfoodfacts"
      });
    }
  } catch (error) {
    // silently continue
  }

  // 3) Final fallback
  return res.status(200).json({
    name: `Retail product (${barcode})`,
    brand: "",
    category: "",
    source: "fallback"
  });
}
