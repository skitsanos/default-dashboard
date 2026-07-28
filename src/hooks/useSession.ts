import {create} from 'zustand';

export const SESSION_STORAGE_KEY = 'session-context';

export interface SessionUser
{
    _key?: string;
    email?: string;
    name?: string;
    gravatar?: string;
    createdOn?: number;
    lastLogin?: number;

    [key: string]: unknown;
}

export interface Session
{
    token: string;
    user?: SessionUser;

    [key: string]: unknown;
}

interface SessionState
{
    session: Session | null;
    login: (session: Session) => void;
    logout: () => void;
    restoreSessionFromLocalStorage: () => void;
}

/**
 * The login endpoint answers with `{result: {session: {...}}}`, so a session may reach us either bare or still
 * wrapped in its envelope. Unwrapping here keeps a single shape in the store and in localStorage.
 */
const unwrapSession = (raw: unknown): Session | null =>
{
    if (!raw || typeof raw !== 'object')
    {
        return null;
    }

    const candidate = raw as Record<string, unknown>;

    if (candidate.session && typeof candidate.session === 'object')
    {
        return unwrapSession(candidate.session);
    }

    return candidate.token ? candidate as unknown as Session : null;
};

export const readStoredSession = (): Session | null =>
{
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw)
    {
        return null;
    }

    try
    {
        return unwrapSession(JSON.parse(raw));
    }
    catch
    {
        // Corrupted entry - drop it so we don't keep failing on every read.
        localStorage.removeItem(SESSION_STORAGE_KEY);
        return null;
    }
};

const useSession = create<SessionState>((set) => ({
    session: readStoredSession() ?? unwrapSession(INITIAL_SESSION),

    login: (session) =>
    {
        const normalized = unwrapSession(session);

        set({session: normalized});

        if (normalized)
        {
            localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(normalized));
        }
    },

    logout: () =>
    {
        set({session: null});
        localStorage.removeItem(SESSION_STORAGE_KEY);
    },

    restoreSessionFromLocalStorage: () => set({session: readStoredSession()})
}));

export default useSession;
