import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const clients = pgTable("clients", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 80}).notNull(),
    phone: varchar("phone_number", { length: 20}).notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    interests: text("interests").array().notNull()
});

export type clientReturning = typeof clients.$inferSelect;
export type clientCreating = typeof clients.$inferInsert;