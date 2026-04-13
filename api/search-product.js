export default async function handler(req, res) {
  const { name, brand } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Product name required" });
  }

  try {
    const searchParams = new URLSearchParams();
    searchParams.set("s", name);
    if (brand) searchParams.set("brand", brand);

    const upcRes = await fetch(
      `https://api.upcitemdb.com/prod/trial/search?${searchParams.toString()}`
    );
    const upcData = await upcRes.json();

    if (upcData && Array.isArray(upcData.items) && upcData.items.length > 0) {
      const item = upcData.items[0];
      return res.status(200).json({
        name: item.title || name,
        brand: item.brand || brand || "",
        barcode: item.upc || item.ean || "",
        source: "upcitemdb-search"
      });
    }
  } catch (error) {
    // silently continue
  }

  return res.status(200).json({
    name,
    brand: brand || "",
    barcode: "",
    source: "fallback-search"
  });
}
