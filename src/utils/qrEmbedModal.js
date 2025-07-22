// Utility function for showing a custom embed modal for QR code

/**
 * Show a modal for custom embed options for the QR code
 * @param {string} svgString - The SVG markup string
 * @param {object} details - Pharmacy details (name, address, etc.)
 * @param {string} qrUrl - The link encoded in the QR code
 * @param {string} [title='Custom Embed QR Code'] - Optional modal title
 */
export function showQrEmbedModal(svgString, details, qrUrl, title = 'Custom Embed QR Code') {
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
  modal.style.overflowY = 'auto';
  modal.tabIndex = 0;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'qr-embed-modal-title');

  // Title
  const titleElem = document.createElement('h2');
  titleElem.id = 'qr-embed-modal-title';
  titleElem.textContent = title;
  titleElem.style.fontFamily = 'sans-serif';
  titleElem.style.margin = '0 0 24px 0';
  modal.appendChild(titleElem);

  // Option controls
  const optionsDiv = document.createElement('div');
  optionsDiv.style.display = 'flex';
  optionsDiv.style.gap = '24px';
  optionsDiv.style.marginBottom = '24px';
  optionsDiv.style.fontFamily = 'sans-serif';
  optionsDiv.style.fontSize = '1rem';

  // Option: include name
  const nameLabel = document.createElement('label');
  const nameCheckbox = document.createElement('input');
  nameCheckbox.type = 'checkbox';
  nameCheckbox.checked = true;
  nameLabel.appendChild(nameCheckbox);
  nameLabel.appendChild(document.createTextNode(' Include Name'));
  optionsDiv.appendChild(nameLabel);
  nameCheckbox.setAttribute('aria-label', 'Include pharmacy name in embed');

  // Option: include caption
  const captionLabel = document.createElement('label');
  const captionCheckbox = document.createElement('input');
  captionCheckbox.type = 'checkbox';
  captionCheckbox.checked = false;
  captionLabel.appendChild(captionCheckbox);
  captionLabel.appendChild(document.createTextNode(' Include Caption'));
  optionsDiv.appendChild(captionLabel);
  captionCheckbox.setAttribute('aria-label', 'Include caption in embed');

  // Option: wrap in link
  const linkLabel = document.createElement('label');
  const linkCheckbox = document.createElement('input');
  linkCheckbox.type = 'checkbox';
  linkCheckbox.checked = false;
  linkLabel.appendChild(linkCheckbox);
  linkLabel.appendChild(document.createTextNode(' Wrap in Link'));
  optionsDiv.appendChild(linkLabel);
  linkCheckbox.setAttribute('aria-label', 'Wrap QR code in link');

  modal.appendChild(optionsDiv);

  // Option: caption text
  const captionInput = document.createElement('input');
  captionInput.type = 'text';
  captionInput.placeholder = 'Enter caption text';
  captionInput.style.display = 'none';
  captionInput.style.marginBottom = '16px';
  captionInput.style.fontSize = '1rem';
  captionInput.style.padding = '4px 8px';
  captionInput.style.width = '80%';
  modal.appendChild(captionInput);
  captionInput.setAttribute('aria-label', 'Caption text for embed');

  // Preview
  const previewTitle = document.createElement('div');
  previewTitle.textContent = 'Preview:';
  previewTitle.style.fontWeight = 'bold';
  previewTitle.style.margin = '16px 0 8px 0';
  modal.appendChild(previewTitle);

  const previewDiv = document.createElement('div');
  previewDiv.style.background = '#f7f7f7';
  previewDiv.style.padding = '16px';
  previewDiv.style.borderRadius = '8px';
  previewDiv.style.marginBottom = '16px';
  previewDiv.style.textAlign = 'center';
  modal.appendChild(previewDiv);

  // Embed code
  const codeTitle = document.createElement('div');
  codeTitle.textContent = 'Embed Code:';
  codeTitle.style.fontWeight = 'bold';
  codeTitle.style.margin = '8px 0 4px 0';
  modal.appendChild(codeTitle);

  const codeArea = document.createElement('textarea');
  codeArea.readOnly = true;
  codeArea.style.width = '90%';
  codeArea.style.height = '120px';
  codeArea.style.minHeight = '80px';
  codeArea.style.fontFamily = 'monospace';
  codeArea.style.fontSize = '0.95rem';
  codeArea.style.marginBottom = '12px';
  modal.appendChild(codeArea);
  codeArea.setAttribute('aria-label', 'Embed code');

  // Copy button
  const copyBtn = document.createElement('button');
  copyBtn.textContent = 'Copy Embed Code';
  copyBtn.style.padding = '8px 24px';
  copyBtn.style.fontSize = '1rem';
  copyBtn.style.border = 'none';
  copyBtn.style.borderRadius = '6px';
  copyBtn.style.background = '#1976d2';
  copyBtn.style.color = '#fff';
  copyBtn.style.cursor = 'pointer';
  copyBtn.style.marginBottom = '16px';
  modal.appendChild(copyBtn);
  copyBtn.setAttribute('aria-label', 'Copy embed code to clipboard');

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close';
  closeBtn.style.padding = '8px 24px';
  closeBtn.style.fontSize = '1rem';
  closeBtn.style.border = 'none';
  closeBtn.style.borderRadius = '6px';
  closeBtn.style.background = '#888';
  closeBtn.style.color = '#fff';
  closeBtn.style.cursor = 'pointer';
  closeBtn.onclick = () => document.body.removeChild(overlay);
  modal.appendChild(closeBtn);
  closeBtn.setAttribute('aria-label', 'Close modal');

  // Helper to generate embed code
  function getEmbedCode() {
    let code = '';
    let preview = '';
    let svg = svgString;
    if (linkCheckbox.checked && qrUrl) {
      svg = `<a href="${qrUrl}" target="_blank">${svgString}</a>`;
    }
    if (nameCheckbox.checked) {
      code += `<div style=\"text-align:center;\"><strong>${details.pharmacy_name || ''}</strong><br/>`;
      preview += `<div style=\"text-align:center;\"><strong>${details.pharmacy_name || ''}</strong><br/>`;
    } else {
      code += `<div style=\"text-align:center;\">`;
      preview += `<div style=\"text-align:center;\">`;
    }
    code += svg;
    preview += svg;
    if (captionCheckbox.checked && captionInput.value) {
      code += `<div style=\"margin-top:8px; font-size:0.95em; color:#555;\">${captionInput.value}</div>`;
      preview += `<div style=\"margin-top:8px; font-size:0.95em; color:#555;\">${captionInput.value}</div>`;
    }
    code += `</div>`;
    preview += `</div>`;
    return { code, preview };
  }

  // Update preview and code
  function updateEmbed() {
    const { code, preview } = getEmbedCode();
    codeArea.value = code;
    previewDiv.innerHTML = preview;
  }

  // Event listeners
  nameCheckbox.onchange = updateEmbed;
  captionCheckbox.onchange = () => {
    captionInput.style.display = captionCheckbox.checked ? 'block' : 'none';
    updateEmbed();
  };
  captionInput.oninput = updateEmbed;
  linkCheckbox.onchange = updateEmbed;
  copyBtn.onclick = () => {
    codeArea.select();
    document.execCommand('copy');
    copyBtn.textContent = 'Copied!';
    setTimeout(() => { copyBtn.textContent = 'Copy Embed Code'; }, 1200);
  };

  // Initial render
  updateEmbed();

  overlay.appendChild(modal);
  overlay.onclick = (e) => {
    if (e.target === overlay) document.body.removeChild(overlay);
  };
  document.body.appendChild(overlay);
  // Focus modal when opened
  setTimeout(() => { modal.focus(); }, 0);
  // Close on Esc
  overlay.onkeydown = (e) => {
    if (e.key === 'Escape') document.body.removeChild(overlay);
  };
  overlay.tabIndex = 0;
} 