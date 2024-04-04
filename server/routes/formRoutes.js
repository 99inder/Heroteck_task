// routes/formRoutes.js
import express from 'express';
import { submitForm } from '../controllers/formControllers.js';
const router = express.Router();


router.post('/submit-form', submitForm);

export default router;