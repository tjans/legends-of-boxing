# React JWT Authentication Template

A modern React TypeScript template with JWT authentication, Material Design 3 components, and centralized theming configuration.

## Features

- 🔐 JWT Authentication system
- 🎨 Material Design 3 components
- 🎯 TypeScript with strict mode
- 🌈 Tailwind CSS 4.x
- ⚡ Vite for fast development
- 📱 Responsive design
- 🎛️ Centralized theme configuration
- 🧩 Template/Accelerator ready

## Quick Start

```bash
npm install
npm run dev
```

## Simple Color Customization

This template includes a dead-simple color system that's easy to customize and override.

### Basic Usage

```tsx
// Default blue button
<Button variant="filled">Click me</Button>

// Using predefined colors from config
<Button variant="filled" color="success">Success Button</Button>
<Button variant="outlined" color="error">Error Button</Button>

// Using any custom hex color
<Button variant="filled" color="#8b5cf6">Purple Button</Button>
<Button variant="text" color="#f59e0b">Orange Text</Button>
```

### Customizing Your Brand Colors

Just edit `@/config/app.ts`:

```typescript
export const COLORS = {
  primary: "#your-brand-color",    // Your main brand color
  secondary: "#6b7280",          // Gray for secondary actions  
  success: "#059669",            // Green for success
  error: "#dc2626",              // Red for errors
  warning: "#d97706",            // Orange for warnings
} as const;
```

Then use them anywhere:
```tsx
<Button color="primary">Uses your brand color</Button>
```

### Styled Links

The template includes a styled Link component that provides proper link styling:

```tsx
// Internal navigation (React Router)
<Link to="/members">Go to Members</Link>

// External links
<Link external href="https://example.com" target="_blank">External Link</Link>

// Custom colors
<Link to="/" color="success">Success colored link</Link>
<Link to="/" color="#8b5cf6">Purple link</Link>

// Control underlines
<Link to="/" underline={false}>No underline until hover</Link>
```

Customize link appearance in `@/config/app.ts`:

```typescript
export const LINK_CONFIG = {
  defaultColor: COLORS.primary,     // Default link color
  hoverColor: "#1d4ed8",           // Color on hover
  underline: true,                 // Show underline by default
} as const;
```

### Available Props

- **color**: Use any predefined color name or hex color (`"primary"`, `"#ff0000"`)
- **variant**: Choose button style (`"filled"`, `"outlined"`, `"text"`, `"elevated"`, `"tonal"`)
- **size**: Pick size (`"sm"`, `"md"`, `"lg"`)
- **loading**: Show loading spinner
- **disabled**: Disable the button
- **fullWidth**: Make button full width

## Component Library

- **Button**: Material Design 3 button with 5 variants, 3 sizes, loading states
- **Layout**: Responsive layout with themed header and footer
- **Authentication**: JWT login/logout system
- **Error Pages**: Styled error handling

## Template Usage

This project is designed to be used as a template/accelerator:

1. Clone the repository
2. Customize `@/config/app.ts` with your branding
3. Update `APP_NAME` and other constants
4. Modify color themes to match your brand
5. Build your application on top of the foundation

## Technology Stack

- React 18
- TypeScript 5.x
- Vite 7.x
- Tailwind CSS 4.x
- React Router 6.x
- Material Design 3 principles

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT License - feel free to use this template for your projects!