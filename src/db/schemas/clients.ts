import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";

export const clients = pgTable("clients", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 80}).notNull(),
    phone: varchar("phone_number", { length: 20}).notNull().unique(),
    interests: text("interests").array()
});