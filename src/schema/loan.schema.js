import {z} from 'zod';

const loanSchema = z.object({
    bookId: z.number().int().positive('Book id precisa ser um numero inteiro e Positivo'),
    dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).min(10, 'Due date precisa ser no formato YYYY-MM-DD'),
});

const loanIdSchema = z.object({
    loanId: z.number().int().positive('id do Loan precisa ser um numero positivo inteiro'),
});

export  { loanIdSchema, loanSchema};