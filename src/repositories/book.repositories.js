//funções Promise(resolve,reject)
import db from "../config/database.js"; //1 permite programar em sql, criar tabelas e tipos de dados


//2 userId pegamos da tabela usuario
db.run(`
    CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id)
    )`);

//3- adicionando no db os dados recebidos pela requisição Post
function createBookRepository(newbook, userId) {
    return new Promise((resolve, reject) => {
        const {title, author} = newbook;
        db.run(`
            INSERT INTO books (title, author, userId) VALUES(?, ?, ?)`,
            [title, author, userId],
            function (err) {
                if(err) {
                    reject(err);
                } else {
                    resolve({id: this.lastID, ...newbook}); //retorna dados enviados + id
                }
            }
        );
    })
}

// 4- entregando dados pela requisição Get
function findAllBooksRepository() {
    return new Promise((resolve,reject) => {
        db.all(`SELECT * FROM books`, [], (err, rows)=> {
            if (err) {
                reject(err);
            }else{
                resolve(rows); //linhas
            }
        })
    })
}


//pegar pelo id
function findBookByIdRepository(bookId) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM books WHERE id = ?`, [bookId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
  

  //atualizar meus dados
  function updateBookRepository(updatedBook, bookId) {
    return new Promise((resolve, reject) => {
      const { title, author, userId } = updatedBook; //dados enviados
      let query = "UPDATE books SET"; //set= quais dados serão mudados
      const values = [];
  
      if (title !== undefined) { //se tiver titulo, sql adiciona um novo valor
        query += " title = ?,";
        values.push(title); //novo valor
      }
      if (author !== undefined) { // se tiver autor, sql adiciona um novo valor
        query += " author = ?,";
        values.push(author);//novo valor
      }
  
      // Remove a vírgula extra no final da query
      query = query.slice(0, -1);
  
      query += " WHERE id = ?"; // adiciona id por ultimo em value
      values.push(bookId);
  
      db.run(query, values, //comandos sql que guarda novos valores, e os valores da req
         function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: bookId, ...updatedBook });
        }
      });
    });
  }
  

  //deleta a tabela que tiver o mesmo id enviado
  function deleteBookRepository(bookId) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM books WHERE id = ?`, [bookId],  
        function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ message: "Book deleted successfully", bookId });
        }
      });
    });
  }
  


  //pegando o livro pelo autor ou pelo nome do livro
  //LIKE, % = permite procurar mesmo se eu não souber todo o nome 
  function searchBooksRepository(text) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM books WHERE title LIKE ? OR author LIKE ?`,
        [`%${text}%`, `%${text}%`], //seleciona a tabela quando o titulo ou authot for parecido com o texto enviado
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }



export default {
    createBookRepository,
    findAllBooksRepository,
    findBookByIdRepository,
    updateBookRepository,
    deleteBookRepository,
    searchBooksRepository
}
