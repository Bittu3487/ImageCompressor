import React, { useState } from "react";


function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [imageScale, setImageScale] = useState(100);
  const [imageQuality, setImageQuality] = useState(1.0);
  const [convertType, setConvertType] = useState("jpeg");
  const [showOptionalSettings, setShowOptionalSettings] = useState(false);

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target.result);
        compressImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image compression and processing
  const compressImage = (imageSrc) => {
    const img = new Image();
    img.src = imageSrc;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Use custom dimensions or original dimensions
      const width = customWidth || img.width;
      const height = customHeight || img.height;

      // Apply scale
      const scale = imageScale / 100;
      canvas.width = width * scale;
      canvas.height = height * scale;

      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert the canvas to the desired format
      const format = convertType === "png" ? "image/png" : "image/jpeg";
      const compressedDataUrl = canvas.toDataURL(format, imageQuality);

      // Set the compressed image
      setCompressedImage(compressedDataUrl);
    };
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", minHeight: "100vh", position: "relative" }}>
      <h1>Image Compressor App</h1>

      <div id="uploadContainer">
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <div
        id="toggleSettings"
        onClick={() => setShowOptionalSettings(!showOptionalSettings)}
      >
        {showOptionalSettings ? "Hide Optional Settings" : "Show Optional Settings"}
      </div>

      {showOptionalSettings && (
        <div className={`optional-settings ${!showOptionalSettings ? "hidden" : ""}`}>
          <label>
            Custom Width (px):
            <input
              type="number"
              value={customWidth}
              onChange={(e) => setCustomWidth(e.target.value)}
              min="10"
            />
          </label>
          <br />
          <label>
            Custom Height (px):
            <input
              type="number"
              value={customHeight}
              onChange={(e) => setCustomHeight(e.target.value)}
              min="10"
            />
          </label>
          <br />
          <label>
            Convert Image Type:
            <select value={convertType} onChange={(e) => setConvertType(e.target.value)}>
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
            </select>
          </label>
          <br />
          <label>
            Image Scale (%):
            <input
              type="range"
              min="10"
              max="100"
              value={imageScale}
              onChange={(e) => setImageScale(e.target.value)}
            />
            <span>{imageScale}%</span>
          </label>
          <br />
          <label>
            Image Quality (0.1 - 1):
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={imageQuality}
              onChange={(e) => setImageQuality(e.target.value)}
            />
            <span>{imageQuality}</span>
          </label>
        </div>
      )}

      <div className="image-container">
        <div>
          <h3>Original Image:</h3>
          {originalImage && (
            <img src={originalImage} alt="Original" className="image" />
          )}
        </div>
        <div>
          <h3>Compressed Image:</h3>
          {compressedImage && (
            <img src={compressedImage} alt="Compressed" className="image" />
          )}
        </div>
      </div>

      {compressedImage && (
        <a href={compressedImage} download="compressed_image.jpg">
          Download Compressed Image
        </a>
      )}

      {/* Footer */}
      <footer style={{ position: "absolute", bottom: "10px", width: "100%" }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
          &copy; 2024 Image Compressor. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default ImageCompressor;
