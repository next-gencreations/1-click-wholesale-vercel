export default async function handler(req, res) {
  const { barcode, query } = req.query;

  const search = barcode || query;

  if (!search) {
    return res.status(400).json({
      success: false,
      error: "Missing barcode or query"
    });
  }

  try {
    let productName = "";
    let brand = "";
    let image = "";
    let source = "";

    if (barcode) {
      try {
        const offUrl =
          "https://world.openfoodfacts.org/api/v2/product/" +
          encodeURIComponent(barcode) +
          ".json";

        const offRes = await fetch(offUrl);
        const offData = await offRes.json();

        if (offData && offData.product) {
          const p = offData.product;

          productName =
            p.product_name ||
            p.product_name_en ||
            p.generic_name ||
            "";

          brand = p.brands || "";
          image = p.image_front_url || p.image_url || "";
          source = "OpenFoodFacts";
        }
      } catch (e) {}
    }

    if (!productName) {
      productName = query || barcode || "Unknown product";
    }

    const amazonSearch = [brand, productName]
      .filter(Boolean)
      .join(" ")
      .trim();

    const affiliateTag = "nextgencreati-20";

    const amazonUrl =
      "https://www.amazon.co.uk/s?k=" +
      encodeURIComponent(amazonSearch || search) +
      "&tag=" +
      encodeURIComponent(affiliateTag);

    return res.status(200).json({
      success: true,
      barcode: barcode || "",
      query: query || "",
      productName,
      brand,
      image,
      source,
      amazonSearch,
      amazonUrl,
      message: "Product found. Amazon price must be entered manually unless PA-API is connected."
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
