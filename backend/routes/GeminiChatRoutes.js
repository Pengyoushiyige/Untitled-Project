import express from 'express';
import { LanguageServiceClient } from '@google-cloud/language';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
