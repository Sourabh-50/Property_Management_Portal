// PropertyRegistry.js
export class PropertyRegistry {
    constructor() {
        this.properties = [];
        this.initialized = false;
    }
    
    async initialize() {
        if (this.initialized) return;
        
        try {
            const response = await fetch('database.json');
            const data = await response.json();
            this.properties = data.properties;
            this.initialized = true;
        } catch (error) {
            console.error('Failed to initialize PropertyRegistry:', error);
            throw new Error('Failed to load property database');
        }
    }
    
    async searchProperties(criteria) {
        await this.ensureInitialized();
        
        return this.properties.filter(property => {
            let matches = true;

            // Search by property ID (primary key)
            if (criteria.propertyId && 
                !property.propertyId.toLowerCase().includes(criteria.propertyId.toLowerCase())) {
                matches = false;
            }

            // Search by owner name
            if (criteria.ownerName && 
                !property.owner.fullName.toLowerCase().includes(criteria.ownerName.toLowerCase())) {
                matches = false;
            }

            // Search by property type
            if (criteria.propertyType && 
                property.propertyDetails.propertyType !== criteria.propertyType) {
                matches = false;
            }

            // Search by city
            if (criteria.city && 
                !property.propertyDetails.address.city.toLowerCase().includes(criteria.city.toLowerCase())) {
                matches = false;
            }

            // Search by area range
            if (criteria.minArea && 
                property.propertyDetails.area < parseFloat(criteria.minArea)) {
                matches = false;
            }
            if (criteria.maxArea && 
                property.propertyDetails.area > parseFloat(criteria.maxArea)) {
                matches = false;
            }

            return matches;
        });
    }
    
    async getPropertyDetails(propertyId) {
        await this.ensureInitialized();
        
        const property = this.properties.find(p => p.propertyId === propertyId);
        if (!property) {
            throw new Error('Property not found');
        }
        return property;
    }
    
    async getPropertyHistory(propertyId) {
        await this.ensureInitialized();
        
        const property = await this.getPropertyDetails(propertyId);
        return property.history || [];
    }
    
    async verifyProperty(propertyId) {
        await this.ensureInitialized();
        
        const property = await this.getPropertyDetails(propertyId);
        return {
            isVerified: property.verificationStatus === 'VERIFIED',
            verificationDate: property.lastVerified,
            verifiedBy: property.verifiedBy
        };
    }
    
    async ensureInitialized() {
        if (!this.initialized) {
            await this.initialize();
        }
    }
    
    // Utility methods
    async getStatistics() {
        await this.ensureInitialized();
        
        const totalProperties = this.properties.length;
        const verifiedProperties = this.properties.filter(p => 
            p.verificationStatus === 'Verified'
        ).length;
        const totalArea = this.properties.reduce((sum, p) => 
            sum + p.propertyDetails.area, 0
        );

        return {
            totalProperties,
            verifiedProperties,
            totalArea
        };
    }
    
    getPropertyTypes() {
        const types = new Set(
            this.properties.map(p => p.propertyDetails.propertyType)
        );
        return Array.from(types).sort();
    }
    
    getCities() {
        const cities = new Set(
            this.properties.map(p => p.propertyDetails.address.city)
        );
        return Array.from(cities).sort();
    }
} 