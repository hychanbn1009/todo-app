import express, { type Application } from 'express';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml'
import cors from 'cors';

const swaggerDocument = YAML.parse(fs.readFileSync('./openapi.yaml', 'utf8'));
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:3001'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

// Middleware to parse JSON
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api', todoRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});