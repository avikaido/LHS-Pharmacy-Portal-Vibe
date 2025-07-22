// Utility function for showing QR code SVG in fullscreen modal

/**
 * Show the QR code SVG in a fullscreen modal/lightbox
 * @param {string} svgString - The SVG markup string
 * @param {string} [title='QR Code'] - Optional modal title
 */
export function showQrFullscreen(svgString, title = 'QR Code') {
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
  svgContainer.style.width = 'min(80vw, 600px)';
  svgContainer.style.height = 'min(80vw, 600px)';
  svgContainer.querySelector('svg').style.width = '100%';
  svgContainer.querySelector('svg').style.height = '100%';
  modal.appendChild(svgContainer);

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

  overlay.appendChild(modal);
  overlay.onclick = (e) => {
    if (e.target === overlay) document.body.removeChild(overlay);
  };
  document.body.appendChild(overlay);
} 