import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";

export const clients = pgTable("clients", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 80}).notNull(),
    interests: text("interests").array()
});