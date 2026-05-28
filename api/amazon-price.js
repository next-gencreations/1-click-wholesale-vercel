export default async function handler(req, res) {

  const { barcode, query } = req.query;

  const search = barcode || query;

  if (!search) {
    return res.status(400).json({
      error: "Missing barcode or query"
    });
  }

  try {

    const amazonUrl =
      "https://www.amazon.co.uk/s?k=" +
      encodeURIComponent(search);

    const response = await fetch(amazonUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36",
        "Accept-Language": "en-GB,en;q=0.9"
      }
    });

    const html = await response.text();

    let title = null;
    let price = null;

    // PRODUCT TITLE
    const titleMatch =
      html.match(/"name":"(.*?)"/) ||
      html.match(/a-size-medium a-color-base a-text-normal">(.*?)</);

    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1]
        .replace(/&amp;/g, "&")
        .replace(/&#39;/g, "'")
        .replace(/<[^>]*>/g, "")
        .trim();
    }

    // AMAZON PRICE
    const priceMatch =
      html.match(/"priceAmount":([0-9.]+)/) ||
      html.match(/£\s?([0-9]+\.[0-9]{2})/);

    if (priceMatch && priceMatch[1]) {
      price = parseFloat(priceMatch[1]);
    }

    return res.status(200).json({
      success: true,
      search,
      title,
      price,
      amazonUrl
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }
}
