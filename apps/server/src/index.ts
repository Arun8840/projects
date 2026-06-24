import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { todoRouter } from './routers/router.todo';
const app = new Hono();

app.use(
  '/api/*',
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
);

const appRouter = app.route('/api/todos', todoRouter);

export type AppType = typeof appRouter;
export default app;
