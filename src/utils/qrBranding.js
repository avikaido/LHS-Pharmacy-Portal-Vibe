// Utility to wrap a QR SVG inside the branded AYP SVG
// Usage: wrapQrWithBranding(qrSvg, { qrSize: 220 })

import brandedSvg from 'src/assets/images/svgs/AYP-QR-code.svg?raw';

/**
 * Inserts the QR SVG into the branded wrapper at native size (375x375 viewBox).
 * The QR code is centered in the inner square (64.68 to 310.32), with a margin (default 15px) from the blue border on all four sides.
 * The QR code is scaled to fit within the inner square and never overflows the branding box.
 * @param {string} qrSvg - The SVG string for the QR code (should be square, e.g. 128x128 viewBox)
 * @param {object} options - { margin: number (default 15) }
 * @returns {string} - Combined SVG string
 */
export function wrapQrWithBranding(qrSvg, options = {}) {
  if (!brandedSvg || !qrSvg) return qrSvg;
  // Branding SVG native size
  const svgSize = 375;
  // Inner square for QR: from 64.68 to 310.32 (245.64px)
  const innerMin = 64.68;
  const innerMax = 310.32;
  const innerSize = innerMax - innerMin; // ~245.64
  const margin = options.margin !== undefined ? options.margin : 15;
  // QR code size (max possible within inner square minus 2*margin)
  const qrSize = Math.max(1, innerSize - 2 * margin); // never negative or zero
  // Center QR in the inner square, with equal margin on all sides
  // The QR code is placed at (innerMin + margin, innerMin + margin)
  // and scaled from 43x43 viewBox to qrSize
  const qrX = +(innerMin + margin).toFixed(2);
  const qrY = +(innerMin + margin).toFixed(2);
  const scale = +(qrSize / 43).toFixed(6);
  const qrContent = qrSvg.replace(/<\/?svg[^>]*>/g, '').trim();
  const qrGroup = `<g transform="translate(${qrX},${qrY}) scale(${scale})"><svg width="43" height="43" viewBox="0 0 43 43">${qrContent}</svg></g>`;
  // Insert QR group just before </svg> in brandedSvg
  const combined = brandedSvg.replace('</svg>', `${qrGroup}</svg>`);
  return combined;
} 