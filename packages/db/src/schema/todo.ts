import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const todo = pgTable('todo', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  completed: boolean('completed').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
