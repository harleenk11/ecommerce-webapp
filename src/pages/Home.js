import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  state = {
    products: [],       
    listToShow: [],     
    categories: [],     
    selectedCats: [],   
    sortOrder: "",      
    loading: false,
    error: null,
  };

  async componentDidMount() {
    try {
      const catRes = await fetch("https://fakestoreapi.com/products/categories");
      const categories = await catRes.json();

      const params = new URLSearchParams(window.location.search);
      const selectedCats = params.get("categories") ? params.get("categories").split(",") : [];
      const sortOrder = params.get("sort") || "";

      this.setState({ categories, selectedCats, sortOrder }, () => {
        this.fetchProductsForCategories(this.state.selectedCats);
      });
    } catch (err) {
      console.error("Failed to load categories", err);
      this.setState({ error: "Failed to load categories" });
    }
  }

  updateURL = () => {
    const { selectedCats, sortOrder } = this.state;
    const params = new URLSearchParams();
    if (selectedCats.length) params.set("categories", selectedCats.join(","));
    if (sortOrder) params.set("sort", sortOrder);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  fetchProductsForCategories = async (cats = []) => {
    this.setState({ loading: true, error: null });
    try {
      let merged = [];

      if (cats && cats.length > 0) {
        const promises = cats.map((c) =>
          fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(c)}`).then((r) => r.json())
        );
        const results = await Promise.all(promises);
        merged = results.flat();
        const seen = new Set();
        merged = merged.filter((p) => {
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        });
      } else {
        const res = await fetch("https://fakestoreapi.com/products");
        merged = await res.json();
      }

      this.setState({ products: merged }, this.applySortAndSetList);
    } catch (err) {
      console.error("Error fetching products:", err);
      this.setState({ error: "Failed to load products" });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleCategoryToggle = (cat) => {
    this.setState(
      (prev) => {
        const already = prev.selectedCats.includes(cat);
        const selectedCats = already ? prev.selectedCats.filter((c) => c !== cat) : [...prev.selectedCats, cat];
        return { selectedCats };
      },
      () => {
        this.updateURL();
        this.fetchProductsForCategories(this.state.selectedCats);
      }
    );
  };

  handleSortChange = (e) => {
    const sortOrder = e.target.value;
    this.setState({ sortOrder }, () => {
      this.updateURL();
      this.applySortAndSetList();
    });
  };

  applySortAndSetList = () => {
    const { products, sortOrder } = this.state;
    let arr = [...products];
    if (sortOrder === "low") arr.sort((a, b) => a.price - b.price);
    if (sortOrder === "high") arr.sort((a, b) => b.price - a.price);
    this.setState({ listToShow: arr });
  };

  render() {
    const { categories, selectedCats, sortOrder, listToShow, loading, error } = this.state;
    const products = listToShow.length ? listToShow : [];

    return (
      <main style={{ padding: 16 }}>
        <div style={{ marginBottom: 20, display: "flex", gap: 30, alignItems: "flex-start" }}>
          <div>
            <h4>Filter by Category</h4>
            {categories.map((cat) => (
              <label key={cat} style={{ display: "inline-block", marginRight: 12 }}>
                <input
                  type="checkbox"
                  checked={selectedCats.includes(cat)}
                  onChange={() => this.handleCategoryToggle(cat)}
                />{" "}
                {cat}
              </label>
            ))}
          </div>

          <div>
            <h4>Sort by Price</h4>
            <select value={sortOrder} onChange={this.handleSortChange}>
              <option value="">Default</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
        </div>

        {loading && <p>Loading products...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {products.map((p) => (
            <Link key={p.id} to={`/product/${p.id}/details`} style={{ textDecoration: "none", color: "inherit" }}>
              <article
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: 10,
                  textAlign: "center",
                  background: "#fff",
                }}
              >
                <img src={p.image} alt={p.title} style={{ width: "100%", height: 140, objectFit: "contain" }} />
                <h4 style={{ fontSize: 14, margin: "8px 0" }}>{p.title}</h4>
                <p style={{ margin: 0, fontWeight: 600 }}>₹{p.price}</p>
              </article>
            </Link>
          ))}
        </div>
      </main>
    );
  }
}
