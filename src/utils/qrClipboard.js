// Utility functions for QR code clipboard and embed actions

/**
 * Copy QR code as PNG image to clipboard
 * @param {string} svgString - The SVG markup string
 * @param {number} [size=512] - The width/height of the PNG in pixels
 */
export async function copyQrImageToClipboard(svgString, size = 512) {
  return new Promise((resolve, reject) => {
    const svg = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svg);
    const img = new window.Image();
    img.onload = async function () {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      canvas.toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([
            new window.ClipboardItem({ 'image/png': blob })
          ]);
          resolve();
        } catch (err) {
          reject(err);
        }
      }, 'image/png');
      URL.revokeObjectURL(url);
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for clipboard copy.'));
    };
    img.src = url;
  });
}

/**
 * Copy the QR code link (URL) to clipboard
 * @param {string} url - The URL encoded in the QR code
 */
export async function copyQrLinkToClipboard(url) {
  await navigator.clipboard.writeText(url);
}

/**
 * Copy HTML embed code for the QR code to clipboard
 * @param {string} svgString - The SVG markup string
 * @param {string} [type='svg'] - 'svg' for inline SVG, 'img' for <img src="data:image/svg+xml;base64,..." />
 */
export async function copyQrEmbedCodeToClipboard(svgString, type = 'svg') {
  let code = '';
  if (type === 'img') {
    const base64 = btoa(unescape(encodeURIComponent(svgString)));
    code = `<img src="data:image/svg+xml;base64,${base64}" alt="QR Code" />`;
  } else {
    code = svgString;
  }
  await navigator.clipboard.writeText(code);
} 