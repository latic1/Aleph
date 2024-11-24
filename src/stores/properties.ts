import { defineStore } from 'pinia';
import type { IProperties } from '@/types';
import axiosClient from '@/axios';

export const usePropertiesStore = defineStore('propertiesStore', {
    state: () => ({
        properties: [] as IProperties[], // Array to hold properties
    }),

    getters: {
        // Get a property by its ID
        getPropertyById: (state) => {
            return (id: string): IProperties | undefined =>
                state.properties.find((property) => property.id === id);
        },
    },

    actions: {
        // Fetch properties with optional filters
        async getProperties(filters: {
            query?: string;
            location?: string;
            type?: string;
            price_min?: number;
            price_max?: number;
        }) {
            try {
                // Log the filters for debugging
                console.log("Filters received in store:", filters);
        
                // Send the filters as query parameters
                const response = await axiosClient.get('/upload/search', { params: filters });
        
                // Ensure response structure is as expected
                if (response.data?.data?.uploads) {
                    this.properties = response.data.data.uploads;
                    console.log('Fetched properties:', response.data);
                } else {
                    console.error('Unexpected API response:', response.data);
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        },
        

        // Create a new property
        async createProperty(formData: FormData) {
            try {
                const response = await axiosClient.post('/upload', formData);
                this.properties.push(response.data);
                console.log('Property created:', response.data);
            } catch (error) {
                console.error('Error creating property:', error);
            }
        },

        // Edit an existing property
        async editProperty(formData: FormData, id: string) {
            try {
                const response = await axiosClient.put(`/upload/${id}`, formData);
                // Update the property in the state
                const index = this.properties.findIndex((prop) => prop.id === id);
                if (index !== -1) {
                    this.properties[index] = response.data;
                }
                console.log('Property updated:', response.data);
            } catch (error) {
                console.error('Error editing property:', error);
            }
        },

        // Delete a property by ID
        async deleteProperty(id: string) {
            try {
                await axiosClient.delete(`/upload/${id}`);
                // Remove the property from the state
                this.properties = this.properties.filter((prop) => prop.id !== id);
                console.log('Property deleted successfully.');
            } catch (error) {
                console.error('Error deleting property:', error);
            }
        },
    },
});
