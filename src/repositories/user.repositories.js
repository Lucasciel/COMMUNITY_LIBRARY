import db from '../config/database.js';
//2 - REPOSITORIO INTERAGE COM BANCO DE DADOS


//criando em SQL: tabela e tipos de dados id, username,email..
db.run(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER  PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT 
    )
    `)

//receber e guardar dados recebidos do usuario
function createUseerRepository(newUser) {
    return new Promise((resolve, reject)=> {
        db.run( //local que os dados serão salvos no db
            `
            INSERT INTO users (username, email, password, avatar)
            VALUES (?, ?, ?, ?)
            `, //os dados que serão enviados pro db
            [newUser.username, newUser.email, newUser.password, newUser.avatar],
            (err) => {
                if(err) {
                    reject(err)
                } else{
                    resolve({id: this.lastID, ...newUser})
                }
            }
        );
    });
}

//funcão para antes de criar, ver se ja existe email
//db.get = buscar dado especifico, SELECT selecione os dados
//FROM= tabela users, Where = se email for igual ao email enviado
//rejeita a promessa se tiver erro ou aceita
function findUserByEmailRepository(email){
    //dentro da promisse, a função.
    return new Promise((resolve, reject)=> {
        db.get(`
            SELECT id, username, email, avatar 
            FROM users 
            WHERE email = ?
            `, [email], //por segurança, comparamos o email separados
            (err, row) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
    })
}

export default {
    createUseerRepository,
    findUserByEmailRepository
}
