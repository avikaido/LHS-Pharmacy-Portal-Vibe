// Utility functions for downloading QR codes in various formats

/**
 * Download QR code as SVG file
 * @param {string} svgString - The SVG markup string
 * @param {string} filename - The filename for download (e.g., 'qr-code.svg')
 */
export function downloadQrAsSvg(svgString, filename = 'qr-code.svg') {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Download QR code as PNG file
 * @param {string} svgString - The SVG markup string
 * @param {string} filename - The filename for download (e.g., 'qr-code.png')
 * @param {number} [size=512] - The width/height of the PNG in pixels
 */
export function downloadQrAsPng(svgString, filename = 'qr-code.png', size = 512) {
  const svg = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(svg);
  const img = new window.Image();
  img.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    canvas.toBlob((blob) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    }, 'image/png');
    URL.revokeObjectURL(url);
  };
  img.onerror = function () {
    URL.revokeObjectURL(url);
  };
  img.src = url;
}

/**
 * Download QR code as PDF file
 * @param {string} svgString - The SVG markup string
 * @param {string} filename - The filename for download (e.g., 'qr-code.pdf')
 * @param {number} [size=128] - The width/height of the QR code in points (1pt = 1/72 inch)
 */
export async function downloadQrAsPdf(svgString, filename = 'qr-code.pdf', size = 128) {
  // Dynamically import jsPDF to avoid bundling if not needed
  const { jsPDF } = await import('jspdf');
  // Convert SVG to PNG first
  const svg = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(svg);
  const img = new window.Image();
  img.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    const pngData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ unit: 'pt', format: [size, size] });
    pdf.addImage(pngData, 'PNG', 0, 0, size, size);
    pdf.save(filename);
    URL.revokeObjectURL(url);
  };
  img.onerror = function () {
    URL.revokeObjectURL(url);
  };
  img.src = url;
}

/**
 * Download QR code as GIF file
 * @param {string} svgString - The SVG markup string
 * @param {string} filename - The filename for download (e.g., 'qr-code.gif')
 * @param {number} [size=512] - The width/height of the GIF in pixels
 */
export function downloadQrAsGif(svgString, filename = 'qr-code.gif', size = 512) {
  const svg = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(svg);
  const img = new window.Image();
  img.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    // Use toDataURL for GIF (may not be supported in all browsers, fallback to PNG if needed)
    try {
      const gifData = canvas.toDataURL('image/gif');
      const a = document.createElement('a');
      a.href = gifData;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      alert('GIF export is not supported in this browser.');
    }
    URL.revokeObjectURL(url);
  };
  img.onerror = function () {
    URL.revokeObjectURL(url);
  };
  img.src = url;
} 