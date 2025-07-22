// Utility function for showing QR code and pharmacy info in a modal/lightbox

/**
 * Show a modal with the QR code SVG and pharmacy info
 * @param {string} svgString - The SVG markup string
 * @param {object} details - Pharmacy details (name, address, phone, etc.)
 * @param {string} qrUrl - The link encoded in the QR code
 * @param {string} [title='QR Code & Info'] - Optional modal title
 */
export function showQrInfoModal(svgString, details, qrUrl, title = 'QR Code & Info') {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(0,0,0,0.85)';
  overlay.style.zIndex = 9999;
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';

  // Modal content
  const modal = document.createElement('div');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'qr-info-modal-title');
  modal.tabIndex = 0;
  modal.style.background = '#fff';
  modal.style.borderRadius = '12px';
  modal.style.padding = '32px 32px 24px 32px';
  modal.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)';
  modal.style.display = 'flex';
  modal.style.flexDirection = 'column';
  modal.style.alignItems = 'center';
  modal.style.maxWidth = '90vw';
  modal.style.maxHeight = '90vh';

  // Title
  const titleElem = document.createElement('h2');
  titleElem.id = 'qr-info-modal-title';
  titleElem.textContent = title;
  titleElem.style.fontFamily = 'sans-serif';
  titleElem.style.margin = '0 0 24px 0';
  modal.appendChild(titleElem);

  // SVG
  const svgContainer = document.createElement('div');
  svgContainer.innerHTML = svgString;
  svgContainer.style.display = 'flex';
  svgContainer.style.alignItems = 'center';
  svgContainer.style.justifyContent = 'center';
  svgContainer.style.width = 'min(60vw, 350px)';
  svgContainer.style.height = 'min(60vw, 350px)';
  svgContainer.querySelector('svg').style.width = '100%';
  svgContainer.querySelector('svg').style.height = '100%';
  modal.appendChild(svgContainer);

  // Info
  const info = document.createElement('div');
  info.style.marginTop = '24px';
  info.style.fontFamily = 'sans-serif';
  info.style.fontSize = '1rem';
  info.style.textAlign = 'center';
  info.innerHTML = `
    <strong>${details.pharmacy_name || ''}</strong><br/>
    ${details.address || ''}${details.address2 ? ', ' + details.address2 : ''}<br/>
    ${details.city || ''}${details.state ? ', ' + details.state : ''} ${details.zipcode || ''}<br/>
    ${details.phone ? 'Phone: ' + details.phone + '<br/>' : ''}
    ${details.email ? 'Email: ' + details.email + '<br/>' : ''}
    ${details.website ? 'Website: <a href="' + details.website + '" target="_blank">' + details.website + '</a><br/>' : ''}
    ${qrUrl ? '<div style="margin-top:12px;"><strong>QR Link:</strong> <a href="' + qrUrl + '" target="_blank">' + qrUrl + '</a></div>' : ''}
  `;
  modal.appendChild(info);

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close';
  closeBtn.style.marginTop = '32px';
  closeBtn.style.padding = '8px 24px';
  closeBtn.style.fontSize = '1rem';
  closeBtn.style.border = 'none';
  closeBtn.style.borderRadius = '6px';
  closeBtn.style.background = '#1976d2';
  closeBtn.style.color = '#fff';
  closeBtn.style.cursor = 'pointer';
  closeBtn.onclick = () => document.body.removeChild(overlay);
  modal.appendChild(closeBtn);

  // Focus modal when opened
  setTimeout(() => { modal.focus(); }, 0);
  // Close on Esc
  overlay.onkeydown = (e) => {
    if (e.key === 'Escape') document.body.removeChild(overlay);
  };
  overlay.tabIndex = 0;

  overlay.appendChild(modal);
  overlay.onclick = (e) => {
    if (e.target === overlay) document.body.removeChild(overlay);
  };
  document.body.appendChild(overlay);
} 