import { defineStore } from 'pinia';
import { type CreateUserParams, type LoginResponseType, type User, type UserLogin, type UserParams } from '../types';
import axios, { type AxiosError, type AxiosResponse } from 'axios';
import router from '@/router';
import axiosClient from '@/axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authUser: {
            user: null as UserParams | null,
            token: sessionStorage.getItem('TOKEN') || null,
        },
        error: '' as string | null,
    }),

    getters: {
        user: (state) => state.authUser.user,
        token: (state) => state.authUser.token,
        authError: (state) => state.error,
        isAuthenticated: (state) => !!state.authUser.token,
    },

    actions: {
        async getUser() {
            try {
                const response = await axiosClient.get('/users/me');
                this.authUser.user = response.data;
            } catch (error) {
                console.error('Error fetching user:', error);
                this.error = 'Failed to fetch user data.';
            }
        },

        async handleLogin(data: UserLogin) {
            try {
                const response: AxiosResponse<LoginResponseType> = await axiosClient.post('/auth/login', {
                    email: data.email,
                    password: data.password,
                });

                if (!response.data.error) {
                    const { message, token } = response.data.data;

                    if (token) {
                        this.authUser.token = token;
                        localStorage.setItem('TOKEN', token);
                        router.push("/admin/dashboard");
                    }

                    return message || "Login successful";
                }

            } catch (err) {

                const error = err as Error | AxiosError;
                if (axios.isAxiosError(error)) {
                    return error.response?.data.data.message
                } else {
                    // Handle non-Axios errors
                    console.error('Error logging in:', error.message);
                }

            }
        },

        async handleRegister(data: CreateUserParams) {
            try {
                const response: AxiosResponse<UserParams> = await axiosClient.post('/users/', data);
                // this.authUser.user = response.data.user;
                this.authUser.token = response.data.token;
                sessionStorage.setItem('TOKEN', response.data.token);
                router.push("/");
            } catch (err) {
                const error = err as Error | AxiosError;
                if (axios.isAxiosError(error)) {
                    console.error('Error registering user:', error.response?.data);
                    this.error = error.response?.data?.message || 'Error registering user.';
                } else {
                    console.error('Error registering user:', error.message);
                    this.error = 'An unexpected error occurred.';
                }
            }
        },

        async handleLogout() {
            try {

                this.authUser.user = null;
                this.authUser.token = null;
                localStorage.removeItem('TOKEN');
                router.push("/auth/login");
            } catch (err) {
                const error = err as Error | AxiosError;
                if (axios.isAxiosError(error)) {
                    console.error('Error logging out:', error.response?.data);
                } else {
                    console.error('Error logging out:', error.message);
                }
            }
        },

        async handleForgotPassword(email: string) {
            try {
                await axiosClient.post('/users/forgot-password', { email });
            } catch (error) {
                console.error('Error sending reset link:', error);
                throw error; // Rethrow error to handle it in the component
            }
        }

    }
});
