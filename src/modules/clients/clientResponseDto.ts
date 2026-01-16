import {t} from "elysia";
import type { Static } from "elysia";

export const clientResponseSchema = t.Object({
    id: t.String(),
    name: t.String(),
    phone: t.String(),
    createdAt: t.String(),
    interests: t.Array(t.String())
});

export type clientResponseDto= Static<typeof clientResponseSchema>;