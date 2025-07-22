// Utility functions for digital wallet (Apple/Google) pass actions for QR code

/**
 * Download a demo Apple Wallet pass (.pkpass) for the QR code link
 * NOTE: This is an unsigned, demo-only pass. Production passes require Apple certificates and backend signing.
 * @param {string} qrUrl - The QR code link
 * @param {string} [filename='pharmacy.pkpass'] - The filename for download
 */
export function downloadAppleWalletPass(qrUrl, filename = 'pharmacy.pkpass') {
  // Demo pass.json content
  const passJson = {
    formatVersion: 1,
    passTypeIdentifier: 'pass.com.example.pharmacy',
    serialNumber: '1234567890',
    teamIdentifier: 'ABCDE12345',
    organizationName: 'Pharmacy',
    description: 'Pharmacy QR Code',
    foregroundColor: 'rgb(0,0,0)',
    backgroundColor: 'rgb(255,255,255)',
    labelColor: 'rgb(0,0,0)',
    generic: {
      primaryFields: [
        { key: 'qr', label: 'Quick Access', value: qrUrl }
      ]
    },
    barcode: {
      message: qrUrl,
      format: 'PKBarcodeFormatQR',
      messageEncoding: 'iso-8859-1'
    }
  };
  // Create ZIP (pkpass) with only pass.json (for demo)
  const zip = new JSZip();
  zip.file('pass.json', JSON.stringify(passJson, null, 2));
  zip.generateAsync({ type: 'blob' }).then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
  alert('This is a demo .pkpass file. Production passes require Apple signing and images.');
}

/**
 * Show a placeholder for Google Wallet integration
 * @param {string} qrUrl - The QR code link
 */
export function showGoogleWalletInfo(qrUrl) {
  alert('Google Wallet integration requires backend setup and Google Cloud credentials. See https://developers.google.com/wallet for more info.');
} 