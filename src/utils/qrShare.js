// Utility functions for sharing QR code links via various platforms

/**
 * Share via Email
 * @param {string} url - The QR code link
 * @param {string} [subject] - Optional email subject
 * @param {string} [body] - Optional email body
 */
export function shareQrByEmail(url, subject = 'Quick Access Link', body = '') {
  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body ? body + '\n' + url : url)}`;
  window.open(mailto, '_blank');
}

/**
 * Share via SMS (mobile only)
 * @param {string} url - The QR code link
 * @param {string} [body] - Optional SMS body
 */
export function shareQrBySms(url, body = '') {
  const sms = `sms:?body=${encodeURIComponent(body ? body + '\n' + url : url)}`;
  window.open(sms, '_blank');
}

/**
 * Share via WhatsApp
 * @param {string} url - The QR code link
 */
export function shareQrByWhatsApp(url) {
  const wa = `https://wa.me/?text=${encodeURIComponent(url)}`;
  window.open(wa, '_blank');
}

/**
 * Share via Facebook
 * @param {string} url - The QR code link
 */
export function shareQrByFacebook(url) {
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(fb, '_blank');
}

/**
 * Share via Twitter/X
 * @param {string} url - The QR code link
 * @param {string} [text] - Optional tweet text
 */
export function shareQrByTwitter(url, text = 'Check out this link:') {
  const tw = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  window.open(tw, '_blank');
}

/**
 * Share via LinkedIn
 * @param {string} url - The QR code link
 */
export function shareQrByLinkedIn(url) {
  const li = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  window.open(li, '_blank');
} 