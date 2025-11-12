import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { authRouter } from './routes/auth';
import { healthRouter } from './routes/health';
import { productsRouter } from './routes/products';
import { generateOpenApiDocument } from './swagger/document';
import { errorHandler } from './middleware/error-handler';
import { connectMongo } from './lib/mongo';

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
app.use('/api/auth', authRouter);

app.get('/', (_req, res) => {
  res.redirect('/docs');
});

app.use(errorHandler);

const port = Number(process.env.PORT ?? 4000);

const start = async () => {
  try {
    await connectMongo();
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Backend ready at http://localhost:${port}`);
      // eslint-disable-next-line no-console
      console.log(`Swagger UI available at http://localhost:${port}/docs`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start backend', error);
    process.exit(1);
  }
};

void start();
