import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { healthRouter } from './routes/health';
import { productsRouter } from './routes/products';
import { generateOpenApiDocument } from './swagger/document';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json({ limit: '1mb' }));

const openApiDocument = generateOpenApiDocument();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use('/api/health', healthRouter);
app.use('/api/products', productsRouter);

app.get('/', (_req, res) => {
  res.redirect('/docs');
});

const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend ready at http://localhost:${port}`);
  // eslint-disable-next-line no-console
  console.log(`Swagger UI available at http://localhost:${port}/docs`);
});
