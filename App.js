import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [scanning, setScanning] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const [product, setProduct] = useState("");
  const [brand, setBrand] = useState("");
  const [barcode, setBarcode] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profitHistory") || "[]");
    setHistory(saved);
  }, []);

  const number = (v) => parseFloat(v || "0");

  const fees = sellPrice ? number(sellPrice) * 0.15 + 0.3 : 0;
  const profit = sellPrice && buyPrice ? number(sellPrice) - number(buyPrice) - fees : 0;
  const roi = buyPrice ? (profit / number(buyPrice)) * 100 : 0;

  const verdict =
    profit > 3 && roi > 40 ? "🟢 Worth Buying" :
    profit > 0 ? "🟠 Maybe" :
    sellPrice && buyPrice ? "🔴 Avoid" : "Waiting for prices";

  function lookupProduct(code) {
    const known = {
      "5449000130389": { product: "Coca-Cola", brand: "Coca-Cola" },
      "4088600464077": { product: "Retail product", brand: "" }
    };

    const found = known[code] || { product: `Product ${code}`, brand: "" };
    setProduct(found.product);
    setBrand(found.brand);
    setBarcode(code);
  }

  async function startScanner() {
    setShowScanner(true);
    setScanning(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      if (!("BarcodeDetector" in window)) {
        alert("Scanner not supported on this browser. Use manual lookup.");
        return;
      }

      const detector = new window.BarcodeDetector({
        formats: ["ean_13", "ean_8", "upc_a", "upc_e"]
      });

      const scanLoop = async () => {
        if (!videoRef.current || !scanning) return;

        try {
          const codes = await detector.detect(videoRef.current);

          if (codes.length > 0) {
            const code = codes[0].rawValue;
            lookupProduct(code);
            stopScanner();
            setShowScanner(false);
            return;
          }
        } catch {}

        requestAnimationFrame(scanLoop);
      };

      scanLoop();
    } catch {
      alert("Camera permission needed to scan.");
      setScanning(false);
    }
  }

  function stopScanner() {
    setScanning(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  }

  function checkProfit() {
    if (!buyPrice || !sellPrice) {
      alert("Enter buy price and sell price first.");
    }
  }

  function saveScan() {
    const item = {
      product,
      brand,
      barcode,
      buyPrice,
      sellPrice,
      profit: profit.toFixed(2),
      roi: roi.toFixed(0),
      date: new Date().toLocaleString()
    };

    const updated = [item, ...history].slice(0, 20);
    setHistory(updated);
    localStorage.setItem("profitHistory", JSON.stringify(updated));
  }

  return (
    <div className="app">
      <style>{css}</style>

      {!showScanner && (
        <main className="card">
          <h1>1-Click Profit Finder</h1>
          <p className="tagline">Scan products. Check profit. Save winners.</p>

          <button className="scanHero" onClick={startScanner}>📷 Scan Product</button>

          <input placeholder="Product name" value={product} onChange={e => setProduct(e.target.value)} />
          <input placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)} />
          <input placeholder="Barcode" value={barcode} onChange={e => setBarcode(e.target.value)} />

          <div className="row">
            <input placeholder="Buy £" type="number" value={buyPrice} onChange={e => setBuyPrice(e.target.value)} />
            <input placeholder="Sell £" type="number" value={sellPrice} onChange={e => setSellPrice(e.target.value)} />
          </div>

          <button className="check" onClick={checkProfit}>Check Profit</button>

          <section className="result">
            <h2>{verdict}</h2>
            <p>Fees: £{fees.toFixed(2)}</p>
            <p className="money">Profit: £{profit.toFixed(2)}</p>
            <p>ROI: {roi.toFixed(0)}%</p>
          </section>

          <button className="save" onClick={saveScan}>⭐ Save Scan</button>

          <h3>Recent Finds</h3>
          {history.map((h, i) => (
            <div className="history" key={i}>
              <strong>{h.product}</strong>
              <span>Profit £{h.profit} · ROI {h.roi}%</span>
            </div>
          ))}
        </main>
      )}

      {showScanner && (
        <main className="scanner">
          <h1>📷 Scan Barcode</h1>
          <p>Point your camera at a product barcode</p>
          <video ref={videoRef} playsInline muted />
          <button className="stop" onClick={() => { stopScanner(); setShowScanner(false); }}>← Back</button>
        </main>
      )}
    </div>
  );
}

const css = `
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #dfeee8;
}

.app {
  min-height: 100vh;
  padding: 22px;
}

.card {
  max-width: 520px;
  margin: auto;
  background: white;
  border-radius: 28px;
  padding: 26px;
  box-shadow: 0 10px 30px rgba(0,0,0,.12);
}

h1 {
  text-align: center;
  font-size: 34px;
  margin-bottom: 6px;
}

.tagline {
  text-align: center;
  color: #666;
  margin-bottom: 22px;
}

input {
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  margin: 8px 0;
  border-radius: 14px;
  border: 1px solid #ccc;
  font-size: 18px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

button {
  width: 100%;
  border: none;
  border-radius: 16px;
  padding: 18px;
  font-size: 20px;
  font-weight: bold;
  margin-top: 12px;
}

.scanHero {
  background: #36b24a;
  color: white;
  font-size: 24px;
}

.check {
  background: #6fa08d;
  color: white;
}

.save {
  background: #111;
  color: white;
}

.result {
  background: #f3f8f5;
  border-radius: 20px;
  padding: 18px;
  margin-top: 16px;
  text-align: center;
}

.result h2 {
  margin-top: 0;
}

.money {
  font-size: 28px;
  font-weight: bold;
}

.history {
  background: #f1f1f1;
  border-radius: 14px;
  padding: 12px;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.scanner {
  color: white;
  background: #070707;
  min-height: 100vh;
  text-align: center;
  padding: 30px 18px;
}

video {
  width: 100%;
  max-width: 520px;
  border: 5px solid white;
  border-radius: 28px;
  margin-top: 20px;
}

.stop {
  max-width: 260px;
  background: #999;
  color: white;
}
`;
