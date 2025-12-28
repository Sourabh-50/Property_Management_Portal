class PropertySearch {
    constructor() {
        this.properties = [];
        this.searchResults = [];
        this.propertyTypes = new Set();
        this.cities = new Set();
        this.init();
    }

    async init() {
        try {
            const response = await fetch('database.json');
            const data = await response.json();
            this.properties = data.properties;
            this.extractMetadata();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error initializing property search:', error);
        }
    }

    extractMetadata() {
        this.properties.forEach(property => {
            this.propertyTypes.add(property.propertyDetails.propertyType);
            this.cities.add(property.propertyDetails.address.city);
        });
    }

    setupEventListeners() {
        const searchForm = document.getElementById('searchForm');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSearch();
            });
        }

        this.populateDropdowns();
    }

    populateDropdowns() {
        const propertyTypeSelect = document.getElementById('propertyType');
        const citySelect = document.getElementById('city');

        if (propertyTypeSelect) {
            propertyTypeSelect.innerHTML = '<option value="">All Types</option>';
            this.propertyTypes.forEach(type => {
                propertyTypeSelect.innerHTML += `<option value="${type}">${type}</option>`;
            });
        }

        if (citySelect) {
            citySelect.innerHTML = '<option value="">All Cities</option>';
            this.cities.forEach(city => {
                citySelect.innerHTML += `<option value="${city}">${city}</option>`;
            });
        }
    }

    handleSearch() {
        const propertyId = document.getElementById('propertyId').value;
        const ownerName = document.getElementById('ownerName').value;
        const propertyType = document.getElementById('propertyType').value;
        const city = document.getElementById('city').value;
        const minArea = document.getElementById('minArea').value;
        const maxArea = document.getElementById('maxArea').value;

        this.searchResults = this.properties.filter(property => {
            let matches = true;

            if (propertyId && !property.propertyId.toLowerCase().includes(propertyId.toLowerCase())) {
                matches = false;
            }

            if (ownerName && !property.owner.fullName.toLowerCase().includes(ownerName.toLowerCase())) {
                matches = false;
            }

            if (propertyType && property.propertyDetails.propertyType !== propertyType) {
                matches = false;
            }

            if (city && property.propertyDetails.address.city !== city) {
                matches = false;
            }

            if (minArea && property.propertyDetails.area < parseInt(minArea)) {
                matches = false;
            }

            if (maxArea && property.propertyDetails.area > parseInt(maxArea)) {
                matches = false;
            }

            return matches;
        });

        this.displayResults();
    }

    displayResults() {
        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) return;

        if (this.searchResults.length === 0) {
            resultsContainer.innerHTML = '<p class="no-results">No properties found matching your criteria.</p>';
            return;
        }

        let resultsHTML = '<div class="property-grid">';
        this.searchResults.forEach(property => {
            resultsHTML += `
                <div class="property-card">
                    <div class="property-details">
                        <h3>${property.propertyDetails.propertyType} Property</h3>
                        <p class="property-id">ID: ${property.propertyId}</p>
                        <p class="owner-name">Owner: ${property.owner.fullName}</p>
                        <p class="property-location">
                            ${property.propertyDetails.address.fullAddress}<br>
                            ${property.propertyDetails.address.city}, ${property.propertyDetails.address.state}
                        </p>
                        <p class="property-area">Area: ${property.propertyDetails.area} sq ft</p>
                        <div class="property-status ${property.verificationStatus.toLowerCase()}">
                            ${property.verificationStatus}
                        </div>
                        <button class="view-details" onclick="propertySearch.showPropertyDetails('${property.propertyId}')">
                            View Details
                        </button>
                    </div>
                </div>
            `;
        });
        resultsHTML += '</div>';
        resultsContainer.innerHTML = resultsHTML;
    }

    showPropertyDetails(propertyId) {
        const property = this.properties.find(p => p.propertyId === propertyId);
        if (!property) return;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${property.propertyDetails.propertyType} Property Details</h2>
                <div class="property-info">
                    <div class="info-section">
                        <h3>Property Information</h3>
                        <p><strong>Property ID:</strong> ${property.propertyId}</p>
                        <p><strong>Type:</strong> ${property.propertyDetails.propertyType}</p>
                        <p><strong>Area:</strong> ${property.propertyDetails.area} sq ft</p>
                        <p><strong>Verification Status:</strong> ${property.verificationStatus}</p>
                        <p><strong>Registration Date:</strong> ${property.registrationDate}</p>
                    </div>
                    
                    <div class="info-section">
                        <h3>Owner Information</h3>
                        <p><strong>Name:</strong> ${property.owner.fullName}</p>
                        <p><strong>Contact:</strong> ${property.owner.contactNumber}</p>
                        <p><strong>Email:</strong> ${property.owner.emailAddress}</p>
                        <p><strong>ID Proof:</strong> ${property.owner.idProofType}</p>
                    </div>

                    <div class="info-section">
                        <h3>Address</h3>
                        <p>${property.propertyDetails.address.fullAddress}</p>
                        <p>${property.propertyDetails.address.city}, ${property.propertyDetails.address.state}</p>
                        <p>PIN: ${property.propertyDetails.address.pinCode}</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.onclick = () => {
            document.body.removeChild(modal);
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                document.body.removeChild(modal);
            }
        };
    }

    sortResults(criteria) {
        switch (criteria) {
            case 'price-low-high':
                this.searchResults.sort((a, b) => a.marketValue - b.marketValue);
                break;
            case 'price-high-low':
                this.searchResults.sort((a, b) => b.marketValue - a.marketValue);
                break;
            case 'newest':
                this.searchResults.sort((a, b) => {
                    const dateA = new Date(a.history[0].date);
                    const dateB = new Date(b.history[0].date);
                    return dateB - dateA;
                });
                break;
        }
        this.displayResults();
    }
}

// Initialize the property search
const propertySearch = new PropertySearch(); 