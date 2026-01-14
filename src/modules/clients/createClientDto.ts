import { t} from "elysia";
import type { Static } from "elysia";

export const createClientSchema = t.Object({
    name: t.String({ minLength: 3, maxLength: 80}),
    phone: t.String({ minLength: 9, maxLength: 20}),
    interests: t.Array(t.String(), { default: []})
});

export type createClientDto = Static<typeof createClientSchema>;