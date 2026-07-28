# Default Dashboard

A modern dashboard skeleton built with **React**, **Umi.js**, and **Ant Design v6**, styled with the **Dutchy Design System** (Purple theme).

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Umi.js](https://umijs.org/) | Enterprise-level React framework with routing, build tooling, and plugins |
| [Ant Design v6](https://ant.design/) | Comprehensive React UI component library |
| [ProLayout](https://procomponents.ant.design/en-US/components/layout) | Out-of-the-box layout solution for dashboards |
| [ahooks](https://ahooks.js.org/) | High-quality React hooks library |
| [Zustand](https://zustand.docs.pmnd.rs/) | Minimal state management (used for the session store) |
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

- Node.js 20+ or Bun 1.0+ (CI builds on Node 22)
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
├── global.less      # Global styles (entry point for the LESS files below)
├── hooks/           # Custom React hooks
├── layouts/         # Page layouts (ProLayout wrapper)
├── pages/           # Route pages (file-based routing)
├── sidebarMenu.tsx  # Sidebar navigation config
├── utils/           # Shared helpers
└── theme/           # Theming configuration
    ├── dutchyTheme.ts   # Ant Design theme tokens
    ├── variables.less   # LESS design tokens
    ├── antd.less        # Component style overrides
    └── utils.less       # Utility classes
```

## Theming

This project uses the **[Dutchy Design System](https://dutchy.demothat.app/)** with a Purple theme. The design principles are:

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

Design tokens live in `src/theme/variables.less`:

```less
@color-primary: #7c3aed;
@color-foreground: #0a0a0a;
@color-background: #ffffff;
@font-display: 'Space Grotesk', sans-serif;
```

LESS compiles each entry point on its own, so a stylesheet only sees the variables it has imported. Import the
tokens at the top of any page-level `.less` file before using them:

```less
@import url('../theme/variables.less');

.my-panel {
  border-left: 4px solid @color-primary;
}
```

## Umi.js Best Practices

### File-Based Routing

Pages in `src/pages/` automatically become routes:

```
src/pages/
├── index.tsx                → /
├── login/index.tsx          → /login
├── users/index.tsx          → /users
├── files/index.tsx          → /files
├── files/$fileId/index.tsx  → /files/:fileId   (a `$` prefix marks a dynamic segment)
└── 404.tsx                  → 404 fallback
```

Read dynamic segments with `useParams()`. Note that anything passed through router state is absent when the
page is opened by direct link, so guard it:

```tsx
const {fileId} = useParams();
const {name} = (useLocation().state ?? {}) as {name?: string};
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

    // Dev-server proxy. The chat page connects to `/ws` on its own origin and
    // this forwards it, so the target lives in one place.
    proxy: {
        '/ws': {
            target: 'wss://socketsbay.com/wss/v2/1/demo/',
            changeOrigin: true,
            ws: true,
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
| `bun run typecheck` | Type-check the project (`tsc --noEmit`) |
| `bun run depupdates` | Bump every dependency to its latest version |

> The bundler (mako) strips types without checking them, so `typecheck` is what actually catches type errors.
> CI (`.github/workflows/ci.yml`) runs `typecheck` and `build` on every push to `main` and every pull request.

## Dependencies

### Ant Design v6 and pro-components

`@ant-design/pro-layout` still declares `antd@^4 || ^5` as its peer dependency, so a plain `npm install`
against antd 6 fails with `ERESOLVE`. `package.json` carries `overrides` that point the pro-components
packages at the root `antd` and `@ant-design/icons`:

```json
"overrides": {
  "@ant-design/pro-layout": {
    "antd": "$antd",
    "@ant-design/icons": "$@ant-design/icons"
  }
}
```

Besides fixing the install, this collapses a duplicate `@ant-design/icons` v5 tree that pro-components would
otherwise pull in — worth roughly 370 kB off the vendors chunk.

If you add another pro-component (`pro-card`, `pro-form`, `pro-table`, …), give it the same override entry, or
the install will break again. Where a plain antd component will do, prefer it.

### Lockfiles

Lockfiles are not committed, so every install resolves fresh within the declared ranges. Renovate raises the
bumps and auto-merges patch and minor updates once CI is green; majors are left for review.

## Authentication

The app uses a simple session-based auth flow:

1. User submits credentials to `/api-local/auth/login`
2. Server returns `{ result: { session: { token, user } } }`
3. The inner `session` object is stored in `localStorage` under `session-context`
4. `useSession` hook provides session state and `login`/`logout` methods
5. Protected routes redirect to `/login` when no session exists

The session is always the flat `{ token, user }` object — in the store, in `localStorage`, and in the
`INITIAL_SESSION` define. `api.ts` reads the token from there to set the `Authorization` header, and drops the
session on a 401/403 from any endpoint other than login.

### Session Hook

```typescript
import useSession from '@/hooks/useSession';

const MyComponent = () => {
    const { session, login, logout } = useSession();

    if (!session) {
        return <div>Not logged in</div>;
    }

    return <div>Welcome, {session.user?.email}</div>;
};
```

Pages rendered inside the layout also receive the session through the router outlet:

```tsx
import { useOutletContext } from 'umi';
import type { SessionContext } from '@/defaults';

const { session } = useOutletContext<SessionContext>();
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

## Deployment

The project is set up for [Netlify](https://www.netlify.com/) via `netlify.toml`:

```bash
bun build       # writes to ./dist
bun run deploy  # netlify deploy --prod
```

Two redirect rules matter, and their order matters too — Netlify applies the first rule that matches, reading
top to bottom:

1. `/api/*` → `/.netlify/functions/:splat` — routes API calls to the serverless functions in `functions/`.
2. `/*` → `/index.html` (200) — the SPA fallback, so deep links like `/files/abc` reach the router instead of
   returning a 404.

Keep the catch-all last. Above the API rule it matches `/api/...` first and answers function calls with
`index.html`.

`functions/users.js` is a worked example of one such function. Note that anything a function `require`s at
runtime belongs in `dependencies`, not `devDependencies`.

The `mock/` directory is a separate mechanism: Umi serves it from the dev server only, and it never ships in
a build.

## License

MIT

## Author

[Evi Skitsanos](https://www.linkedin.com/in/skitsanos/)
