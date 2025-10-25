import express, { type Application } from 'express';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml'

const swaggerDocument = YAML.parse(fs.readFileSync('./openapi.yaml', 'utf8'));
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api', todoRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});