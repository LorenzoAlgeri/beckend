import { contacts, users } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
export class DatabaseStorage {
    // Users
    async getUser(id) {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        return user || undefined;
    }
    async getUserByUsername(username) {
        const [user] = await db.select().from(users).where(eq(users.username, username));
        return user || undefined;
    }
    async createUser(insertUser) {
        const [user] = await db
            .insert(users)
            .values(insertUser)
            .returning();
        return user;
    }
    // Contacts
    async createContact(insertContact) {
        const [contact] = await db
            .insert(contacts)
            .values(insertContact)
            .returning();
        return contact;
    }
    async getContacts() {
        return await db.select().from(contacts);
    }
    async getContact(id) {
        const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
        return contact || undefined;
    }
}
export const storage = new DatabaseStorage();
