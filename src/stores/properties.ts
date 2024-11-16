// stores/usePropertiesStore.ts
import { defineStore } from 'pinia';
import type { IProperties } from '@/types';
import axiosClient from '@/axios';

export const usePropertiesStore = defineStore('propertiesStore', {
    state: () => ({
        properties: [] as IProperties[],
    }),
    getters: {
        getPropertyById: (state) => {
            return (id: string): IProperties | undefined =>
                state.properties.find((property) => property.id === id);
        },
    },
    actions: {
        async getProperties() {
            try {
                const response = await axiosClient.get('/upload/search');
                this.properties = response.data.data.uploads;
                console.log('Fetched properties:', response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        },

        async createProperty(formData: FormData) {
            try {
                const response = await axiosClient.post('/upload', formData);
                this.properties.push(response.data);
                console.log('Property created:', response.data);
            } catch (error) {
                console.error('Error creating property:', error);
            }
        },
        async editProperty(formData: FormData, id: string) {
            try {
                const response = await axiosClient.put(`/upload/${id}`, formData);
                this.properties.push(response.data);
                console.log('Property created:', response.data);
            } catch (error) {
                console.error('Error creating property:', error);
            }
        },
        async deleteProperty(id: string) {
            try {
                const response = await axiosClient.delete(`/upload/${id}`,);
                console.log('Property Deleted:', response.data);
            } catch (error) {
                console.error('Error deleting property:', error);
            }
        }
    },
});
