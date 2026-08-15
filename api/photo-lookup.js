export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: "Photo scan is not configured (missing ANTHROPIC_API_KEY)"
    });
  }

  const { image } = req.body || {};

  if (!image || typeof image !== "string") {
    return res.status(400).json({ success: false, error: "No image provided" });
  }

  const match = image.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);

  if (!match) {
    return res.status(400).json({ success: false, error: "Invalid image data" });
  }

  const [, mediaType, base64Data] = match;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: mediaType, data: base64Data }
              },
              {
                type: "text",
                text:
                  "Identify the retail product shown in this photo, for resale research purposes. " +
                  "Reply with ONLY compact JSON, no other text: " +
                  '{"name": string, "brand": string, "category": string}. ' +
                  "Make the name specific enough to search for on Amazon (include model/variant if visible). " +
                  "If you cannot identify the brand, use an empty string for brand."
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      return res.status(502).json({ success: false, error: "Vision API error: " + errBody.slice(0, 200) });
    }

    const data = await response.json();
    const text = data?.content?.[0]?.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(200).json({ success: false, error: "Could not identify item" });
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (e) {
      return res.status(200).json({ success: false, error: "Could not identify item" });
    }

    if (!parsed.name) {
      return res.status(200).json({ success: false, error: "Could not identify item" });
    }

    return res.status(200).json({
      success: true,
      name: parsed.name,
      brand: parsed.brand || "",
      category: parsed.category || "",
      source: "claude-vision"
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
