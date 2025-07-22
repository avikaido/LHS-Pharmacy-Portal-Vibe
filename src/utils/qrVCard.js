// Utility function for generating and downloading a vCard (.vcf) for a pharmacy

/**
 * Download a vCard (.vcf) file for a pharmacy
 * @param {object} details - Pharmacy details (name, phone, email, address, etc.)
 * @param {string} qrUrl - The QR code link
 * @param {string} [filename='pharmacy.vcf'] - The filename for download
 */
export function downloadPharmacyVCard(details, qrUrl, filename = 'pharmacy.vcf') {
  const {
    pharmacy_name,
    phone,
    fax,
    email,
    website,
    address,
    address2,
    city,
    state,
    zipcode,
    contact_person,
    notes,
  } = details;

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${pharmacy_name || ''}`,
    contact_person ? `N:${contact_person}` : '',
    phone ? `TEL;TYPE=work,voice:${phone}` : '',
    fax ? `TEL;TYPE=fax:${fax}` : '',
    email ? `EMAIL;TYPE=internet:${email}` : '',
    website ? `URL:${website}` : '',
    (address || address2 || city || state || zipcode) ?
      `ADR;TYPE=work:;;${[address, address2].filter(Boolean).join(' ')};${city || ''};${state || ''};;${zipcode || ''}` : '',
    notes ? `NOTE:${notes}` : '',
    qrUrl ? `X-QR-LINK:${qrUrl}` : '',
    'END:VCARD',
  ].filter(Boolean);

  const vcardString = lines.join('\r\n');
  const blob = new Blob([vcardString], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
} 