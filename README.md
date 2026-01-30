# 🏪 AutoSpace Performance Parts

![AutoSpace Logo](public/AUTO-SPACE-LOGO.jpg)

*An online marketplace extension for AUTO SPACE W.L.L., Bahrain's trusted automotive parts supplier*

---

## 📖 About the Application

**AutoSpace Performance Parts** is a full-stack web application that extends the reach of AUTO SPACE W.L.L., a leading automotive parts supplier based in Bahrain. This digital marketplace allows customers to browse, list, and manage automotive parts inventory online, connecting buyers and sellers in a seamless platform.

### Why This App Was Built

AUTO SPACE W.L.L. has been serving the Bahraini automotive market with quality OEM parts, body parts, paints, and power tools. This application was developed to:

- **Expand Market Reach:** Provide an online presence to complement the physical store in ALHAMALA, Bahrain
- **Simplify Inventory Management:** Enable efficient browsing and management of the extensive parts catalog
- **Enhance Customer Experience:** Allow customers to browse inventory, check availability, and manage their listings 24/7
- **Build Community:** Create a platform where automotive enthusiasts, mechanics, and parts suppliers can connect

The app reflects AUTO SPACE's commitment to their motto: *"Our aim is to have every automobile spare part - if a client comes to us, they never go to a different company."*

---

## 🚀 Getting Started

### 🌐 Live Application

**Deployed Application:** [AutoSpace Performance Parts - Live Demo](#)  
**Company Website:** [www.autospace-bh.com](https://www.autospace-bh.com)

### 📋 Planning Materials

- **Project Checklist:** [PROJECT_CHECKLIST.md](PROJECT_CHECKLIST.md)
- **Deployment Guide:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **Quick Start Guide:** [QUICKSTART.md](QUICKSTART.md)

### 🏢 Store Information

**AUTO SPACE W.L.L.**  
📍 Building: 270, Road: 1203, Block: 1012  
ALHAMALA, BAHRAIN  

📧 Email: [info@autospace-bh.com](mailto:info@autospace-bh.com)  
📞 Phone: [+973-33618181](tel:+97333618181)  

**Opening Hours:**  
🕐 Saturday to Thursday: 8:00 AM - 1:00 PM, 3:00 PM - 7:00 PM  
🚫 Friday: CLOSED

---

## ✨ Features

### Core Functionality

- ✅ **User Authentication:** Secure sign-up and login system with session-based authentication
- ✅ **Full CRUD Operations:** Create, read, update, and delete auto parts listings
- ✅ **Authorization:** Only part owners can edit or delete their listings
- ✅ **Advanced Filtering:** Browse parts by category, condition, manufacturer, and compatibility
- ✅ **Responsive Design:** Mobile-friendly interface that works on all screen sizes
- ✅ **Real-time Inventory:** Track part availability and stock levels
- ✅ **Detailed Listings:** Comprehensive part information including pricing and descriptions

### AutoSpace Services Showcased

- 🔧 **OEM Spare Parts:** Original and quality replacement parts catalog
- 🚗 **Body Parts:** Extensive collection of automotive body parts
- 🎨 **Paints:** Professional automotive paint solutions
- ⚙️ **Power Tools:** Workshop-grade tools and equipment

---

## 📸 Screenshots

### Homepage
*Browse our extensive catalog and learn about AutoSpace services*

### Parts Inventory
*Full searchable inventory with detailed specifications*

### Part Details
*Comprehensive information including compatibility, condition, and pricing*

---

## 💻 Technologies Used

### Backend Technologies

- **Node.js** (v14+) - JavaScript runtime environment
- **Express.js** (v4.18+) - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** (v7.0+) - Elegant MongoDB object modeling

### Frontend Technologies

- **EJS** (Embedded JavaScript) - Dynamic templating engine
- **CSS3** - Modern styling with custom properties, Flexbox, and Grid
- **Vanilla JavaScript** - Client-side interactivity without framework overhead

### Authentication & Security

- **bcrypt** (v5.1+) - Industry-standard password hashing
- **express-session** (v1.17+) - Session middleware for user authentication

### Development Tools & Utilities

- **Nodemon** (v2.0+) - Auto-restart development server
- **Morgan** - HTTP request logger for debugging
- **Method-Override** - RESTful HTTP verb support (PUT, DELETE)
- **dotenv** (v16.0+) - Environment variable configuration
- **Git** - Version control

### Design & Styling

- Performance-focused color scheme (Red #dc2626 + Dark Gray #1f2937)
- System font stack for optimal performance
- Responsive design (mobile-first approach)
- Custom CSS variables for theming

---

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/autoparts-store.git
   cd autoparts-store
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secret_key_here
   ```

4. **Start MongoDB**

   If running locally:

   ```bash
   mongod
   ```

5. **Run the application**

   ```bash
   npm start
   ```

   For development with auto-reload:

   ```bash
   nodemon server.js
   ```

6. **Access the application**

   Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
autoparts-store/
├── controllers/
│   ├── auth.js           # Authentication routes
│   ├── index.routes.js   # Homepage routes
│   └── parts.js          # Parts CRUD routes
├── middleware/
│   ├── is-signed-in.js   # Authentication middleware
│   └── pass-user-to-view.js  # User context middleware
├── models/
│   ├── User.js           # User schema
│   └── Part.js           # Part schema
├── public/
│   └── css/
│       └── style.css     # Application styles
├── views/
│   ├── auth/
│   │   ├── sign-in.ejs   # Login page
│   │   └── sign-up.ejs   # Registration page
│   ├── parts/
│   │   ├── index.ejs     # Parts listing
│   │   ├── new.ejs       # Add part form
│   │   ├── show.ejs      # Part details
│   │   └── edit.ejs      # Edit part form
│   ├── homepage.ejs      # Landing page
│   └── navbar.ejs        # Navigation component
├── .env                  # Environment variables (not in repo)
├── .gitignore           # Git ignore rules
├── package.json         # Project dependencies
└── server.js            # Application entry point
```

## 🎯 Usage

### For Buyers

1. **Browse Parts:** Visit the "Browse Parts" page to see all available auto parts
2. **View Details:** Click on any part to see detailed information
3. **Filter Results:** Use category and condition filters to find specific parts
4. **Contact Sellers:** View seller information for each part

### For Sellers

1. **Create Account:** Sign up for a free account
2. **List Parts:** Click "Sell a Part" to create a new listing
3. **Manage Inventory:** Edit or delete your listings anytime
4. **Track Sales:** Monitor your active listings from the inventory page

## 🔐 Authentication Flow

1. **Sign Up:** New users create an account with a unique username and password
2. **Password Security:** Passwords are hashed using bcrypt before storage
3. **Session Management:** Active sessions are maintained using express-session
4. **Protected Routes:** Authenticated users can create, edit, and delete their parts
5. **Authorization:** Users can only modify their own listings

## 🗄️ Database Schema

### User Model

```javascript
{
  username: String (required, unique),
  password: String (required, hashed),
}
```

### Part Model

```javascript
{
  name: String (required),
  partNumber: String (required),
  category: String (required, enum),
  manufacturer: String (required),
  price: Number (required, min: 0),
  quantity: Number (required, min: 0),
  condition: String (required, enum: New/Used/Refurbished),
  vehicleCompatibility: String (required),
  description: String (required),
  owner: ObjectId (ref: User, required),
  timestamps: true
}
```

## 🎨 Design Features

- **Color Palette:** Professional blue theme with excellent contrast ratios (WCAG 2.0 AA compliant)
- **Typography:** System font stack for optimal performance and readability
- **Layout:** CSS Grid and Flexbox for responsive, modern layouts
- **Animations:** Subtle transitions and hover effects for better UX
- **Accessibility:** Semantic HTML, proper ARIA labels, and keyboard navigation support

## 🔮 Next Steps (Planned Future Enhancements)


- [ ] **Image Upload System** - Allow users to upload multiple images for parts listings
- [ ] **Advanced Search & Filters** - Full-text search with filtering by price, make, model, and year
- [ ] **User Reviews & Ratings** - Build trust through seller ratings and part reviews
- [ ] **Shopping Cart & Checkout** - Enable multi-part purchases with secure payment integration
- [ ] **Messaging System** - In-app communication between buyers and sellers
- [ ] **Mobile Application** - Native iOS/Android apps for on-the-go access
- [ ] **Multi-language Support** - Arabic and English language options
- [ ] **Analytics Dashboard** - Track sales, inventory, and user engagement metrics
- [ ] **Email Notifications** - Automated alerts for new listings, messages, and price changes
- [ ] **API Development** - RESTful API for third-party integrations
- [ ] **Vehicle Garage** - Save user vehicles for compatible part recommendations
- [ ] **Inventory Sync** - Real-time synchronization with physical store POS system


## 🙏 Attributions

### External Resources & Libraries

- **Node.js & npm Ecosystem:** [Node.js](https://nodejs.org/) - JavaScript runtime and package manager
- **Express.js Framework:** [Express](https://expressjs.com/) - Web application framework
- **MongoDB:** [MongoDB](https://www.mongodb.com/) - NoSQL database platform
- **Mongoose ODM:** [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- **bcrypt Library:** [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing implementation

### Design & Assets

- **Company Logo:** AUTO SPACE W.L.L. official branding
- **Color Scheme:** Custom performance-oriented palette (Red #dc2626, Dark Gray #1f2937)
- **Typography:** System default font stack for performance and compatibility
- **Icons:** Unicode emoji characters (no external icon libraries)

### Documentation & Learning Resources

- **MDN Web Docs:** [Mozilla Developer Network](https://developer.mozilla.org/) - HTML, CSS, JavaScript references
- **MongoDB Documentation:** [MongoDB Manual](https://docs.mongodb.com/)
- **Express.js Guide:** [Express Documentation](https://expressjs.com/en/guide/routing.html)
- **EJS Documentation:** [EJS Templating](https://ejs.co/)

### Development Tools

- **VS Code:** Code editor
- **Git & GitHub:** Version control and repository hosting
- **Postman:** API testing during development
- **Chrome DevTools:** Frontend debugging and optimization

### Special Thanks

- **AUTO SPACE W.L.L.** - For the opportunity to build this digital extension
- **General Assembly** - Software engineering education and guidance

---

## 📄 License

This project is developed for AUTO SPACE W.L.L. All rights reserved.

---

## 👤 Contact & Support

### Developer Information

For technical inquiries or support, please contact through:

- 📧 Project Email: [Contact through AUTO SPACE W.L.L.](mailto:info@autospace-bh.com)
- 🌐 Company Website: [www.autospace-bh.com](https://www.autospace-bh.com)

### AUTO SPACE W.L.L. Support

- 📍 Visit our store: Building 270, Road 1203, Block 1012, ALHAMALA, BAHRAIN
- 📞 Call us: [+973-33618181](tel:+97333618181)
- 📧 Email: [info@autospace-bh.com](mailto:info@autospace-bh.com)
- 🕐 Hours: Sat-Thu 8AM-1PM, 3PM-7PM (Closed Friday)

---

## 🤝 Contributing

This is a proprietary application for AUTO SPACE W.L.L. For feature requests or bug reports, please contact the development team through the company email.

---


### ⭐ AutoSpace Performance Parts ⭐

**Building: 270, Road: 1203, Block: 1012 | ALHAMALA, BAHRAIN**

*Your trusted source for OEM parts, body parts, paints & power tools*

[Visit Our Website](https://www.autospace-bh.com) | [Contact Us](mailto:info@autospace-bh.com) | [Call +973-33618181](tel:+97333618181)

---

© 2026 AUTO SPACE W.L.L. All Rights Reserved.


