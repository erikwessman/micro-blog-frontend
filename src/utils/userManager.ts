import React from "react";
import { api } from "@/api";

export default class TokenManager extends React.Component {
    constructor() {
        super({});
    }

    updateToken(token: string): void {
        localStorage.setItem('token', token);
    }

    removeToken(): void {
        localStorage.removeItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    hasToken(): boolean {
        return localStorage.getItem('token') !== undefined;
    }

    async isTokenValid(): Promise<boolean> {
        return api.get("/authorization/valid", { headers: { "Authorization": this.getToken() } })
            .then(response => {
                if (response.status === 200) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch(() => {
                return false;
            })
    }
}