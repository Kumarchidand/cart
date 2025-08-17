// Products array (images are inside assets folder)
const products = [
  { id: 1, title: "Tie-Dye Lounge Set", price: 150, img: "assets/product1.jpg" },
  { id: 2, title: "Sunburst Tracksuit", price: 150, img: "assets/product2.jpg" },
  { id: 3, title: "Retro Red Streetwear", price: 150, img: "assets/product3.jpg" },
  { id: 4, title: "Urban Sportwear Combo", price: 150, img: "assets/product4.jpg" },
  { id: 5, title: "Oversized Knit & Coat", price: 150, img: "assets/product5.jpg" },
  { id: 6, title: "Chic Monochrome Blazer", price: 150, img: "assets/product6.jpg" }
];

// Store selected product ids
const selected = [];

// Render all products in grid
function updateGrid() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    const isSelected = selected.includes(product.id);

    card.innerHTML = `
      <img src="${product.img}" alt="${product.title}">
      <div class="product-title">${product.title}</div>
      <div class="product-price">$${product.price.toFixed(2)}</div>
  <button class="bundle-btn ${isSelected ? 'selected' : ''}">
  <span>${isSelected ? 'Added to Bundle' : 'Add to Bundle'}</span>
  <img 
    src="assets/icons/${isSelected ? 'Check.svg' : 'Plus.svg'}" 
    class="btn-icon" 
    alt="${isSelected ? 'check' : 'plus'}"
  >
</button>

    `;

    // Button toggle
    const btn = card.querySelector("button");
    btn.onclick = () => {
      if (!isSelected) {
        selected.push(product.id); // add
      } else {
        const idx = selected.indexOf(product.id);
        selected.splice(idx, 1); // remove
      }
      updateGrid();
      updateSidebar();
    };

    grid.appendChild(card);
  });
}

// Update sidebar dynamically
function updateSidebar() {
  document.getElementById('progress').innerText = selected.length;

  // Progress bar width
  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = Math.min(selected.length / 3, 1) * 100 + "%";

  const bundleList = document.getElementById('bundleList');
  bundleList.innerHTML = '';
  let total = 0;

  selected.forEach(id => {
    const prod = products.find(p => p.id === id);
    total += prod.price;
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${prod.img}" alt="${prod.title}">
      <span>${prod.title}</span> — <span>$${prod.price.toFixed(2)}</span>
    `;
    bundleList.appendChild(li);
  });

  let discount = 0;
  if (selected.length >= 3) {
    discount = total * 0.3;
    document.getElementById('addToCartBtn').disabled = false;
  } else {
    document.getElementById('addToCartBtn').disabled = true;
  }

  document.getElementById('discount').innerText = `-$${discount.toFixed(2)}`;
  document.getElementById('subtotal').innerText = `$${(total - discount).toFixed(2)}`;
}

// Initial render
updateGrid();
updateSidebar();
