import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
export const contacts = pgTable("contacts", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    company: text("company"),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const insertContactSchema = createInsertSchema(contacts, {
    name: z.string().min(1, "Nome e cognome sono obbligatori"),
    email: z.string().email("Inserisci un indirizzo email valido"),
    phone: z.string().optional(),
    company: z.string().optional(),
    message: z.string().min(1, "Il messaggio è obbligatorio"),
}).omit({
    id: true,
    createdAt: true,
});
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
});
export const insertUserSchema = createInsertSchema(users).pick({
    username: true,
    password: true,
});
