import type {Session} from '@/hooks/useSession';

export const app = {
    title: 'My Dashboard'
};

/** Routes rendered without the ProLayout chrome (no sidebar, no header). */
export const hasNoLayout = [
    '/login'
];

/** Routes reachable without a session. Anything else redirects to /login. */
export const publicRoutes = [
    '/login',
    '/signup'
];

export const gridGutter: [number, number] = [16, 16];

/** Shape handed to pages through the layout's `<Outlet context={...}/>`. */
export interface SessionContext
{
    session: Session | null;
}
