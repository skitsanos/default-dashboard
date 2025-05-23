import {create} from 'zustand';
import {SessionState} from '@/@types/session';

export const SESSION_STORAGE_KEY = 'session-context';

const useSession = create<SessionState>((set) => ({
    session: localStorage.getItem(SESSION_STORAGE_KEY) !== null
             ? JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY))
             : INITIAL_SESSION?.session || null,

    login: (newSession) =>
    {
        const sessionWithTimestamp = {
            ...newSession,
            session: {
                ...newSession.session,
                createdOn: new Date().getTime()
            }
        };

        set({
            session: sessionWithTimestamp.session
        });

        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionWithTimestamp));
    },

    logout: () =>
    {
        set({
            session: null
        });
        localStorage.removeItem(SESSION_STORAGE_KEY);
    },

    restoreSessionFromLocalStorage: () =>
    {
        const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
        if (storedSession)
        {
            const parsed = JSON.parse(storedSession);
            set({session: parsed.session});
        }
    }
}));

export default useSession;
