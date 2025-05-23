export interface User {
    _key: string;
    email: string;
    createdOn: number;
    lastLogin: number;
    updatedOn: number;
    gravatar?: string;
}

export interface Session {
    user: User;
    token: string;
    createdOn?: number;
}

export interface SessionState {
    session: Session | null;
    login: (newSession: { session: Session }) => void;
    logout: () => void;
    restoreSessionFromLocalStorage: () => void;
}