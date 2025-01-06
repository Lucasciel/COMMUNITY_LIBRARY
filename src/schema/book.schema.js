
//ANTES DE RECEBER OS DADOS, VERIFICA A TIPAGEM e REGRAS

import { z } from 'zod'; 

const bookSchema = z.object({
    title: z.string().min(1, "Titulo requerido"),
    author: z.string().min(1, 'Autor requerido'),
})

const bookIdSchema = z.object({
    bookId: z.number().int().positive('Book ID must be a positive integer'),
});

export {bookSchema, bookIdSchema}