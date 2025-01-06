import { text } from "express";
import booksService from "../service/books.services.js"; //SERVICE

//FUNÇÕES ASYNC AWAIT, REQ, RES

async function createBookController(req, res) {
    const newBook = req.body;
    const userId = req.userId; //no middleware colocamos o id na requisição

    try {
        const createBook = await booksService.createBookService(newBook,userId);
        res.status(201).send(createBook);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function findAllBooksController(req, res) {
    try {
        const books = await booksService.findAllBooksService();
        res.status(201).send(books);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

async function findBookByIdController(req, res) {
    const idBook = req.params.id;

    try {
        const book = await booksService.findBookByIdService(idBook)
        return res.send(book)
    } catch(err) {
        res.status(404).send(err.message)
    }
}

async function updateBookController(req,res) {
    const updateBook = req.body;
    const bookId = req.params.id;
    const userId = req.userId

    try {
        const response = await booksService.updateBookService(updateBook,bookId,userId)
        return res.send(response)
    } catch(err) {
        res.status(404).send(err.message)
    }
}

async function deleteBookController(req,res) {
    const bookId = req.params.id;
    const userId = req.userId;

    try {
        const response = await booksService.deleteBookService(bookId,userId)
        return res.send(response)
    } catch(err) {
        res.status(400).send(err.message)
    }
}

async function searchBooksController(req, res) {
    const {texto} = req.query;
    try {
        const books = await booksService.searchBooksService(texto)
        return res.send(books)
    } catch(err) {
        res.status(400).send(err.message)
    }
}

export default {
    createBookController,
    findAllBooksController,
    findBookByIdController,
    updateBookController,
    deleteBookController,
    searchBooksController
};