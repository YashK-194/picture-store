# Picture Store

A responsive React application for browsing and purchasing pictures online. Users can select images they want to purchase, add them to a shopping cart, and check out when ready. Once purchased, images are marked as sold and no longer available for others to buy.

![Picture Store Screenshot](https://i.postimg.cc/7LM5B941/Screenshot-from-2025-05-13-20-11-03.png)

## Features

- Browse a collection of high-quality images with prices
- Add images to a shopping cart
- Remove images from the cart if needed
- See total price calculation in real-time
- Check out and purchase selected images
- Responsive design works on all devices

## Project Structure

The project follows React best practices with component organization:

```
src/
  ├── components/       # UI components
  │   ├── PictureItem.js    # Individual picture component
  │   ├── PictureList.js    # Grid of available pictures
  │   └── ShoppingCart.js   # Shopping cart implementation
  ├── data/            # Data files
  │   └── picturesData.js   # Sample picture data
  ├── hooks/           # Custom React hooks
  │   └── useCart.js        # Cart functionality hook
  ├── utils/           # Utility files
  │   └── constants.js      # App constants
  └── context/         # React context (for future use)
```

## Tech Stack

- React 19
- CSS3 with custom styling
- React Hooks for state management
- Responsive design without external UI libraries

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/picture-store.git
   cd picture-store
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Deployment

The application is built for easy deployment to any static hosting service:

1. Build the production version:

   ```bash
   npm run build
   ```

2. Deploy the generated `build` folder to any static hosting service like:
   - GitHub Pages
   - Netlify
   - Vercel
   - AWS S3

## Future Enhancements

- User authentication
- Image categories and filtering
- Payment gateway integration
- User purchase history
- Admin panel for managing inventory

## License

MIT © Yash Kumar
