// Chatbot core functionality
let isVisible = false;

// Initialize chatbot
document.addEventListener('DOMContentLoaded', () => {
    // Add initial welcome message
    addBotMessage("Hello! I'm your Property Assistant. How can I help you today? You can ask me about:\n\n" +
        "1. Property search\n" +
        "2. Property details\n" +
        "3. Document requirements\n" +
        "4. Registration process\n" +
        "5. Property verification");

    // Add enter key listener for input
    document.getElementById('userInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// Toggle chat visibility
function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    isVisible = !isVisible;
    chatContainer.style.display = isVisible ? 'block' : 'none';
    
    if (isVisible) {
        document.getElementById('userInput').focus();
    }
}

// Send message function
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (message) {
        addUserMessage(message);
        userInput.value = '';
        processUserMessage(message);
    }
}

// Add user message to chat
function addUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Add bot message to chat
function addBotMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    indicator.style.display = 'block';
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    indicator.style.display = 'none';
}

// Scroll chat to bottom
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Process user message and generate response
async function processUserMessage(message) {
    showTypingIndicator();
    
    // Convert message to lowercase for easier matching
    const lowerMessage = message.toLowerCase();
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
        // Check for property search related queries
        if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('looking for')) {
            const properties = await PropertyService.searchProperties(message);
            handlePropertySearchResponse(properties);
        }
        // Check for property details queries
        else if (lowerMessage.includes('details') || lowerMessage.includes('information')) {
            const propertyId = extractPropertyId(message);
            if (propertyId) {
                const details = await PropertyService.getPropertyDetails(propertyId);
                handlePropertyDetailsResponse(details);
            } else {
                addBotMessage("Please provide a property ID for me to look up the details. For example: 'Show me details for property KA-BLR-20240501'");
            }
        }
        // Check for document related queries
        else if (lowerMessage.includes('document') || lowerMessage.includes('papers')) {
            handleDocumentQuery(message);
        }
        // Check for registration process queries
        else if (lowerMessage.includes('register') || lowerMessage.includes('registration')) {
            handleRegistrationQuery(message);
        }
        // Check for verification queries
        else if (lowerMessage.includes('verify') || lowerMessage.includes('verification')) {
            handleVerificationQuery(message);
        }
        // Default response for unrecognized queries
        else {
            addBotMessage("I'm not sure I understand. Could you please rephrase your question? You can ask me about property search, property details, documents, registration process, or property verification.");
        }
    } catch (error) {
        console.error('Error processing message:', error);
        addBotMessage("I apologize, but I encountered an error processing your request. Please try again.");
    }
    
    hideTypingIndicator();
}

// Extract property ID from message
function extractPropertyId(message) {
    // Look for pattern like KA-BLR-20240501
    const match = message.match(/[A-Z]{2}-[A-Z]{3}-\d{8}/);
    return match ? match[0] : null;
}

// Handle property search response
function handlePropertySearchResponse(properties) {
    if (properties && properties.length > 0) {
        let response = "I found the following properties:\n\n";
        properties.forEach((property, index) => {
            response += `${index + 1}. Property ID: ${property.property_id}\n` +
                       `   Location: ${property.address.property_address}\n` +
                       `   Type: ${property.property_type}\n` +
                       `   Area: ${property.area_sq_ft} sq ft\n\n`;
        });
        response += "Would you like to know more details about any of these properties?";
        addBotMessage(response);
    } else {
        addBotMessage("I couldn't find any properties matching your criteria. Would you like to try a different search?");
    }
}

// Handle property details response
function handlePropertyDetailsResponse(details) {
    if (details) {
        const response = `Here are the details for property ${details.property_id}:\n\n` +
            `Type: ${details.property_type}\n` +
            `Area: ${details.area_sq_ft} sq ft\n` +
            `Location: ${details.address.property_address}\n` +
            `Owner: ${details.owner_details[0].name}\n` +
            `Status: ${details.loan_status}\n\n` +
            "Would you like to know about the documents required for this property?";
        addBotMessage(response);
    } else {
        addBotMessage("I couldn't find details for this property. Please check the property ID and try again.");
    }
}

// Handle document related queries
function handleDocumentQuery(message) {
    const response = "For property transactions, you'll need the following documents:\n\n" +
        "1. Property ownership documents\n" +
        "2. Tax payment receipts\n" +
        "3. NOC from the bank (if applicable)\n" +
        "4. Identity proof\n" +
        "5. Address proof\n\n" +
        "Would you like to know more about any specific document?";
    addBotMessage(response);
}

// Handle registration process queries
function handleRegistrationQuery(message) {
    const response = "The property registration process involves these steps:\n\n" +
        "1. Document verification\n" +
        "2. Payment of stamp duty\n" +
        "3. Property registration at sub-registrar's office\n" +
        "4. Obtaining registration certificate\n\n" +
        "Would you like me to explain any of these steps in detail?";
    addBotMessage(response);
}

// Handle verification queries
function handleVerificationQuery(message) {
    const response = "Property verification includes:\n\n" +
        "1. Title verification\n" +
        "2. Legal status check\n" +
        "3. Property document verification\n" +
        "4. Encumbrance certificate check\n\n" +
        "Which aspect would you like to know more about?";
    addBotMessage(response);
} 