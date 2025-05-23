import { Session } from './session';

export interface ApiResponse<T = any> {
    success: boolean;
    result: T;
    message?: string;
}

export interface ApiError {
    response: {
        status: number;
    };
    data: {
        message: string;
    };
}

export interface LoginResponse {
    session: Session;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface FileData {
    _key: string;
    name: string;
    size: number;
    type: string;
    createdOn: number;
    updatedOn: number;
}

export interface UserData {
    _key: string;
    email: string;
    createdOn: number;
    updatedOn: number;
    lastLogin?: number;
    gravatar?: string;
}