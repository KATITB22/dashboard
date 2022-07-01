import Axios, { AxiosError } from 'axios';
import Cookies from 'universal-cookie';
import { APIErrorObject } from './api-error-object';

class APIClient {
    public readonly API_URL: string = import.meta.env.VITE_API_URL;

    public readonly COOKIE_DOMAIN: string = import.meta.env.VITE_COOKIE_DOMAIN;

    private token: string = '';

    public user: Record<string, any> = {};

    constructor() {
        const cookie = new Cookies();
        const cookies = cookie.getAll();
        if (cookies) {
            if (cookies.token) {
                this.token = cookies.token;
            }
        }
    }

    private async isTokenValid(): Promise<boolean> {
        const response = await this.GET('/users/me');
        if (response instanceof APIErrorObject) {
            return false;
        }
        this.user = response;
        return true;
    }

    public async checkToken(redirect: boolean = true): Promise<boolean> {
        if (!this.token || !this.token.trim()) {
            if (redirect) window.location.href = import.meta.env.VITE_AUTH_URL;
            return false;
        }

        const verifyToken = await this.isTokenValid();
        if (!verifyToken) {
            if (redirect) window.location.href = import.meta.env.VITE_AUTH_URL;
        }
        return verifyToken;
    }

    public setToken(newToken: string) {
        this.token = newToken;
        this.setCookie('token', newToken);
    }

    public setCookie(key: string, value: string, maxAge?: number) {
        const cookie = new Cookies();

        if (!maxAge) {
            maxAge = 30 * 24 * 3600;
        }

        cookie.set(key, value, {
            path: '/',
            maxAge,
            domain: this.COOKIE_DOMAIN,
        });
    }

    public deleteCookie(key: string) {
        const cookie = new Cookies();
        cookie.remove(key);
    }

    private header(
        contentType: string = 'application/json'
    ): Record<string, any> {
        if (!this.token || !this.token.trim()) return {};

        return {
            Authorization: `Bearer ${this.token}`,
            'content-type': contentType,
        };
    }

    private handleError(error: any): APIErrorObject {
        if (error instanceof AxiosError) {
            let msg = error.message;
            let typeError = 'Error';
            let metadata: Record<string, any> | undefined;
            const { response } = error;
            if (response) {
                if (
                    response.data !== undefined &&
                    response.status >= 400 &&
                    response.status < 500
                ) {
                    msg = response.data.error.message;
                    typeError = response.data.error.name;
                    metadata = response.data.error.details;
                }
            }
            return new APIErrorObject(typeError, msg, metadata);
        }
        return new APIErrorObject();
    }

    private async nonBodyRequest(
        fn: Function,
        path: string,
        query: Record<string, any> = {}
    ) {
        try {
            const response = await fn(`${this.API_URL}${path}`, {
                params: query,
                headers: this.header(),
            });
            return response.data;
        } catch (err: any) {
            return this.handleError(err);
        }
    }

    private async formBodyRequest(
        fn: Function,
        path: string,
        body: Record<string, any> = {},
        files: FileList = new FileList(),
        filePath: string = 'files'
    ) {
        const formData = new FormData();
        Object.keys(body).forEach((key) => formData.append(key, body[key]));
        for (let i = 0; i < files.length; i++) {
            const file = files.item(i);
            if (file) {
                formData.append(filePath, file, file.name);
            }
        }
        try {
            const response = await fn(`${this.API_URL}${path}`, formData, {
                headers: this.header('multipart/form-data'),
            });
            return response.data;
        } catch (err: any) {
            return this.handleError(err);
        }
    }

    private async bodyRequest(
        fn: Function,
        path: string,
        body: Record<string, any> = {}
    ) {
        try {
            const response = await fn(`${this.API_URL}${path}`, body, {
                headers: this.header(),
            });
            return response.data;
        } catch (err: any) {
            return this.handleError(err);
        }
    }

    public async GET(path: string, query: Record<string, any> = {}) {
        return await this.nonBodyRequest(Axios.get, path, query);
    }

    public async POST(path: string, body: Record<string, any> = {}) {
        return await this.bodyRequest(Axios.post, path, body);
    }

    public async PATCH(path: string, body: Record<string, any> = {}) {
        return await this.bodyRequest(Axios.patch, path, body);
    }

    public async PUT(path: string, body: Record<string, any> = {}) {
        return await this.bodyRequest(Axios.put, path, body);
    }

    public async DELETE(path: string, query: Record<string, any> = {}) {
        return await this.nonBodyRequest(Axios.delete, path, query);
    }

    public async POST_FORM(
        path: string,
        body: Record<string, any> = {},
        files: FileList = new FileList(),
        filePath: string = 'files'
    ) {
        return await this.formBodyRequest(
            Axios.post,
            path,
            body,
            files,
            filePath
        );
    }
}

const client = new APIClient();
export default client;
