# HostelBite - Campus Food Marketplace

A mobile-first food ordering platform for hostels and campuses. Built with React, Vite, and Tailwind CSS.

## Features

- **Product Browsing**: Search and filter products by tags
- **Cart Management**: Add, remove, update quantities (persisted to localStorage)
- **Checkout**: UPI deep-link payments + Cash on Delivery
- **Order Tracking**: View order status and history
- **Owner Dashboard**: Manage products, view and update orders
- **Authentication**: Login/Register with JWT

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update VITE_API_BASE_URL in .env to your backend URL

# Start development server
npm run dev
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:4000` |

## API Endpoints Expected

The frontend expects these API endpoints:

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/auth/me` - Get current user
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `POST /api/products/:id/vote` - Vote for product
- `POST /api/orders` - Place order
- `GET /api/orders/mine` - User's orders
- `GET /api/orders/shop/list` - Shop orders
- `PATCH /api/orders/:id/status` - Update order status
- `GET /api/notifications/mine` - User notifications

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variable: `VITE_API_BASE_URL`
4. Deploy

## Tech Stack

- React 18 + Vite
- TypeScript
- Tailwind CSS
- React Router v6
- Headless UI
- Lucide Icons
