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
        return localStorage.getItem('token') !== null && localStorage.getItem('token') !== "";
    }

    async refreshToken(): Promise<string> {
        return api.post("/auth/refresh", {}, { headers: { "Authorization": this.getToken() } })
            .then(response => {
                return response.data;
            })
    }
}