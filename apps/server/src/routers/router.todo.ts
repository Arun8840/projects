import { db, eq } from '@repo/db';
import { todo } from '@repo/db/schema';
import { Hono } from 'hono';

export const todoRouter = new Hono()
  .get('/', async (c) => {
    const todos = await db.select().from(todo);

    const data = {
      success: true,
      data: todos,
      message: 'Todo items fetched successfully',
    };
    return c.json(data, 201);
  })

  .get('/todo/:id', async (c) => {
    const id = c.req.param('id');
    const [found] = await db.select().from(todo).where(eq(todo.id, id));
    if (!found) return c.json({ error: 'Not found' }, 404);

    const data = {
      success: true,
      data: found,
      message: 'Todo item fetched successfully',
    };
    return c.json(data, 201);
  })

  .post('/create', async (c) => {
    const { title } = await c.req.json<{ title: string }>();
    const id = crypto.randomUUID();
    const [created] = await db.insert(todo).values({ id, title }).returning();

    const data = {
      success: true,
      data: created,
      message: 'Todo item created successfully',
    };
    return c.json(data, 201);
  })

  .patch('/update/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json<{ title?: string; completed?: boolean }>();
    const [updated] = await db.update(todo).set(body).where(eq(todo.id, id)).returning();
    if (!updated) return c.json({ error: 'Not found' }, 404);

    const data = {
      success: true,
      data: updated,
      message: 'Todo item updated successfully',
    };
    return c.json(data, 201);
  })

  .delete('/delete/:id', async (c) => {
    const id = c.req.param('id');
    const [deleted] = await db.delete(todo).where(eq(todo.id, id)).returning();
    if (!deleted) return c.json({ error: 'Not found' }, 404);

    const data = {
      success: true,
      data: deleted,
      message: 'Todo item deleted successfully',
    };
    return c.json(data, 201);
  });
