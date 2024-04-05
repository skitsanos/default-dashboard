import {create} from 'zustand';

export const SESSION_STORAGE_KEY = 'session-context';

const useSession = create((set) => ({
    session: localStorage.getItem(SESSION_STORAGE_KEY) !== null
             ? JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY))
             : INITIAL_SESSION,

    login: (newSession) =>
    {

        set({
            ...newSession,
            createdOn: new Date().getTime()
        });

        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));
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
            set({session: JSON.parse(storedSession)});
        }
    }
}));

export default useSession;
