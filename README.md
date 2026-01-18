# Default Dashboard

A modern dashboard skeleton built with **React**, **Umi.js**, and **Ant Design v6**, styled with the **Dutchy Design System** (Purple theme).

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Umi.js](https://umijs.org/) | Enterprise-level React framework with routing, build tooling, and plugins |
| [Ant Design v6](https://ant.design/) | Comprehensive React UI component library |
| [ProLayout](https://procomponents.ant.design/en-US/components/layout) | Out-of-the-box layout solution for dashboards |
| [ahooks](https://ahooks.js.org/) | High-quality React hooks library |
| [LESS](https://lesscss.org/) | CSS preprocessor for advanced styling |

## Why Ant Design?

Ant Design provides:

- **Complete component library** - 50+ high-quality components covering most UI needs
- **Enterprise-ready** - Battle-tested in production at scale (Alibaba, Tencent, etc.)
- **Design tokens** - Centralized theming via ConfigProvider
- **TypeScript support** - Full type definitions out of the box
- **Accessibility** - WCAG 2.1 compliant components
- **Internationalization** - Built-in i18n support

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- Package manager: npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/skitsanos/default-dashboard.git
cd default-dashboard

# Install dependencies
bun install
# or: npm install

# Start development server
bun dev
# or: npm run dev
```

The app will be available at `http://localhost:8000`

### Demo Credentials

- **Username:** anything (e.g., `demo`)
- **Password:** `demodemo`

## Project Structure

```
src/
├── @types/          # TypeScript type definitions
├── api.ts           # API client configuration
├── assets/          # Static assets (images, SVGs)
├── components/      # Reusable React components
├── defaults.ts      # App constants and defaults
├── hooks/           # Custom React hooks
├── layouts/         # Page layouts (ProLayout wrapper)
├── pages/           # Route pages (file-based routing)
├── sidebarMenu.tsx  # Sidebar navigation config
└── theme/           # Theming configuration
    ├── dutchyTheme.ts   # Ant Design theme tokens
    ├── antd.less        # Component style overrides
    ├── utils.less       # Utility classes
    └── variables.less   # LESS variables
```

## Theming

This project uses the **Dutchy Design System** with a Purple theme. The design principles are:

- **Sharp geometry** - No rounded corners (borderRadius: 0)
- **Bold typography** - Space Grotesk (display), Inter (body), JetBrains Mono (code)
- **High contrast** - Clear visual hierarchy
- **Accent borders** - 4px borders for emphasis

### Theme Configuration

The theme is configured in `src/theme/dutchyTheme.ts`:

```typescript
import { ThemeConfig } from 'antd/es/config-provider/context';
import { theme } from 'antd';

const dutchyTheme: ThemeConfig = {
    algorithm: theme.defaultAlgorithm,
    token: {
        // Colors
        colorPrimary: '#7c3aed',      // Purple
        colorSuccess: '#16a34a',
        colorWarning: '#f59e0b',
        colorError: '#dc2626',

        // Typography
        fontFamily: 'Inter, sans-serif',

        // Sharp corners (Dutchy signature)
        borderRadius: 0,
        borderRadiusLG: 0,
        borderRadiusSM: 0,
    },
    components: {
        Button: {
            fontWeight: 700,
            borderRadius: 0,
            primaryShadow: 'none',
        },
        // ... more component overrides
    },
};
```

### Applying the Theme

The theme is applied via `ConfigProvider` in `src/layouts/index.tsx`:

```tsx
import { ConfigProvider } from 'antd';
import dutchyTheme from '@/theme/dutchyTheme';

<ConfigProvider theme={dutchyTheme}>
    {/* Your app */}
</ConfigProvider>
```

### Customizing Colors

To change the primary color, update `dutchyColors` in `src/theme/dutchyTheme.ts`:

```typescript
export const dutchyColors = {
    primary: '#7c3aed',           // Change this
    primaryHover: '#6d28d9',      // Darker shade for hover
    primaryLight: '#ede9fe',      // Light shade for backgrounds
    // ...
};
```

### LESS Variables

Global LESS variables are defined in `src/theme/variables.less` and can be used in any `.less` file:

```less
@color-primary: #7c3aed;
@color-foreground: #0a0a0a;
@color-background: #ffffff;
@font-display: 'Space Grotesk', sans-serif;
```

## Umi.js Best Practices

### File-Based Routing

Pages in `src/pages/` automatically become routes:

```
src/pages/
├── index.tsx        → /
├── login/index.tsx  → /login
├── users/index.tsx  → /users
├── files/index.tsx  → /files
└── 404.tsx          → 404 fallback
```

### Configuration

All Umi configuration is in `.umirc.ts`:

```typescript
export default {
    title: 'My Dashboard',

    // Global CSS/fonts
    styles: [
        'https://fonts.googleapis.com/css2?family=Inter...'
    ],

    // Global constants (accessible anywhere)
    define: {
        APP_NAME: 'My Dashboard',
        APP_VERSION: '1.0.0',
    },

    // API proxy (development)
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
        }
    },
};
```

### Mock API

During development, Umi automatically loads mock files from `mock/`:

```javascript
// mock/login.js
export default {
    'POST /api-local/auth/login': (req, res) => {
        const { password } = req.body;
        if (password === 'demodemo') {
            res.status(200).json({
                result: {
                    session: {
                        token: 'demo-token',
                        user: { name: 'Demo User' }
                    }
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    }
};
```

### Path Aliases

Use `@/` to import from `src/`:

```typescript
import useSession from '@/hooks/useSession';
import ContentArea from '@/components/ContentArea';
import { endpoints } from '@/api';
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun preview` | Preview production build |

## Authentication

The app uses a simple session-based auth flow:

1. User submits credentials to `/api-local/auth/login`
2. Server returns `{ result: { session: { token, user } } }`
3. Session is stored in `localStorage`
4. `useSession` hook provides session state and `login`/`logout` methods
5. Protected routes redirect to `/login` when no session exists

### Session Hook

```typescript
import useSession from '@/hooks/useSession';

const MyComponent = () => {
    const { session, login, logout } = useSession();

    if (!session) {
        return <div>Not logged in</div>;
    }

    return <div>Welcome, {session.user.email}</div>;
};
```

## Customization Tips

### Adding a New Page

1. Create a file in `src/pages/`:
   ```tsx
   // src/pages/settings/index.tsx
   import ContentArea from '@/components/ContentArea';

   export default () => (
       <ContentArea title="Settings">
           {/* Your content */}
       </ContentArea>
   );
   ```

2. Add to sidebar menu in `src/sidebarMenu.tsx`:
   ```tsx
   {
       path: '/settings',
       name: 'Settings',
       icon: <SettingOutlined />
   }
   ```

### Adding API Endpoints

1. Add endpoint to `src/api.ts`:
   ```typescript
   export const endpoints = {
       login: `${url}/auth/login`,
       settings: `${url}/settings`,  // Add here
   };
   ```

2. Create mock in `mock/settings.js`:
   ```javascript
   export default {
       'GET /api-local/settings': { result: { theme: 'dark' } }
   };
   ```

## License

MIT

## Author

[Evi Skitsanos](https://www.linkedin.com/in/skitsanos/)
