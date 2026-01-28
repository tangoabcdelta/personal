// Flipkart car vacuum cleaners listing scraper
(() => {
  const products = [];

  // Each product card
  // document.querySelectorAll('a[href*="/p/"][rel!="noopener"]')

  // 1. Select all potential anchors
  const anchors = document.querySelectorAll('a[href*="/p/"]');

  // 2. Filter them in JavaScript to exclude rel="noopener"
  const filteredAnchors = Array.from(anchors).filter(
    a => a.getAttribute('rel') !== 'noopener'
  );
  
  filteredAnchors.forEach(a => {
    // const card = a.closest('div'); // outer container for that link cluster
    const card = a.closest('div[data-id]'); // outer container for that link cluster
    if (!card) return;

    // Product URL
    const url = new URL(a.href, location.origin).toString();

    // Product name – usually the longer text, avoid truncated duplicate
    const nameEl = card.querySelector('div[title]') || card.querySelector('div');
    const name = nameEl ? nameEl.textContent.trim() : '';

    // Star rating
    
    
    // const ratingEl = card.querySelector('div[aria-label*="star"], span._3LWZlK, span._1lRcqv');
    const ratingEl = card.querySelector('[id*="productRating_"]');
    const ratingText = ratingEl ? ratingEl.textContent.trim() : '';
    const rating = parseFloat(ratingText) || null;

    // Review count: text like "(14,880)"
    // Grab the first parenthesis group near rating
    let reviewCount = null;
    const countEl =
      (ratingEl && ratingEl.parentElement && ratingEl.parentElement.querySelector('span+span')) ||
      card.querySelector('span:has(> span)'); // fallback, super broad
    if (countEl) {
      const m = countEl.textContent.replace(/,/g, '').match(/\((\d+)\)/);
      if (m) reviewCount = parseInt(m[1], 10);
    }

    // Price: first ₹ amount on the card
    let price = null;
    let priceText = '';
    const priceEl =
      card.querySelector('div._30jeq3._1_WHN1') || // normal listing
      card.querySelector('div._30jeq3');           // fallback
    if (priceEl) {
      priceText = priceEl.textContent.trim();
      const m = priceText.replace(/,/g, '').match(/(\d+)\s*$/);
      if (m) price = parseInt(m[1], 10);
    }

    // Filter out obvious garbage
    if (!name || !url) return;

    products.push({
      name,
      rating,
      reviewCount,
      price,
      priceText,
      url
    });
  });

  // Sort by review count desc (nulls last)
  products.sort((a, b) => {
    if (a.reviewCount == null && b.reviewCount == null) return 0;
    if (a.reviewCount == null) return 1;
    if (b.reviewCount == null) return -1;
    return b.reviewCount - a.reviewCount;
  });

  console.table(products);
  console.log('Total products:', products.length);
})();
