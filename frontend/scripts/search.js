
const supabase = window.supabase.createClient(
  "https://imkkafqtlvuzloalcfvk.supabase.co",
  "sb_publishable_aetzVolyZMx-vTdoaZ9zXw_OtEefK-N"
);

const params = new URLSearchParams(window.location.search);
const query = (params.get("q") || "").trim().toLowerCase();

const title = document.getElementById("search-results-title");
const count = document.getElementById("search-results-count");
const grid = document.getElementById("search-results-grid");

title.textContent = query ? `Results for "${query}"` : "All Products";

async function loadSearchResults() {
  grid.replaceChildren();
  count.textContent = "Loading products...";

  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, price, compare_at_price, category, image_url, is_active")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    count.textContent = "Products could not be loaded.";
    return;
  }

  const terms = query.split(/\s+/).filter(Boolean);

  const matches = (products || []).filter(product => {
    const text = `${product.name || ""} ${product.category || ""}`.toLowerCase();
    return terms.every(term => text.includes(term));
  });

  count.textContent = `${matches.length} product(s) found`;

  if (!matches.length) {
    grid.textContent = "No matching products found.";
    return;
  }

  matches.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.style.cursor = "pointer";

    if (product.image_url) {
      const image = document.createElement("img");
      image.src = product.image_url;
      image.alt = product.name || "Fashion product";
      image.loading = "lazy";
      card.appendChild(image);
    }

    const name = document.createElement("h3");
    name.textContent = product.name || "Untitled product";
    card.appendChild(name);

    const price = document.createElement("p");
    price.textContent = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP"
    }).format(Number(product.price) || 0);
    card.appendChild(price);

    card.addEventListener("click", () => {
      window.location.href =
        `product.html?id=${encodeURIComponent(product.id)}`;
    });

    grid.appendChild(card);
  });
}

loadSearchResults();

