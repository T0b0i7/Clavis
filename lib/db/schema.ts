/*
 * Clavis — Free Typing Test with Mechanical Keyboard Sounds
 * Created by Eucher O. ABATTI (T0b0i7) — © 2026
 * License: ? Star https://github.com/T0b0i7/Clavis before use
 */
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const stats = sqliteTable("stats", {
  key: text("key").primaryKey(),
  value: integer("value").notNull().default(0),
});

export const subscribers = sqliteTable("subscribers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  date: text("date").notNull(),
  language: text("language").notNull().default("french"),
});
