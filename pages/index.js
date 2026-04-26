import { useState } from "react";
import Tesseract from "tesseract.js";

export default function Home() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      runOCR(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const runOCR = async (img) => {
    setLoading(true);
    const result = await Tesseract.recognize(img, "eng");
    setText(result.data.text);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Medical OCR App</h1>

      <input type="file" accept="image/*" onChange={handleUpload} />

      {loading && <p>Reading document...</p>}

      {image && <img src={image} width="300" />}

      {text && (
        <div>
          <h3>Extracted Text</h3>
          <pre>{text}</pre>
        </div>
      )}
    </div>
  );
}
