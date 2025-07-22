// Utility function for printing QR code SVG

/**
 * Print the QR code SVG in a print-friendly popup
 * @param {string} svgString - The SVG markup string
 * @param {string} [title='Print QR Code'] - Optional print page title
 */
export function printQrSvg(svgString, title = 'Print QR Code') {
  const printWindow = window.open('', '_blank', 'width=600,height=800');
  if (!printWindow) return;
  printWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #fff; }
          .qr-container { display: flex; flex-direction: column; align-items: center; }
          .qr-container svg { max-width: 90vw; max-height: 80vh; }
          h2 { font-family: sans-serif; margin-bottom: 24px; }
        </style>
      </head>
      <body>
        <div class="qr-container">
          <h2>${title}</h2>
          ${svgString}
        </div>
        <script>
          window.onload = function() { setTimeout(() => { window.print(); }, 200); };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
} 