# HardGif Clone

A modern, responsive adult video/gif aggregation website built with Next.js and RedGIFs API.

## Features

- **Dense Masonry Layout**: CSS Multi-column layout for a true "Pinterest-style" dense gallery.
- **Dark Mode**: Sleek dark theme by default.
- **Infinite Scroll**: Auto-loads more content as you scroll.
- **Lazy Loading**: Iframes load only when near the viewport.
- **Privacy Focused**: Proxies API requests through a backend to hide logic and manage tokens. No rehosting.

## Architecture

### Backend (`/api/gifs`)
- Acts as a proxy between the Client and RedGIFs.
- Handles Authentication: Automatically fetches temporary guest tokens from RedGIFs.
- Endpoints:
  - Default: Fetches Trending GIFs.
  - Search: Fetches results based on query.
- Extracts only the `id` to minimize bandwidth and strictly follow constraints.

### Frontend
- **Framework**: Next.js (App Router).
- **Styling**: Vanilla CSS Modules (Global CSS for simplicity here) with CSS Variables.
  - Uses `column-count` for Masonry layout rather than JS libraries to improve performance and reduce layout shifts (once loaded).
- **State Management**: React `useState` and `useEffect` for data fetching and infinite scroll.
- **Embeds**: Uses RedGIFs standard iframe embeds.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

3. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## Customization

- **Layout**: Adjust column counts in `src/app/globals.css` under `.masonry-grid`.
- **Aspect Ratio**: Currently defaults to 9:16 vertical ratio for containers. Edit `.iframe-container` padding-top to change.

## Disclaimer

This project uses the RedGIFs public API. Ensure you comply with their Terms of Service.
