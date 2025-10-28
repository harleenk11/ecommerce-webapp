import React, { Component } from "react";
import CartContext from "../context/CartContext";
import withRouter from "../withRouter";
import { Link } from "react-router-dom";

class ProductDetail extends Component {
  static contextType = CartContext;

  state = { product: null };

  async componentDidMount() {
    const { id } = this.props.params;
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const product = await res.json();
      this.setState({ product });
    } catch (err) {
      console.error("Error fetching product details:", err);
    }
  }

  render() {
    const { product } = this.state;
    const cart = this.context;

    if (!product) return <p>Loading product details...</p>;

    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ width: 250, borderRadius: 8 }}
        />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h3>₹{product.price}</h3>

        <button
          onClick={() => cart.addToCart(product)}
          style={{
            padding: "10px 20px",
            marginTop: 10,
            cursor: "pointer",
            background: "orange",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Add to MyCart
        </button>

        <div style={{ marginTop: 20 }}>
          <Link to="/"> Back to Home</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductDetail);
