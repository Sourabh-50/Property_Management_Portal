// API Connectors for different property systems
const apiConnectors = {
    // DORIS (Department of Registration and Stamps) API connector
    doris: {
        search: async (params) => {
            await new Promise(resolve => setTimeout(resolve, 500));
            return {
                success: true,
                data: [
                    {
                        propertyId: params.propertyId ? params.propertyId : 'DORIS-123456',
                        ownerName: params.ownerName || 'Rajesh Kumar',
                        address: params.address || 'Plot No. 45, Sector 12, Navi Mumbai, Maharashtra',
                        registrationNumber: 'MH/2021/123456',
                        registrationDate: '2021-05-15',
                        area: '1200 sq.ft',
                        propertyType: params.propertyType || 'urban',
                        encumbrance: 'None',
                        source: 'DORIS',
                        ownershipHistory: [
                            { owner: 'Rajesh Kumar', from: '2021-05-15', to: 'present' },
                            { owner: 'Sunita Patel', from: '2015-08-20', to: '2021-05-14' }
                        ]
                    }
                ]
            };
        }
    },
    // DLR (Department of Land Records) API connector
    dlr: {
        search: async (params) => {
            await new Promise(resolve => setTimeout(resolve, 600));
            return {
                success: true,
                data: [
                    {
                        propertyId: params.propertyId ? params.propertyId : 'DLR-789012',
                        ownerName: params.ownerName || 'Vijay Singh',
                        address: params.address || 'Farm No. 78, Village Rampur, District Aligarh, Uttar Pradesh',
                        registrationNumber: 'UP/2018/789012',
                        registrationDate: '2018-11-30',
                        area: '2.5 acres',
                        propertyType: params.propertyType || 'rural',
                        encumbrance: 'Mortgage with State Bank of India',
                        source: 'DLR',
                        ownershipHistory: [
                            { owner: 'Vijay Singh', from: '2018-11-30', to: 'present' },
                            { owner: 'Government of UP', from: '1950-01-01', to: '2018-11-29' }
                        ]
                    }
                ]
            };
        }
    },
    // CERSAI (Central Registry of Securitization Asset Reconstruction and Security Interest) API connector
    cersai: {
        search: async (params) => {
            await new Promise(resolve => setTimeout(resolve, 700));
            return {
                success: true,
                data: [
                    {
                        propertyId: params.propertyId ? params.propertyId : 'CR-345678',
                        ownerName: params.ownerName || 'Tech Solutions Pvt Ltd',
                        address: params.address || 'Industrial Area, Whitefield, Bangalore, Karnataka',
                        registrationNumber: 'KA/2019/345678',
                        registrationDate: '2019-07-22',
                        area: '5000 sq.ft',
                        propertyType: params.propertyType || 'industrial',
                        encumbrance: 'Lease agreement with ABC Manufacturers',
                        source: 'CERSAI',
                        ownershipHistory: [
                            { owner: 'Tech Solutions Pvt Ltd', from: '2019-07-22', to: 'present' },
                            { owner: 'Bangalore Development Authority', from: '2005-03-10', to: '2019-07-21' }
                        ]
                    }
                ]
            };
        }
    },
    // MCA21 (Ministry of Corporate Affairs) API connector
    mca21: {
        search: async (params) => {
            await new Promise(resolve => setTimeout(resolve, 800));
            return {
                success: true,
                data: [
                    {
                        propertyId: params.propertyId ? params.propertyId : 'MCA-901234',
                        ownerName: params.ownerName || 'Corporate Entity Ltd.',
                        address: params.address || 'Registered Office Address',
                        registrationNumber: 'DL/2020/901234',
                        registrationDate: '2020-01-10',
                        area: 'Corporate Asset',
                        propertyType: params.propertyType || 'industrial',
                        encumbrance: 'Corporate Charge',
                        source: 'MCA21',
                        ownershipHistory: [
                            { owner: 'Corporate Entity Ltd.', from: '2020-01-10', to: 'present' },
                            { owner: 'Previous Owner Inc.', from: '2010-05-15', to: '2020-01-09' }
                        ]
                    }
                ]
            };
        }
    }
};

// Unified API service
const propertySearchService = {
    normalizeSearchParams: (params) => {
        return {
            identifier: params.propertyId,
            name: params.ownerName,
            location: params.address,
            docNumber: params.registrationNumber,
            type: params.propertyType,
            region: params.state,
        };
    },
    
    normalizeResponse: (data, source) => {
        return data.map(item => {
            const commonItem = {
                id: item.propertyId,
                source: source,
                ownerName: item.ownerName,
                address: item.address,
                registrationNumber: item.registrationNumber,
                registrationDate: item.registrationDate,
                area: item.area,
                propertyType: item.propertyType,
                encumbrance: item.encumbrance,
                ownershipHistory: item.ownershipHistory || []
            };
            return commonItem;
        });
    },
    
    searchAll: async (params) => {
        try {
            const normalizedParams = propertySearchService.normalizeSearchParams(params);
            const [dorisResults, dlrResults, cersaiResults, mcaResults] = await Promise.all([
                apiConnectors.doris.search(normalizedParams),
                apiConnectors.dlr.search(normalizedParams),
                apiConnectors.cersai.search(normalizedParams),
                apiConnectors.mca21.search(normalizedParams)
            ]);
            
            const allResults = [
                ...propertySearchService.normalizeResponse(dorisResults.data, 'DORIS'),
                ...propertySearchService.normalizeResponse(dlrResults.data, 'DLR'),
                ...propertySearchService.normalizeResponse(cersaiResults.data, 'CERSAI'),
                ...propertySearchService.normalizeResponse(mcaResults.data, 'MCA21')
            ];
            
            return allResults.filter(property => {
                let match = true;
                if (params.propertyId && !property.id.includes(params.propertyId)) match = false;
                if (params.ownerName && !property.ownerName.toLowerCase().includes(params.ownerName.toLowerCase())) match = false;
                if (params.address && !property.address.toLowerCase().includes(params.address.toLowerCase())) match = false;
                if (params.registrationNumber && !property.registrationNumber.includes(params.registrationNumber)) match = false;
                if (params.propertyType && property.propertyType !== params.propertyType) match = false;
                if (params.state) {
                    const stateCode = property.registrationNumber.split('/')[0];
                    if (stateCode !== params.state) match = false;
                }
                return match;
            });
        } catch (error) {
            console.error('Error in property search:', error);
            return [];
        }
    }
};

// Property Service for handling property-related operations
const PropertyService = {
    // Cache for property data
    _propertyData: null,

    // Initialize and load property data
    async init() {
        try {
            const response = await fetch('property_data.json');
            this._propertyData = await response.json();
            return true;
        } catch (error) {
            console.error('Failed to initialize PropertyService:', error);
            return false;
        }
    },

    // Search properties based on criteria
    async searchProperties(query) {
        if (!this._propertyData) {
            await this.init();
        }

        const searchTerms = query.toLowerCase().split(' ');
        
        return this._propertyData.filter(property => {
            const propertyString = JSON.stringify(property).toLowerCase();
            return searchTerms.every(term => 
                term.length > 2 && propertyString.includes(term)
            );
        });
    },

    // Get property details by ID
    async getPropertyDetails(propertyId) {
        if (!this._propertyData) {
            await this.init();
        }

        return this._propertyData.find(
            property => property.property_id === propertyId
        );
    },

    // Get unique states from property data
    async getStates() {
        if (!this._propertyData) {
            await this.init();
        }

        return [...new Set(
            this._propertyData.map(property => 
                property.address.state
            )
        )];
    },

    // Get districts for a state
    async getDistricts(state) {
        if (!this._propertyData) {
            await this.init();
        }

        return [...new Set(
            this._propertyData
                .filter(property => 
                    property.address.state === state
                )
                .map(property => 
                    property.address.district
                )
        )];
    },

    // Get talukas for a district
    async getTalukas(district) {
        if (!this._propertyData) {
            await this.init();
        }

        return [...new Set(
            this._propertyData
                .filter(property => 
                    property.address.district === district
                )
                .map(property => 
                    property.address.taluka
                )
        )];
    },

    // Get villages for a taluka
    async getVillages(taluka) {
        if (!this._propertyData) {
            await this.init();
        }

        return [...new Set(
            this._propertyData
                .filter(property => 
                    property.address.taluka === taluka
                )
                .map(property => 
                    property.address.village
                )
        )];
    },

    // Search properties by location
    async searchByLocation(state, district, taluka, village) {
        if (!this._propertyData) {
            await this.init();
        }

        return this._propertyData.filter(property => {
            const address = property.address;
            return (!state || address.state === state) &&
                   (!district || address.district === district) &&
                   (!taluka || address.taluka === taluka) &&
                   (!village || address.village === village);
        });
    },

    // Search properties by owner name
    async searchByOwner(ownerName) {
        if (!this._propertyData) {
            await this.init();
        }

        const searchName = ownerName.toLowerCase();
        return this._propertyData.filter(property =>
            property.owner_details.some(owner =>
                owner.name.toLowerCase().includes(searchName)
            )
        );
    },

    // Search properties by survey number
    async searchBySurveyNumber(surveyNumber) {
        if (!this._propertyData) {
            await this.init();
        }

        return this._propertyData.filter(property =>
            property.survey_number === surveyNumber
        );
    },

    // Get property types
    async getPropertyTypes() {
        if (!this._propertyData) {
            await this.init();
        }

        return [...new Set(
            this._propertyData.map(property => 
                property.property_type
            )
        )];
    },

    // Search properties by type
    async searchByType(propertyType) {
        if (!this._propertyData) {
            await this.init();
        }

        return this._propertyData.filter(property =>
            property.property_type === propertyType
        );
    },

    // Check if property has any legal cases
    async checkLegalStatus(propertyId) {
        if (!this._propertyData) {
            await this.init();
        }

        const property = await this.getPropertyDetails(propertyId);
        return property ? property.legal_case : null;
    },

    // Check if property has any loans
    async checkLoanStatus(propertyId) {
        if (!this._propertyData) {
            await this.init();
        }

        const property = await this.getPropertyDetails(propertyId);
        return property ? property.loan_status : null;
    }
}; 