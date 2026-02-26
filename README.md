# Pixora

[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-53-000.svg?style=flat&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.79-blue.svg?style=flat&logo=react&logoColor=white)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D16-green.svg?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)

Pixora is an Expo + React Native image discovery app powered by the Pixabay API. Search photos, browse categories, apply filters, and view results in a masonry grid. Save/share images on mobile, or copy links on web.

---

## Repository description (GitHub-ready)
Pixora - Expo/React Native image search & wallpaper browser powered by the Pixabay API, with categories, filters, masonry grid, and save/share.

---

## Features
- Debounced search + infinite scrolling feed
- Category browsing + filter modal (type, colors, etc.)
- Masonry grid layout via `@shopify/flash-list`
- Fullscreen image view with download/share actions
- Media library integration via `expo-media-library`

---

## Tech stack
- Expo (SDK 53) + React Native (0.79) + `expo-router`
- `axios` for API calls (Pixabay)
- `@gorhom/bottom-sheet` for filters UI
- `expo-image`, `expo-media-library`, `expo-file-system`, `expo-sharing`

---

## Getting started

### Prerequisites
- Node.js (>= 16)
- npm

### Installation
```bash
npm install
```

### Run
```bash
npm run start
```

### Platform
```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

### Lint
```bash
npm run lint
```

---

## Configuration
The Pixabay API key is currently defined in `api/index.js` as `API_KEY`. For production, move it to an environment-based config (for example `EXPO_PUBLIC_PIXABAY_API_KEY`) and avoid committing secrets.

---

## Project structure
- `app/`: routes (expo-router)
  - `app/index.jsx`: landing screen
  - `app/home/index.jsx`: home feed (search/categories/filters)
  - `app/home/Image.jsx`: image modal (download/share)
- `api/`: Pixabay API wrapper
- `components/`: UI building blocks (filters, grid, cards)
- `constants/`: theme + filter data
- `helpers/`: layout + utility helpers

---

## Suggested tags (GitHub topics)
`react-native`, `expo`, `expo-router`, `pixabay`, `pixabay-api`, `image-search`, `wallpapers`, `gallery-app`, `masonry-layout`, `flash-list`, `expo-media-library`, `expo-image`, `react-navigation`, `android`, `ios`, `web`, `javascript`
