import { db } from "../../db/conexao";
import type { clientReturning, clientCreating } from "../../db/schemas";
import { clients } from "../../db/schemas";
import { eq, ilike } from "drizzle-orm";

class ClientRepository {
    async createClient(data: clientCreating): Promise<clientReturning> {
        const [createdClient] = await db
            .insert(clients)
            .values(data)
            .returning();
        return createdClient!;
    }

    async findById(id: string): Promise<clientReturning | undefined> {
        const [foundedClient] = await db
            .select()
            .from(clients)
            .where(eq(clients.id, id));
        return foundedClient;
    }

    async findByName(name: string): Promise<clientReturning[]> {
        const results = await db
            .select()
            .from(clients)
            .where(ilike(clients.name, `%${name}%`));
        return results;
    }

    async updateClient(id: string, newData: Partial<clientCreating>): Promise<clientReturning | undefined> {
        const [updatedClient] = await db
            .update(clients)
            .set(newData)
            .where(eq(clients.id, id))
            .returning();
        return updatedClient;
    }

    async deleteClient(id: string): Promise<clientReturning | undefined> {
        const [deletedClient] = await db
            .delete(clients)
            .where(eq(clients.id, id))
            .returning();
        return deletedClient;
    }
}