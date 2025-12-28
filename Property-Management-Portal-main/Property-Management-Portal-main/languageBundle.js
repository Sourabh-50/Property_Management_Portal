// Language Translation Bundle
(function() {
    // Translation Service
    const translations = {
        en: {
            greeting: "Hello! I'm your Property Search Assistant. How can I help you today?",
            helpPrompt: "You can ask me to search for properties or type 'help' for assistance.",
            notUnderstood: "I'm not sure I understand. You can ask me to search for properties or type 'help' for assistance or contact us : 12345678890 , abc@gmail.com",
            searching: "Searching for properties...",
            foundProperties: "I found {count} properties matching your criteria:",
            andMore: "...and {count} more properties.",
            viewAllResults: "You can view all results in the main search panel.",
            noResults: "No properties found matching your search criteria.",
            tryAdjusting: "Try adjusting your search parameters or check for typos.",
            searchError: "Sorry, I encountered an error while searching. Please try again later.",
            helpTitle: "I can help you with:",
            helpSearch: "- Searching for properties by ID, owner name, address, etc.",
            helpDetails: "- Finding property details like registration information",
            helpEncumbrances: "- Checking property encumbrances",
            trySaying: "Try saying:",
            searchMaharashtra: "• \"Search for properties in Maharashtra\"",
            findProperty: "• \"Find property ID ABC123\"",
            searchCommercial: "• \"Look for commercial properties in Bangalore\"",
            welcome: "You're welcome! Is there anything else I can help you with?",
            searchPrompt: "What property details would you like to search for? You can specify by ID, owner name, address, type, or state.",
            // Form Labels
            state: "State",
            district: "District",
            taluka: "Taluka",
            village: "Village",
            propertyId: "Property ID",
            name: "Name",
            surveyNo: "Survey No.",
            mobileNo: "Mobile No.",
            selectLanguage: "Select Language",
            
            // Placeholders
            selectState: "Select State",
            selectDistrict: "Select District",
            selectTaluka: "Select Taluka",
            selectVillage: "Select Village",
            enterPropertyId: "Enter Property ID",
            enterName: "Enter Name",
            enterSurveyNumber: "Enter Survey Number",
            enterMobileNumber: "Enter Mobile Number",
            
            // Buttons
            submit: "Submit",
            reset: "Reset",
            downloadPDF: "Download PDF",
            
            // Data Sources
            dataSources: "Data Sources",
            doris: "DORIS",
            cersai: "CERSAI",
            dlr: "DLR",
            mca: "MCA",
            
            // Messages
            captchaMessage: "Can't read the captcha? Click the refresh button to get a new one.",
            searchResults: "Search Results",
            propertiesFound: "properties found",
            
            // Property Details
            ownerDetails: "Owner Details",
            propertyInfo: "Property Information",
            addressDetails: "Address Details",
            statusInfo: "Status Information",
            mutationHistory: "Mutation History"
        },
        hi: {
            greeting: "नमस्ते! मैं आपका प्रॉपर्टी सर्च असिस्टेंट हूं। मैं आपकी कैसे मदद कर सकता हूं?",
            helpPrompt: "आप मुझसे प्रॉपर्टी खोजने के लिए पूछ सकते हैं या 'help' टाइप कर सकते हैं।",
            notUnderstood: "मुझे समझ नहीं आया। आप मुझसे प्रॉपर्टी खोजने के लिए पूछ सकते हैं या 'help' टाइप कर सकते हैं या हमसे संपर्क करें: 12345678890, abc@gmail.com",
            searching: "प्रॉपर्टी खोज रहा हूं...",
            foundProperties: "मुझे आपकी कसौटी से मेल खाती {count} प्रॉपर्टी मिली:",
            andMore: "...और {count} और प्रॉपर्टी।",
            viewAllResults: "आप मुख्य सर्च पैनल में सभी परिणाम देख सकते हैं।",
            noResults: "आपकी खोज कसौटी से मेल खाती कोई प्रॉपर्टी नहीं मिली।",
            tryAdjusting: "अपने खोज पैरामीटर को समायोजित करें या टाइपो की जांच करें।",
            searchError: "क्षमा करें, खोज के दौरान एक त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।",
            helpTitle: "मैं आपकी इन चीजों में मदद कर सकता हूं:",
            helpSearch: "- आईडी, मालिक का नाम, पता आदि से प्रॉपर्टी खोजना",
            helpDetails: "- पंजीकरण जानकारी जैसे प्रॉपर्टी विवरण खोजना",
            helpEncumbrances: "- प्रॉपर्टी बंधक की जांच करना",
            trySaying: "इनमें से कुछ कहने का प्रयास करें:",
            searchMaharashtra: "• \"महाराष्ट्र में प्रॉपर्टी खोजें\"",
            findProperty: "• \"प्रॉपर्टी आईडी ABC123 खोजें\"",
            searchCommercial: "• \"बैंगलोर में वाणिज्यिक प्रॉपर्टी खोजें\"",
            welcome: "आपका स्वागत है! क्या मैं आपकी किसी और चीज में मदद कर सकता हूं?",
            searchPrompt: "आप किन प्रॉपर्टी विवरणों की खोज करना चाहते हैं? आप आईडी, मालिक का नाम, पता, प्रकार या राज्य निर्दिष्ट कर सकते हैं।",
            // Form Labels
            state: "राज्य",
            district: "जिला",
            taluka: "तालुका",
            village: "गाव",
            propertyId: "मालमत्ता आयडी",
            name: "नाव",
            surveyNo: "सर्वेक्षण क्रमांक",
            mobileNo: "मोबाईल क्रमांक",
            selectLanguage: "भाषा निवडा",
            
            // Placeholders
            selectState: "राज्य निवडा",
            selectDistrict: "जिला निवडा",
            selectTaluka: "तालुका निवडा",
            selectVillage: "गाव निवडा",
            enterPropertyId: "मालमत्ता आयडी प्रविष्ट करा",
            enterName: "नाव प्रविष्ट करा",
            enterSurveyNumber: "सर्वेक्षण क्रमांक प्रविष्ट करा",
            enterMobileNumber: "मोबाईल क्रमांक प्रविष्ट करा",
            
            // Buttons
            submit: "सबमिट करा",
            reset: "रीसेट करा",
            downloadPDF: "पीडीएफ डाउनलोड करा",
            
            // Data Sources
            dataSources: "डेटा स्त्रोत",
            doris: "डीओआरआयएस",
            cersai: "सीईआरएसएआय",
            dlr: "डीएलआर",
            mca: "एमसीए",
            
            // Messages
            captchaMessage: "कॅप्चा वाचू शकत नाही? नवीन मिळवण्यासाठी रीफ्रेश बटन क्लिक करा.",
            searchResults: "शोध परिणाम",
            propertiesFound: "मालमत्ता सापडल्या",
            
            // Property Details
            ownerDetails: "मालकाची माहिती",
            propertyInfo: "मालमत्तेची माहिती",
            addressDetails: "पत्त्याची माहिती",
            statusInfo: "स्थिती माहिती",
            mutationHistory: "बदल इतिहास"
        },
        bn: {
            greeting: "হ্যালো! আমি আপনার প্রপার্টি সার্চ অ্যাসিস্ট্যান্ট। আমি আপনাকে কিভাবে সাহায্য করতে পারি?",
            helpPrompt: "আপনি আমাকে প্রপার্টি খোঁজার জন্য জিজ্ঞাসা করতে পারেন বা 'help' টাইপ করতে পারেন।",
            notUnderstood: "আমি বুঝতে পারছি না। আপনি আমাকে প্রপার্টি খোঁজার জন্য জিজ্ঞাসা করতে পারেন বা 'help' টাইপ করতে পারেন বা আমাদের সাথে যোগাযোগ করুন: 12345678890, abc@gmail.com",
            searching: "প্রপার্টি খোঁজা হচ্ছে...",
            foundProperties: "আমি আপনার মানদণ্ডের সাথে মিলে যাওয়া {count}টি প্রপার্টি পেয়েছি:",
            andMore: "...এবং আরও {count}টি প্রপার্টি।",
            viewAllResults: "আপনি মূল সার্চ প্যানেলে সমস্ত ফলাফল দেখতে পারেন।",
            noResults: "আপনার খোঁজার মানদণ্ডের সাথে মিলে যাওয়া কোন প্রপার্টি পাওয়া যায়নি।",
            tryAdjusting: "আপনার খোঁজার প্যারামিটার সামঞ্জস্য করুন বা টাইপো চেক করুন।",
            searchError: "দুঃখিত, খোঁজার সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
            helpTitle: "আমি আপনাকে এই বিষয়গুলিতে সাহায্য করতে পারি:",
            helpSearch: "- আইডি, মালিকের নাম, ঠিকানা ইত্যাদি দিয়ে প্রপার্টি খোঁজা",
            helpDetails: "- রেজিস্ট্রেশন তথ্য সহ প্রপার্টি বিবরণ খোঁজা",
            helpEncumbrances: "- প্রপার্টি বন্ধক চেক করা",
            trySaying: "এইগুলির মধ্যে কিছু বলার চেষ্টা করুন:",
            searchMaharashtra: "• \"মহারাষ্ট্রে প্রপার্টি খোঁজুন\"",
            findProperty: "• \"প্রপার্টি আইডি ABC123 খোঁজুন\"",
            searchCommercial: "• \"বাংলোরে বাণিজ্যিক প্রপার্টি খোঁজুন\"",
            welcome: "স্বাগতম! আমি আপনাকে আরও কিছুতে সাহায্য করতে পারি?",
            searchPrompt: "আপনি কোন প্রপার্টি বিবরণ খোঁজতে চান? আপনি আইডি, মালিকের নাম, ঠিকানা, প্রকার বা রাজ্য নির্দিষ্ট করতে পারেন।",
            // Form Labels
            state: "রাজ্য",
            district: "জিলা",
            taluka: "তালুকা",
            village: "গাম",
            propertyId: "প্রপার্টি আয়ডি",
            name: "নাম",
            surveyNo: "সর্঵াসন নম্বর",
            mobileNo: "মোবাইল নম্বর",
            selectLanguage: "ভাষা নির্বাচন করুন",
            
            // Placeholders
            selectState: "রাজ্য নির্বাচন করুন",
            selectDistrict: "জিলা নির্বাচন করুন",
            selectTaluka: "তালুকা নির্বাচন করুন",
            selectVillage: "গাম নির্বাচন করুন",
            enterPropertyId: "প্রপার্টি আয়ডি প্রবেশ করুন",
            enterName: "নাম প্রবেশ করুন",
            enterSurveyNumber: "সর্঵াসন নম্বর প্রবেশ করুন",
            enterMobileNumber: "মোবাইল নম্বর প্রবেশ করুন",
            
            // Buttons
            submit: "সাবমিট করুন",
            reset: "রিসেট করুন",
            downloadPDF: "পিডিএফ ডাউনলোড করুন",
            
            // Data Sources
            dataSources: "ডেটা স্তর",
            doris: "ডিওআরআয়স",
            cersai: "সিঈআরএসএআয়",
            dlr: "ডিএলআর",
            mca: "এমসিএ",
            
            // Messages
            captchaMessage: "ক্যাপচা পড়া করতে পারেন না? নতুন পাওয়ার জন্য রিফ্রেশ বটন ক্লিক করুন।",
            searchResults: "অনুসন্ধান ফলাফল",
            propertiesFound: "প্রপার্টি পাওয়া হয়েছে",
            
            // Property Details
            ownerDetails: "মালকের তথ্য",
            propertyInfo: "প্রপার্টির তথ্য",
            addressDetails: "ঠিকানা তথ্য",
            statusInfo: "অবস্থান তথ্য",
            mutationHistory: "পরিবর্তন ইতিহাস"
        },
        ta: {
            greeting: "வணக்கம்! நான் உங்கள் சொத்து தேடல் உதவியாளர். நான் உங்களுக்கு எப்படி உதவ முடியும்?",
            helpPrompt: "நீங்கள் சொத்துக்களை தேட என்னிடம் கேட்கலாம் அல்லது 'help' என தட்டச்சு செய்யலாம்.",
            notUnderstood: "எனக்கு புரியவில்லை. நீங்கள் சொத்துக்களை தேட என்னிடம் கேட்கலாம் அல்லது 'help' என தட்டச்சு செய்யலாம் அல்லது எங்களை தொடர்பு கொள்ள: 12345678890, abc@gmail.com",
            searching: "சொத்துக்களை தேடுகிறேன்...",
            foundProperties: "உங்கள் அளவுகோல்களுடன் பொருந்தும் {count} சொத்துக்களை கண்டுபிடித்தேன்:",
            andMore: "...மேலும் {count} சொத்துக்கள்.",
            viewAllResults: "நீங்கள் முதன்மை தேடல் பேனலில் அனைத்து முடிவுகளையும் பார்க்கலாம்.",
            noResults: "உங்கள் தேடல் அளவுகோல்களுடன் பொருந்தும் சொத்துக்கள் எதுவும் கிடைக்கவில்லை.",
            tryAdjusting: "உங்கள் தேடல் அளவுருக்களை சரிசெய்யவும் அல்லது தட்டச்சு பிழைகளை சரிபார்க்கவும்.",
            searchError: "மன்னிக்கவும், தேடும் போது பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.",
            helpTitle: "நான் உங்களுக்கு இவற்றில் உதவ முடியும்:",
            helpSearch: "- ஐடி, உரிமையாளர் பெயர், முகவரி போன்றவற்றால் சொத்துக்களை தேடுதல்",
            helpDetails: "- பதிவு தகவல் போன்ற சொத்து விவரங்களை கண்டறிதல்",
            helpEncumbrances: "- சொத்து அடமானங்களை சரிபார்த்தல்",
            trySaying: "இவற்றில் ஏதேனும் சொல்ல முயற்சிக்கவும்:",
            searchMaharashtra: "• \"மகாராஷ்டிராவில் சொத்துக்களை தேடுங்கள்\"",
            findProperty: "• \"சொத்து ஐடி ABC123 ஐ கண்டறியுங்கள்\"",
            searchCommercial: "• \"பெங்களூரில் வணிக சொத்துக்களை தேடுங்கள்\"",
            welcome: "வரவேற்கிறேன்! நான் உங்களுக்கு வேறு எதிலும் உதவ முடியுமா?",
            searchPrompt: "எந்த சொத்து விவரங்களை தேட விரும்புகிறீர்கள்? நீங்கள் ஐடி, உரிமையாளர் பெயர், முகவரி, வகை அல்லது மாநிலத்தை குறிப்பிடலாம்.",
            // Form Labels
            state: "மாநிலம்",
            district: "மாவட்டம்",
            taluka: "தாலுகா",
            village: "காம்",
            propertyId: "சொத்தி ஐடி",
            name: "பெயர்",
            surveyNo: "சரிபரித்த எண்",
            mobileNo: "மோபைல் எண்",
            selectLanguage: "மொழி தேர்ந்தெடுக்க",
            
            // Placeholders
            selectState: "மாநிலம் தேர்ந்தெடுக்க",
            selectDistrict: "மாவட்டம் தேர்ந்தெடுக்க",
            selectTaluka: "தாலுகா தேர்ந்தெடுக்க",
            selectVillage: "காம் தேர்ந்தெடுக்க",
            enterPropertyId: "சொத்தி ஐடி நுழைக்க",
            enterName: "பெயர் நுழைக்க",
            enterSurveyNumber: "சரிபரித்த எண் நுழைக்க",
            enterMobileNumber: "மோபைல் எண் நுழைக்க",
            
            // Buttons
            submit: "சமிடுக",
            reset: "மீட்டுக",
            downloadPDF: "PDF ஐட்டடுக",
            
            // Data Sources
            dataSources: "தரவு மேல்",
            doris: "டிஓஆரஆயஸ்",
            cersai: "சிஈஆரஏஸஏஆய",
            dlr: "டிஏலர்",
            mca: "ஏமசிஏ",
            
            // Messages
            captchaMessage: "க்யாப்சா படிக்க முடியாது? புதிய பெறுவோது ரிஃப்ரேஷ் பட்டன் கிளிக் செய்யவும்.",
            searchResults: "தேடல் முடிவுகள்",
            propertiesFound: "சொத்திகள் கிடைத்தன",
            
            // Property Details
            ownerDetails: "மாலிகன் விவரங்கள்",
            propertyInfo: "சொத்தியின் தகவல்",
            addressDetails: "முகவரி விவரங்கள்",
            statusInfo: "நிலையின் தகவல்",
            mutationHistory: "மாற்றம் வரலாற்"
        }
        // Add more languages as needed
    };

    // Language Service
    const languageService = {
        currentLanguage: 'en',
        
        setLanguage(lang) {
            this.currentLanguage = lang;
            return this;
        },
        
        getLanguage() {
            return this.currentLanguage;
        },
        
        translate(key, params = {}) {
            const translation = translations[this.currentLanguage]?.[key] || translations['en'][key];
            if (!translation) return key;
            
            return translation.replace(/\{(\w+)\}/g, (match, key) => params[key] || match);
        },
        
        getAvailableLanguages() {
            return Object.keys(translations);
        },
        
        getLanguageName(code) {
            const languageNames = {
                en: 'English',
                hi: 'हिंदी (Hindi)',
                bn: 'বাংলা (Bengali)',
                ta: 'தமிழ் (Tamil)',
                te: 'తెలుగు (Telugu)',
                mr: 'मराठी (Marathi)',
                gu: 'ગુજરાતી (Gujarati)',
                kn: 'ಕನ್ನಡ (Kannada)',
                ml: 'മലയാളം (Malayalam)',
                pa: 'ਪੰਜਾਬੀ (Punjabi)'
            };
            return languageNames[code] || code;
        }
    };

    // Export the language service
    window.languageService = languageService;
})(); 