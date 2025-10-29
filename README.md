# E-Commerce Web Application

A simple and responsive ReactJS-based e-commerce web app built using class components.  
This app allows users to browse products, view detailed information, and add items to their cart — with cart persistence across refreshes. It allows users to browse, filter, sort, and view products.

---
## Features

### Home Page (Product Listing)
- Displays all products in a responsive grid layout.
- Users can filter products by category(multiple selection supported).
- Sorting feature — Low to High or High to Low price.
- Filters and sorting persist in the URL, allowing users to share links.
- Dynamic category data fetched from API ("https://fakestoreapi.com/products").

### Product Detail Page
- Uses dynamic routing (`/product/:id/details`).
- Fetches product information dynamically from the API.
- Displays product image, title, description, and price.
- Includes “Add to Cart” functionality using React Context API.

### Cart Functionality
- Items can be added to the cart from the product detail page.
- Displays total cart value and number of items in a sticky Cart Footer.
- Cart items persist across refreshes using localStorage.

### Navigation
- Simple navigation between Home and Product Details.
- Back to Home link provided on each detail page.

### Technical Stack
- ReactJS (Class Components)
- React Router DOM (v6) for navigation
- Context API for cart state management
- Fetch API for data fetching
- LocalStorage for persistence

## Setup Instructions

Follow the steps below to set up and run the application locally.

### 1. Clone the Repository
git clone https://github.com/harleenk11/ecommerce-webapp.git

### 2. Navigate to the Project Folder
cd ecommerce

### 3. Install Dependencies
npm install

### 4. Start the Development Server
npm start

### 5. Open in Browser
http://localhost:3000

---

## Assumptions

- The product API (`https://fakestoreapi.com/products`) is always available and returns valid JSON.
- The app focuses on product listing and detail pages —  separate cart page has been created.
  
## Limitations

- API filtering is performed client-side (locally) rather than through a dedicated backend query.
- No authentication or user login implemented.
- Cart items are not synced across multiple browser sessions (only local persistence).
- Limited mobile responsiveness (optimized for basic viewports).

---

## 🧩 Folder Structure

ecommerce/
│
├── src/
│   ├── components/
│   │   └── CartFooter.js
│   ├── context/
│   │   └── CartContext.js
│   ├── pages/
│   │   ├── Home.js
│   │   └── ProductDetail.js
|   |   └── Cart.js
│   ├── App.js
│   ├── index.js
│   └── withRouter.js
│
├── package.json
├── README.md
└── ...

---

## Future Enhancements

- Add a dedicated Cart page with remove quantity features.
- API-based filtering instead of local filtering.

---

## Developer Notes

This project was created as part of a frontend developer assignment.  
AI tools were used only for syntax lookups and debugging, with all logical and structural work done manually.  
The app follows all the technical requirements mentioned in the problem statement.

---


