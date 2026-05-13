import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(
  cors({
   origin: [
      'http://localhost:3000',
      'https://saas-based-multivendor-frontend.vercel.app',
    ], // Add your frontend URLs here
    credentials: true,
  })
);

// Standard Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'SAAS Multi-Vendor E-commerce Server is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/v1', router);

// Error Handlers
app.use(globalErrorHandler);
app.use(notFound);

export default app;
