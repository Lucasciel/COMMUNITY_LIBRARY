import {z} from "zod"
//É COMO OS DADOS TEM QUE SER. VALIDAÇÃO DE DADOS RECEBIDOS PARA CADA TABELA.
//(EX: NÃO ENVIAR NUMERO NA ONDE SERIA USERNAME OU NÃO ESQUECER DE ENVIAR ALGUM DADO)


//validando os dados recebidos para tabela USERS
const userSchema = z.object({
    username: z.string().min(3, "username is required"),
    email: z.string().email("invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    avatar: z.string().url('invalid URL').optional()
})

//criando uma validação de dado id
const userIdSchema = z.object ({
    userId: z.number().int().positive('User ID must be a positive integer')
})

export {userSchema, userIdSchema}