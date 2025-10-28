import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  state = {
    products: [],
    filtered: [],
    categories: [],
    selectedCategories: [],
    sortOrder: "",
  };

  async componentDidMount() {
    try {
      // Fetch product data from DummyJSON API
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();

      const categories = [...new Set(data.products.map((p) => p.category))];
      const params = new URLSearchParams(window.location.search);
      const selectedCategories = params.get("categories")
        ? params.get("categories").split(",")
        : [];
      const sortOrder = params.get("sort") || "";

      this.setState(
        {
          products: data.products,
          categories,
          selectedCategories,
          sortOrder,
        },
        this.applyFilters
      );
    } catch (err) {
      console.error("Error loading products:", err);
    }
  }

  updateURL = () => {
    const { selectedCategories, sortOrder } = this.state;
    const params = new URLSearchParams();
    if (selectedCategories.length) params.set("categories", selectedCategories.join(","));
    if (sortOrder) params.set("sort", sortOrder);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  handleCategoryChange = (cat) => {
    this.setState(
      (prev) => {
        const selected = prev.selectedCategories.includes(cat)
          ? prev.selectedCategories.filter((c) => c !== cat)
          : [...prev.selectedCategories, cat];
        return { selectedCategories: selected };
      },
      () => {
        this.applyFilters();
        this.updateURL();
      }
    );
  };

  handleSortChange = (e) => {
    this.setState({ sortOrder: e.target.value }, () => {
      this.applyFilters();
      this.updateURL();
    });
  };

  applyFilters = () => {
    const { products, selectedCategories, sortOrder } = this.state;
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    if (sortOrder === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    this.setState({ filtered });
  };

  render() {
    const { categories, selectedCategories, sortOrder, filtered } = this.state;
    const displayProducts = filtered.length ? filtered : this.state.products;

    return (
      <div style={{ padding: "16px" }}>
        <h2>Product Store</h2>

        {/* Filters Section */}
        <div style={{ marginBottom: 20, display: "flex", gap: 30 }}>
          <div>
            <h4>Filter by Category:</h4>
            {categories.map((cat) => (
              <label key={cat} style={{ marginRight: 10 }}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => this.handleCategoryChange(cat)}
                />{" "}
                {cat}
              </label>
            ))}
          </div>

          <div>
            <h4>Sort by Price:</h4>
            <select value={sortOrder} onChange={this.handleSortChange}>
              <option value="">Default</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {displayProducts.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}/details`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: 8,
                  textAlign: "center",
                }}
              >
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: 140,
                    objectFit: "contain",
                  }}
                />
                <h4 style={{ fontSize: 14 }}>{p.title}</h4>
                <p style={{ margin: 0 }}>₹{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
