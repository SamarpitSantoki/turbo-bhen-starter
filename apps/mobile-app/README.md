# AutoBroZ Mobile App 👋

A React Native mobile application built with Expo for managing auto services and maintenance.

## Features

- Authentication system
- Vehicle and customer management
- Dark/Light mode support
- Custom UI components using Gluestack UI
- File-based routing with Expo Router

## Tech Stack

- React Native with Expo
- TypeScript
- Gluestack UI for components
- NativeWind (Tailwind CSS for React Native)
- Zustand for state management
- React Query for data fetching
- Expo Router for navigation
- AsyncStorage for local storage

## Getting Started

1. Install dependencies:

```bash
bun install
```

2. Start the development server:

```bash
bun expo start
```

You can run the app on:
- iOS Simulator
- Android Emulator
- Physical device using Expo Go
- Web browser

## Development

### Project Structure

- `/src/app` - Application screens and routing
- `/src/components` - Reusable UI components
- `/src/store` - State management with Zustand
- `/src/hooks` - Custom React hooks
- `/src/assets` - Images and other static assets

### Environment Setup

Make sure you have the following installed:
- Node.js
- Bun
- iOS Simulator (for Mac users)
- Android Studio & Android Emulator
- Expo CLI (`bun install -g expo-cli`)

### Available Scripts

```bash
bun run android    # Run on Android
bun run ios        # Run on iOS
bun run lint       # Run linter
```

## Building for Production

To create a production build:

```bash
bun run build:preview    # Build Android preview
bun run update:preview   # Update preview build
```

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Gluestack UI Documentation](https://ui.gluestack.io/)

## License

This project is private and proprietary software.
