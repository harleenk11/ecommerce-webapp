import React, { Component } from "react";
import withRouter from "../withRouter";
import CartContext from "../context/CartContext";
import { Link } from "react-router-dom";

class ProductDetail extends Component {
  static contextType = CartContext;

  state = { product: null, loading: true, error: null };

  async componentDidMount() {
    const { id } = this.props.params || {};
    if (!id) {
      this.setState({ error: "Invalid product id", loading: false });
      return;
    }

    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      const product = await res.json();
      this.setState({ product, loading: false });
    } catch (err) {
      console.error("Product fetch error:", err);
      this.setState({ error: "Unable to load product", loading: false });
    }
  }

  handleAdd = () => {
    const { product } = this.state;
    const { addToCart } = this.context;
    if (product) {
      addToCart(product);
      alert("Added to cart");
      console.log("Added to cart:", product.id, product.title);
    }
  };

  render() {
    const { product, loading, error } = this.state;

    if (loading) return <p style={{ textAlign: "center" }}>Loading product...</p>;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
    if (!product) return null;

    return (
      <main style={{ padding: 24, textAlign: "center" }}>
        <img src={product.image} alt={product.title} style={{ width: 240, height: 240, objectFit: "contain" }} />
        <h2 style={{ marginTop: 12 }}>{product.title}</h2>
        <p style={{ color: "#555", maxWidth: 700, margin: "8px auto" }}>{product.description}</p>
        <h3 style={{ color: "green" }}>₹{product.price}</h3>

        <div style={{ marginTop: 12 }}>
          <button
            onClick={this.handleAdd}
            style={{
              background: "#ff9800",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Add to Cart
          </button>
        </div>

        <div style={{ marginTop: 18 }}>
          <Link to="/" style={{ color: "#1976d2", textDecoration: "none" }}>Back to Home</Link>
        </div>
      </main>
    );
  }
}

export default withRouter(ProductDetail);
