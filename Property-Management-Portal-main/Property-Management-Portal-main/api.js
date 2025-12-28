// API Handler for Property Registry
const API = {
    // Get all properties with optional filters
    async getProperties(filters = {}) {
        try {
            const properties = window.propertyData.properties;
            
            return properties.filter(property => {
                let matches = true;
                
                // Apply filters
                if (filters.owner_name) {
                    matches = matches && property.basic_info.owner_name.toLowerCase()
                        .includes(filters.owner_name.toLowerCase());
                }
                
                if (filters.property_type) {
                    matches = matches && property.basic_info.property_type === filters.property_type;
                }
                
                if (filters.type) {
                    matches = matches && property.type === filters.type;
                }
                
                if (filters.city) {
                    matches = matches && property.basic_info.address.city.toLowerCase()
                        .includes(filters.city.toLowerCase());
                }
                
                if (filters.pincode) {
                    matches = matches && property.basic_info.address.pincode === filters.pincode;
                }
                
                return matches;
            });
        } catch (error) {
            console.error('Error fetching properties:', error);
            return [];
        }
    },

    // Get property by ID
    async getPropertyById(propertyId) {
        try {
            const properties = window.propertyData.properties;
            return properties.find(property => property.property_id === propertyId) || null;
        } catch (error) {
            console.error('Error fetching property:', error);
            return null;
        }
    },

    // Get ownership history
    async getPropertyHistory(propertyId) {
        try {
            const property = await this.getPropertyById(propertyId);
            return property ? property.ownership_history : [];
        } catch (error) {
            console.error('Error fetching property history:', error);
            return [];
        }
    },

    // Get encumbrances
    async getPropertyEncumbrances(propertyId) {
        try {
            const property = await this.getPropertyById(propertyId);
            return property ? property.encumbrances : [];
        } catch (error) {
            console.error('Error fetching encumbrances:', error);
            return [];
        }
    },

    // Advanced search with multiple parameters
    async searchProperties(params = {}) {
        try {
            const properties = window.propertyData.properties;
            
            return properties.filter(property => {
                let matches = true;
                
                // Advanced search criteria
                if (params.min_value) {
                    matches = matches && property.basic_info.market_value >= params.min_value;
                }
                
                if (params.max_value) {
                    matches = matches && property.basic_info.market_value <= params.max_value;
                }
                
                if (params.registration_date_from) {
                    matches = matches && new Date(property.basic_info.registration_date) >= new Date(params.registration_date_from);
                }
                
                if (params.registration_date_to) {
                    matches = matches && new Date(property.basic_info.registration_date) <= new Date(params.registration_date_to);
                }
                
                if (params.verified) {
                    matches = matches && property.verification_status.is_verified === true;
                }
                
                return matches;
            });
        } catch (error) {
            console.error('Error in advanced search:', error);
            return [];
        }
    }
};

// Example usage functions
const PropertyService = {
    // Search properties
    async searchProperties(searchParams) {
        const results = await API.getProperties(searchParams);
        return {
            success: true,
            data: results,
            metadata: {
                total: results.length,
                page: 1,
                per_page: results.length
            }
        };
    },

    // Get property details
    async getPropertyDetails(propertyId) {
        const property = await API.getPropertyById(propertyId);
        if (!property) {
            return {
                success: false,
                data: null,
                error: {
                    code: 'PROPERTY_NOT_FOUND',
                    message: `Property with ID ${propertyId} not found`
                }
            };
        }
        return {
            success: true,
            data: property
        };
    },

    // Get property history
    async getPropertyHistory(propertyId) {
        const history = await API.getPropertyHistory(propertyId);
        return {
            success: true,
            data: history
        };
    }
};

// Initialize data when the script loads
document.addEventListener('DOMContentLoaded', () => {
    // Load the JSON data
    fetch('geo_land_registry_mock_data.json')
        .then(response => response.json())
        .then(data => {
            window.propertyData = data;
            console.log('Property data loaded successfully');
        })
        .catch(error => {
            console.error('Error loading property data:', error);
        });
}); 