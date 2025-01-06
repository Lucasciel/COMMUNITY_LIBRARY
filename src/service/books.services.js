import bookRepositories from "../repositories/book.repositories.js" //REPOSITORIES


//FUNÇÕES ASYNC AWAIT, throw new Error()

//adicionar um livro ao dbS
async function createBookService(newbook,userId) {
    const createBook = await bookRepositories.createBookRepository(newbook,userId);

    if(!createBook) throw new Error("Error ao criar livro");
    return createBook;
}


//pegar todos ja criados do db
async function findAllBooksService() {
    const books = await bookRepositories.findAllBooksRepository();
    return books;
}

//pega livro pelo iduser
async function findBookByIdService(bookId) {
    const book = await bookRepositories.findBookByIdRepository(bookId);
    if (!book) throw new Error("Book not found");
    return book;
  }


//atualizar livro pelo iduser
async function updateBookService(updatedBook, bookId, userId) {
    const book = await bookRepositories.findBookByIdRepository(bookId); //livro existe?
    if (!book) throw new Error("Book not found");
    if (book.userId !== userId) throw new Error("Unauthorized"); //para atualizar o livro, userId tem que ser igual userId do livro
    const response = await bookRepositories.updateBookRepository(updatedBook, bookId);
    return response;
  }
  
  //deletar pelo iduser
  async function deleteBookService(bookId, userId) {
    const book = await bookRepositories.findBookByIdRepository(bookId);//livro existe?
    if (!book) throw new Error("Book not found");
    if (book.userId !== userId) throw new Error("Unauthorized");//para deletar o livro, userId tem que ser igual userId do livro
    const response = await bookRepositories.deleteBookRepository(bookId);
    return response;
  }
  
  //pegar pelo nome
  async function searchBooksService(text) {
    if (!text) return await bookRepositories.findAllBooksRepository();//sem texto, retorna todos livros
    const books = await bookRepositories.searchBooksRepository(text); //livro especifico
    return books;
  }

export default {
    createBookService,
    findAllBooksService,
    findBookByIdService,
    updateBookService,
    deleteBookService,
    searchBooksService
}