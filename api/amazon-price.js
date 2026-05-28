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

    // BETTER TITLE MATCH
    let title = null;

    const titlePatterns = [
      /"name":"(.*?)"/,
      /a-size-base-plus a-color-base a-text-normal">(.*?)</,
      /a-size-medium a-color-base a-text-normal">(.*?)</,
      /<span class="a-size-medium a-color-base a-text-normal">(.*?)</
    ];

    for (const pattern of titlePatterns) {
      const match = html.match(pattern);

      if (match && match[1]) {
        title = match[1]
          .replace(/&amp;/g, "&")
          .replace(/&#39;/g, "'")
          .replace(/<[^>]*>/g, "")
          .trim();

        break;
      }
    }

    // BETTER PRICE MATCH
    let price = null;

    const pricePatterns = [
      /"priceAmount":([0-9.]+)/,
      /a-offscreen">£([0-9.,]+)/,
      /£\s?([0-9]+\.[0-9]{2})/,
      /priceToPay[^£]*£([0-9.,]+)/
    ];

    for (const pattern of pricePatterns) {

      const match = html.match(pattern);

      if (match && match[1]) {

        const cleaned =
          match[1].replace(/,/g, "");

        price = parseFloat(cleaned);

        if (!isNaN(price)) {
          break;
        }
      }
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
