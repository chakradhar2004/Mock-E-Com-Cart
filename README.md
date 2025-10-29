# Mock E-Commerce Cart

A modern e-commerce application built with Next.js, React, and Node.js, featuring a shopping cart with real-time updates and a clean, responsive UI.

## Features

- 🛒 **Shopping Cart** - Add, update, and remove products with real-time updates
- 🚀 **Modern Stack** - Built with Next.js, React, and TypeScript
- 🎨 **Beautiful UI** - Clean, responsive design with Tailwind CSS
- 🔄 **State Management** - Context API for global cart state
- 📱 **Mobile-Friendly** - Fully responsive design that works on all devices

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **State Management**: React Context API
- **Styling**: Tailwind CSS, ShadCN UI components

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chakradhar2004/Mock-E-Com-Cart.git
   cd Mock-E-Com-Cart
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   # Create a .env file with your MongoDB URI
   echo "MONGODB_URI=your_mongodb_uri" > .env
   # Start the backend server
   npm run dev
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   # Start the development server
   npm run dev
   ```

4. **Open your browser**
   The application will be available at `http://localhost:3000`

## Project Structure

```
Mock-E-Com-Cart/
├── backend/           # Backend server (Node.js, Express)
│   ├── config/        # Database configuration
│   ├── middleware/    # Express middleware
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   └── server.js      # Server entry point
├── frontend/          # Frontend application (Next.js)
│   ├── public/        # Static files
│   ├── src/
│   │   ├── app/       # Next.js app router
│   │   ├── components/ # React components
│   │   ├── lib/       # Utilities and context
│   │   └── styles/    # Global styles
│   └── package.json   # Frontend dependencies
└── README.md          # This file
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Your Name]
