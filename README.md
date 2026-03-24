# MF-Dashboard

Dashboard Microfrontend - Angular 21.1.4 with Module Federation

## Description

This is the Dashboard microfrontend application, part of the MicroFrontends architecture. It provides analytics and reports functionality.

## Features

- Analytics dashboard
- Reports generation
- Standalone operation
- Module Federation integration

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Running

```bash
npm start
```

The application will be available at `http://localhost:4202`

### Building

```bash
npm run build
```

## Module Federation

This microfrontend exposes:
- `./Module`: Dashboard module
- `./Component`: Dashboard component

Remote entry: `http://localhost:4202/remoteEntry.js`

## Architecture

- Angular 21.1.4 (Standalone Components)
- PrimeNG UI Library
- Vitest for testing
- Webpack 5 with Module Federation