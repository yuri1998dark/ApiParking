import z from 'zod';

export const paramsSchema = z.object({
    id: z.string().uuid() // Validar que el parámetro 'id' sea un UUID
});