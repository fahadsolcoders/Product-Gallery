let products = [];
const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");
const modalCategory = document.getElementById("modal-category");
const modalImages = document.getElementById("modal-images");
const modalClose = document.getElementById("modal-close");

async function fetchCategories() {
  const response = await fetch("https://dummyjson.com/products/categories");
  const categories = await response.json();
  console.log(categories)
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.slug;
    option.textContent = cat.name;
    categorySelect.appendChild(option);
  });
}

async function fetchProducts() {
  const response = await fetch("https://dummyjson.com/products?limit=12");
  const data = await response.json();
  products = data.products;
  displayProducts(products);
}

function displayProducts(prods) {
  gallery.innerHTML = "";
  prods.forEach((product) => {
    const article = document.createElement("article");
    article.innerHTML = `
    <img src="${product.thumbnail}" alt="${product.title}">
    <h3>${product.title}</h3>
    <p>$${product.price}</p>
    <p>${product.category}</p>
    `;
    article.addEventListener("click", () => showModal(product));
    gallery.appendChild(article);
  });
}

function showModal(product) {
  modalTitle.textContent = product.title;
  modalDescription.textContent = `Description: ${product.description}`;
  modalPrice.textContent = `Price: $${product.price}`;
  modalCategory.textContent = `Category: ${product.category}`;
  modalImages.innerHTML = "";
  product.images.forEach((img) => {
    const image = document.createElement("img");
    image.src = img;
    image.alt = product.title;
    modalImages.appendChild(image);
  });
  modal.style.display = "flex";
}

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  let filtered = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  displayProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);

fetchCategories();
fetchProducts();
