// stores/usePropertiesStore.ts
import { defineStore } from 'pinia';
import Properties from '@/stores/property.json';
import type { PropertiesProp } from '@/types';
import axiosClient from '@/axios';

export const usePropertiesStore = defineStore('propertiesStore', {
    state: () => ({
        properties: Properties as PropertiesProp[],
    }),
    getters: {
        getPropertyById: (state) => {
            return (id: number): PropertiesProp | undefined =>
                state.properties.find((property) => property.id === id);
        },
    },
    actions: {

        async getProperties() {
            try {
                const response = await axiosClient.get('/upload/search');
                this.properties = response.data
                console.log(response.data);

            } catch (error) {

            }
        },

        // Inside your properties store
        async createProperty(formData: FormData) {
            try {
                const response = await axiosClient.post('/upload', formData);
                this.properties.push(response.data);
            } catch (error) {
                console.error('Error creating property:', error);
            }
        }

    },
});
