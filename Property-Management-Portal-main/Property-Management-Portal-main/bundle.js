// Property Search AI Chat Assistant Bundle
(function() {
    // Property Service Implementation
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

    // Property Chatbot Implementation
    class PropertyChatbot {
        constructor() {
            this.messages = [];
            this.state = 'IDLE';
            this.context = {};
            this.setupElements();
            this.setupEventListeners();
            this.greetUser();
        }

        setupElements() {
            this.chatbotContainer = document.getElementById('chatbotContainer');
            this.chatbotMessages = document.getElementById('chatbotMessages');
            this.chatbotInput = document.getElementById('chatbotInput');
            this.chatbotSend = document.getElementById('chatbotSend');
            this.chatbotToggle = document.getElementById('chatbotToggle');
            this.closeChatbot = document.getElementById('closeChatbot');
        }

        setupEventListeners() {
            this.chatbotSend.addEventListener('click', () => this.handleUserInput());
            this.chatbotInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleUserInput();
            });
            
            this.chatbotToggle.addEventListener('click', () => this.toggleChatbot());
            this.closeChatbot.addEventListener('click', () => this.hideChatbot());
        }

        toggleChatbot() {
            this.chatbotContainer.classList.toggle('visible');
            if (this.chatbotContainer.classList.contains('visible')) {
                this.chatbotInput.focus();
            }
        }

        showChatbot() {
            this.chatbotContainer.classList.add('visible');
            this.chatbotInput.focus();
        }

        hideChatbot() {
            this.chatbotContainer.classList.remove('visible');
        }

        handleUserInput() {
            const userMessage = this.chatbotInput.value.trim();
            
            if (userMessage) {
                this.addMessage(userMessage, 'user');
                this.chatbotInput.value = '';
                this.processUserMessage(userMessage);
            }
        }

        processUserMessage(message) {
            message = message.toLowerCase();
            
            // Simple intent recognition
            if (message.includes('search') || message.includes('find') || message.includes('look for')) {
                this.handleSearchIntent(message);
            } 
            else if (message.includes('help') || message.includes('support')) {
                this.showHelp();
            }
            else if (message.includes('hello') || message.includes('hi')) {
                this.greetUser();
            }
            else if (message.includes('thank')) {
                this.addMessage("You're welcome! Is there anything else I can help you with?", 'bot');
            }
            else {
                this.addMessage("I'm not sure I understand. You can ask me to search for properties or type 'help' for assistance or contact us : 12345678890 , abc@gmail.com", 'bot');
            }
        }

        handleSearchIntent(message) {
            const params = {};
            
            // Extract search parameters from natural language
            const idMatch = message.match(/(property\s?id|id)\s?:?\s?([a-z0-9-]+)/i);
            if (idMatch) params.propertyId = idMatch[2];
            
            const nameMatch = message.match(/(owner|name)\s?:?\s?([a-z\s]+)/i);
            if (nameMatch) params.ownerName = nameMatch[2];
            
            const addressMatch = message.match(/(at|address|location)\s?:?\s?([a-z0-9\s,]+)/i);
            if (addressMatch) params.address = addressMatch[2];
            
            const typeMatch = message.match(/(type|kind)\s?:?\s?(urban|rural|commercial|industrial)/i);
            if (typeMatch) params.propertyType = typeMatch[2];
            
            const stateMatch = message.match(/(in|state)\s?:?\s?(mh|up|dl|ka|tn)/i);
            if (stateMatch) params.state = stateMatch[2].toUpperCase();
            
            if (Object.keys(params).length > 0) {
                this.performPropertySearch(params);
            } else {
                this.addMessage("What property details would you like to search for? You can specify by ID, owner name, address, type, or state.", 'bot');
                this.state = 'ASKING_SEARCH_DETAILS';
            }
        }

        async performPropertySearch(params) {
            this.addMessage("Searching for properties...", 'bot');
            
            try {
                const results = await propertySearchService.searchAll(params);
                
                if (results.length > 0) {
                    this.addMessage(`I found ${results.length} properties matching your criteria:`, 'bot');
                    
                    // Show top 3 results
                    results.slice(0, 3).forEach(property => {
                        this.addMessage(
                            `• ${property.ownerName} (${property.id}) - ${property.address}`,
                            'bot'
                        );
                    });
                    
                    if (results.length > 3) {
                        this.addMessage(`...and ${results.length - 3} more properties.`, 'bot');
                    }
                    
                    this.addMessage("You can view all results in the main search panel.", 'bot');
                } else {
                    this.addMessage("No properties found matching your search criteria.", 'bot');
                    this.addMessage("Try adjusting your search parameters or check for typos.", 'bot');
                }
            } catch (error) {
                this.addMessage("Sorry, I encountered an error while searching. Please try again later.", 'bot');
                console.error("Chatbot search error:", error);
            }
        }

        showHelp() {
            this.addMessage("I can help you with:", 'bot');
            this.addMessage("- Searching for properties by ID, owner name, address, etc.", 'bot');
            this.addMessage("- Finding property details like registration information", 'bot');
            this.addMessage("- Checking property encumbrances", 'bot');
            this.addMessage('Try saying:', 'bot');
            this.addMessage('• "Search for properties in Maharashtra"', 'bot');
            this.addMessage('• "Find property ID ABC123"', 'bot');
            this.addMessage('• "Look for commercial properties in Bangalore"', 'bot');
        }

        greetUser() {
            this.addMessage("Hello! I'm your Property Search Assistant. How can I help you today?", 'bot');
            this.addMessage("You can ask me to search for properties or type 'help' for assistance.", 'bot');
        }

        addMessage(text, sender) {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${sender}`;
            messageElement.textContent = text;
            this.chatbotMessages.appendChild(messageElement);
            this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
            
            // Add to message history
            this.messages.push({ text, sender, timestamp: new Date() });
        }
    }

    // Initialize the chatbot when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        window.propertyChatbot = new PropertyChatbot();
        
        // Show chatbot after a short delay
        setTimeout(() => {
            document.getElementById('chatbotContainer').classList.add('visible');
        }, 3000);
    });
})(); 