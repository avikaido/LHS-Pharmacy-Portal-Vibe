// barcodeUtil.js
// Utility for generating QR codes and other barcodes using zingl's 2D-Barcode library
// https://github.com/zingl/2D-Barcode/blob/master/barcode.js

import fs from 'fs';
import path from 'path';
import * as barcodeLib from './barcode.js';

// Helper to trim empty rows/columns from a matrix
function trimMatrix(mat) {
  let top = 0, bottom = mat.length - 1, left = 0, right = mat[0].length - 1;
  // Find top
  while (top <= bottom && mat[top].every(v => !v)) top++;
  // Find bottom
  while (bottom >= top && mat[bottom].every(v => !v)) bottom--;
  // Find left
  while (left <= right && mat.every(row => !row[left])) left++;
  // Find right
  while (right >= left && mat.every(row => !row[right])) right--;
  // Slice matrix
  return mat.slice(top, bottom + 1).map(row => row.slice(left, right + 1));
}

// Helper to pad a matrix to a perfect square, centering the content
function padMatrixToSquare(mat) {
  const rows = mat.length;
  const cols = mat[0].length;
  if (rows === cols) return mat;
  const size = Math.max(rows, cols);
  const rowPad = size - rows;
  const colPad = size - cols;
  const top = Math.floor(rowPad / 2);
  const bottom = rowPad - top;
  const left = Math.floor(colPad / 2);
  const right = colPad - left;
  // Pad rows
  let newMat = Array(top).fill().map(() => Array(cols).fill(0)).concat(mat).concat(Array(bottom).fill().map(() => Array(cols).fill(0)));
  // Pad columns
  newMat = newMat.map(row => Array(left).fill(0).concat(row, Array(right).fill(0)));
  return newMat;
}

// Helper to get the bounding box of all black modules (1s) in the matrix
function getMatrixBoundingBox(mat) {
  let minX = mat[0].length, maxX = -1, minY = mat.length, maxY = -1;
  for (let y = 0; y < mat.length; y++) {
    for (let x = 0; x < mat[y].length; x++) {
      if (mat[y][x]) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { minX, maxX, minY, maxY };
}

export async function generateBarcode({ type, text, format = 'svg', size = 256, level, extra = {} }) {
  if (!type || !text) throw new Error('type and text are required');
  // Map type to barcode.js function
  let barcodeFn;
  switch (type.toLowerCase()) {
    case 'qr':
    case 'qrcode':
      barcodeFn = barcodeLib.QR;
      break;
    case 'datamatrix':
      barcodeFn = barcodeLib.DataMatrix;
      break;
    case 'aztec':
      barcodeFn = barcodeLib.Aztec;
      break;
    case 'pdf417':
      barcodeFn = barcodeLib.PDF417;
      break;
    case 'code128':
      barcodeFn = barcodeLib.Code128;
      break;
    default:
      throw new Error('Unsupported barcode type');
  }
  // Generate SVG (barcode.js outputs SVG by default)
  let svg;
  if (type.toLowerCase() === 'qr' || type.toLowerCase() === 'qrcode') {
    // Generate matrix and convert to SVG using toPath
    let mat = barcodeFn(text, level || 'M');
    mat = trimMatrix(mat); // Trim extra white space
    mat = padMatrixToSquare(mat); // Pad to perfect square, center content
    // Calculate bounding box of black modules
    const bbox = getMatrixBoundingBox(mat);
    const size = mat.length;
    const { toPath } = await import('./barcode.js');
    const path = toPath(mat);
    // Calculate offset to center the path in the viewBox
    const contentWidth = bbox.maxX - bbox.minX + 1;
    const contentHeight = bbox.maxY - bbox.minY + 1;
    const offsetX = Math.round((size - contentWidth) / 2 - bbox.minX);
    const offsetY = Math.round((size - contentHeight) / 2 - bbox.minY);
    // Wrap path in a <g> with the calculated transform
    svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${size} ${size}' shape-rendering='crispEdges'><rect width='100%' height='100%' fill='white'/><g transform='translate(${offsetX},${offsetY})'><path d='${path}' fill='black'/></g></svg>`;
  } else {
    svg = barcodeFn(text, { level: level || 'M', ...extra });
  }
  if (format === 'svg' || !format) {
    return svg;
  }
  // For PNG/GIF, render SVG to buffer using svg2img (dynamic import for ESM)
  if (format === 'png' || format === 'gif') {
    const svg2img = (await import('svg2img')).default;
    return new Promise((resolve, reject) => {
      svg2img(svg, { format, width: size, height: size }, (error, buffer) => {
        if (error) return reject(error);
        resolve(buffer);
      });
    });
  }
  throw new Error('Unsupported format. Use svg, png, or gif.');
} 