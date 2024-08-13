// server.js
import express from 'express';
import { swaggerDocs, swaggerUi } from '../src/swagger/swagger.js'; // Ajusta la ruta según tu estructura de carpetas
import campaignRoutes from '../src/routes/campaignRoutes.js'; // Ajusta la ruta según tu estructura de carpetas



const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Usar rutas de campañas
app.use('/api', campaignRoutes);

// Configurar Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  const swaggerUrl = `http://localhost:${port}/api-docs`;
  const appUrl = `http://localhost:${port}/api`;

  console.log(`Server running on port ${port}`);
  console.log(`Swagger documentation available at: ${swaggerUrl}`);
  console.log(`API available at: ${appUrl}`);
});

