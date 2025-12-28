const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static('.'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'uploads');
        try {
            await fs.mkdir(uploadDir, { recursive: true });
            cb(null, uploadDir);
        } catch (error) {
            cb(error, null);
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF, JPEG, and PNG files are allowed.'));
        }
    }
});

// Function to save registration data
async function saveRegistrationData(data) {
    const dataDir = path.join(__dirname, 'data');
    const filePath = path.join(dataDir, 'property-registrations.json');

    try {
        // Create data directory if it doesn't exist
        await fs.mkdir(dataDir, { recursive: true });

        // Read existing data or create empty array
        let registrations = [];
        try {
            const existingData = await fs.readFile(filePath, 'utf8');
            registrations = JSON.parse(existingData);
        } catch (error) {
            // File doesn't exist or is invalid, start with empty array
        }

        // Add new registration
        registrations.push(data);

        // Save updated registrations
        await fs.writeFile(filePath, JSON.stringify(registrations, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error saving registration:', error);
        throw error;
    }
}

// Handle property registration
app.post('/api/property-registration', upload.fields([
    { name: 'propertyDeed', maxCount: 1 },
    { name: 'taxReceipt', maxCount: 1 }
]), async (req, res) => {
    try {
        console.log('Received registration request:', req.body);

        const registrationId = uuidv4();
        const timestamp = new Date().toISOString();

        // Prepare registration data
        const registrationData = {
            registrationId,
            timestamp,
            ownerDetails: {
                name: req.body.ownerName,
                contactNumber: req.body.contactNumber,
                email: req.body.email,
                idProof: req.body.idProof
            },
            propertyDetails: {
                type: req.body.propertyType,
                area: req.body.propertyArea,
                address: req.body.propertyAddress,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode
            },
            documents: {
                propertyDeed: req.files?.['propertyDeed']?.[0]?.filename || null,
                taxReceipt: req.files?.['taxReceipt']?.[0]?.filename || null
            }
        };

        // Save registration data
        await saveRegistrationData(registrationData);

        // Send success response
        res.json({
            success: true,
            message: 'Property registration successful',
            registrationId,
            data: registrationData
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process registration',
            error: error.message
        });
    }
});

// Get all registrations
app.get('/api/property-registrations', async (req, res) => {
    try {
        const dataDir = path.join(__dirname, 'data');
        const filePath = path.join(dataDir, 'property-registrations.json');
        
        let registrations = [];
        try {
            const data = await fs.readFile(filePath, 'utf8');
            registrations = JSON.parse(data);
        } catch (error) {
            // File doesn't exist or is invalid
        }
        
        res.json({
            success: true,
            registrations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch registrations',
            error: error.message
        });
    }
});

// Get registration by ID
app.get('/api/property-registration/:id', async (req, res) => {
    try {
        const dataDir = path.join(__dirname, 'data');
        const filePath = path.join(dataDir, 'property-registrations.json');
        
        const data = await fs.readFile(filePath, 'utf8');
        const registrations = JSON.parse(data);
        
        const registration = registrations.find(r => r.registrationId === req.params.id);
        
        if (registration) {
            res.json({
                success: true,
                registration
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Registration not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch registration',
            error: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'An error occurred',
        error: err.message
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 