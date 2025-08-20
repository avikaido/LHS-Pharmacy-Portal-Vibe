import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
// Supertokens - Temporarily disabled
// const supertokens = require("supertokens-node");
// const { middleware, errorHandler } = require("supertokens-node/framework/express");
// const Session = require("supertokens-node/recipe/session");
// const EmailPassword = require("supertokens-node/recipe/emailpassword");
// const EmailVerification = require("supertokens-node/recipe/emailverification");
import pool from './db.js';
import expressRaw from 'express';
import usersRoutes from './routes/users.js';
import patientsRoutes from './routes/patients.js';
import pharmacistsRoutes from './routes/pharmacists.js';
import physiciansRoutes from './routes/physicians.js';
import pharmaciesRoutes from './routes/pharmacies.js';
import requestsRoutes from './routes/requests.js';
import faxesRoutes from './routes/faxes.js';
import itemsRoutes from './routes/items.js';
import conditionsRouter from './routes/conditions.js';
import physicianSearchRoutes from './routes/physician_search.js';
import barcodeRoutes from './routes/barcode.js';
import { startOutboxWorker } from './services/integrations/outboxWorker.js';
import integrationsAdminRoutes from './routes/integrations.js';

// Supertokens initialization - Temporarily disabled
/*
supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "http://localhost:3568",
    },
    appInfo: {
        appName: "LHS-Pharmacy-Portal-Vibe",
        apiDomain: "http://localhost:5002",
        websiteDomain: "http://localhost:5174",
    },
    recipeList: [
        EmailPassword.init({
            signUpFeature: {
                emailVerificationFeature: {
                    mode: "REQUIRED",
                },
            },
        }),
        Session.init(),
        EmailVerification.init({
            mode: "REQUIRED",
        }),
    ],
});
*/

const app = express();

// Telnyx webhook requires raw body for signature verification
app.use('/api/faxes/webhook', expressRaw.raw({ type: 'application/json' }));

// Parse JSON bodies for all other routes
app.use(express.json());
// Note: for Telnyx webhook signature verification, we may need raw body middleware later.

// Configure CORS to allow requests from your frontend
app.use(cors({
    origin: ["http://localhost:5174", "https://app.askyourprimary.com", "https://askyourprimary.com"],
    credentials: true,
}));

// Configure file upload middleware
app.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 50 * 1024 * 1024 // 50MB max file size
    },
    useTempFiles: true,
    tempFileDir: '/tmp/',
    debug: true // Enable debug mode to see what's happening
}));

// Supertokens middleware - Temporarily disabled
// app.use(middleware());

// Mount routes
app.use('/api/users', usersRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/pharmacists', pharmacistsRoutes);
app.use('/api/physicians', physiciansRoutes);
app.use('/api/pharmacies', pharmaciesRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/faxes', faxesRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/analyze-condition', conditionsRouter);
app.use('/api', physicianSearchRoutes);
app.use('/api/barcode', barcodeRoutes);
app.use('/api/integrations', integrationsAdminRoutes);

// Supertokens error handling middleware - Temporarily disabled
// app.use(errorHandler());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Backend running at http://0.0.0.0:${PORT}`);
    // Start integration outbox worker
    if ((process.env.INTEGRATIONS_EVENT_BUS || 'outbox') === 'outbox') {
        startOutboxWorker();
        console.log('📬 Outbox worker started');
    }
});

