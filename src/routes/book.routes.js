import { Router } from "express"; //comando para criar rotas
import bookControllers from "../controller/book.controllers.js";//CONTROLLER
import { authMiddleware } from "../middlewares/auth.middleware.js";//token

import { validate, validateBookId } from "../middlewares/validation.middlewares.js";//compara tipagem recebida
import {bookSchema} from "../schema/book.schema.js"//tipagem author e title do livro

const router = Router() //comando para criar rotas


//Pegar Todos os livros do db
router.get("/books", bookControllers.findAllBooksController);



router.use(authMiddleware); //autenticação token

//receber e guardar no db
router.post("/books", validate(bookSchema) ,bookControllers.createBookController);


//pegar livro pelo nome
router.get("/books/search", bookControllers.searchBooksController);


//pegar 1 livro
router.get("/books/:id", validateBookId, bookControllers.findBookByIdController);

//atualizar o livro
router.patch("/books/:id", validateBookId, bookControllers.updateBookController);

//deletar 1 livro
router.delete("/books/:id", validateBookId, bookControllers.deleteBookController);



export default router