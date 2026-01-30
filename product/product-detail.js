// Product database
const productDatabase = {
  'bracelet-1': {
    title: 'Sunrise Bracelet',
    price: 12.99,
    image: 'images/bracelet 1.jpeg',
    description: 'A beautiful sunrise-inspired bracelet with warm colors that evoke the morning sun. Handcrafted with premium beads, this elegant piece brings warmth and positivity to any outfit.',
    material: 'Premium Beads & String',
    size: 'Adjustable (6" - 8")',
    color: 'Orange, Yellow, Red'
  },
  'bracelet-2': {
    title: 'Midnight Cuff',
    price: 18.50,
    image: 'images/bracelet 2.jpeg',
    description: 'Sophisticated and elegant, the Midnight Cuff features deep, rich colors perfect for evening wear. Its bold design makes a statement while maintaining understated charm.',
    material: 'Premium Beads & Elastic',
    size: 'Adjustable (6.5" - 8.5")',
    color: 'Black, Navy, Silver'
  },
  'bracelet-3': {
    title: 'Ocean Charm',
    price: 15.00,
    image: 'images/bracelet 3.jpeg',
    description: 'Inspired by the tranquility of the ocean, this bracelet features cool blues and greens that bring a sense of calm and serenity. Perfect for those who love the sea.',
    material: 'Premium Beads & String',
    size: 'Adjustable (6" - 8")',
    color: 'Blue, Teal, Aqua'
  },
  'bracelet-4': {
    title: 'Golden Loop',
    price: 22.00,
    image: 'images/bracelet 4.jpeg',
    description: 'Luxurious and timeless, the Golden Loop features warm metallic tones that exude elegance. A versatile piece that complements both casual and formal attire.',
    material: 'Gold-plated Beads',
    size: 'Adjustable (6.5" - 8")',
    color: 'Gold, Champagne'
  },
  'bracelet-5': {
    title: 'Vintage Strand',
    price: 19.99,
    image: 'images/bracelet 5.jpeg',
    description: 'Embrace timeless style with this vintage-inspired bracelet. Its classic design features earthy tones and intricate beading that never goes out of fashion.',
    material: 'Vintage Beads & Leather',
    size: 'Adjustable (6.5" - 9")',
    color: 'Brown, Tan, Cream'
  },
  'bracelet-6': {
    title: 'Black Pearl',
    price: 24.00,
    image: 'images/bracelet 6.jpeg',
    description: 'Exquisite and refined, the Black Pearl is the ultimate luxury piece. Featuring glossy black beads that shimmer with iridescent undertones, it\'s perfect for special occasions.',
    material: 'Pearl Beads & Silver',
    size: 'Adjustable (6" - 8")',
    color: 'Black, Pearl White'
  }
};

// Handle page load
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId || !productDatabase[productId]) {
    document.querySelector('.product-detail-content').innerHTML = '<p style="text-align:center; padding: 40px;">Product not found. <a href="/products/index.html">Back to Products</a></p>';
    return;
  }

  const product = productDatabase[productId];

  // Update page content
  document.getElementById('product-title').textContent = product.title;
  document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
  document.getElementById('product-image').src = product.image;
  document.getElementById('product-image').alt = product.title;
  document.getElementById('product-desc').textContent = product.description;
  document.getElementById('product-material').textContent = product.material;
  document.getElementById('product-size').textContent = product.size;
  document.getElementById('product-color').textContent = product.color;
  document.title = product.title + ' - IBAMS Bracelets';

  // Handle Add to Cart
  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    const qty = parseInt(document.getElementById('product-qty').value) || 1;
    addToCartFromDetail(productId, product, qty);
  });
});

function addToCartFromDetail(productId, product, qty) {
  try {
    // Get current cart
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem('ibams_cart') || '[]');
    } catch (e) {
      cart = [];
    }

    // Find if product already in cart
    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: productId,
        title: product.title,
        price: product.price,
        qty: qty
      });
    }

    // Save cart
    localStorage.setItem('ibams_cart', JSON.stringify(cart));

    // Dispatch update events
    if (window.IBAMS && typeof window.IBAMS.setCart === 'function') {
      if (typeof window.IBAMS.suppressNextUpdateToast === 'function') {
        window.IBAMS.suppressNextUpdateToast();
      }
      window.IBAMS.setCart(cart);
    } else {
      window.dispatchEvent(new Event('ibams_cart_updated'));
    }

    // Announce the item added
    try {
      window.dispatchEvent(new CustomEvent('ibams_cart_item_added', { detail: { item: { ...product, id: productId, qty } } }));
    } catch (e) { }

    // Show feedback
    const btn = document.getElementById('add-to-cart-btn');
    const orig = btn.textContent;
    btn.textContent = 'Added to Cart!';
    setTimeout(() => {
      btn.textContent = orig;
    }, 1500);
  } catch (e) {
    console.error('Error adding to cart:', e);
  }
}
