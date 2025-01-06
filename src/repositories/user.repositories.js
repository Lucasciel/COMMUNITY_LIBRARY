
//2 - REPOSITORIO INTERAGE COM BANCO DE DADOS, FAZ FUNÇÕES QUE PRECISAM DO BD

import db from '../config/database.js';
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
            function (err) {
                if(err) {
                    reject(err)
                } else{
                    resolve({id: this.lastID,...newUser})
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
            SELECT id, username, email, avatar, password
            FROM users 
            WHERE email = ?
            `, [email], //por segurança, comparamos separados
            (err, row) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
    })
}


function findAllUserRepository() {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT id, username, email, avatar 
            FROM users
            `, [], (err, rows) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
    })
}


//db.get seleciona todos os users e identifica o id correto
function findUserByIDRepository(id){
    //dentro da promisse, a função.
    return new Promise((resolve, reject)=> {
        db.get(`
            SELECT id, username, email, avatar 
            FROM users 
            WHERE id = ?
            `, [id], //por segurança, comparamos separados
            (err, row) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
    })
}


//atualizar dados/PATCH, precisamos do id e dos novos dados
function updateUserRepository(id,user) {
    return new Promise((resolve, reject) => {
        const fields = ['username', 'email', 'password', 'avatar']; //campos do db
        let query = "UPDATE users SET"; //comando sql para atualizar valor
        const values = []; //apenas valores das chaves


        //verifica todos os campos possiveis do db,
        //adiciona apenas os campos que usuario enviou 
        fields.forEach((field)=> { //iteração para os campos do array fields
            if (user[field] !== undefined) { //vai procurar todos os campos do db no objeto usuario
                query += ` ${field} = ?,`; //so vai adicionar os campos que forem enviados
                values.push(user[field]);// adiciona valores das chaves
            }
        });

        query = query.slice(0, -1); //tira a ultima virgula

        query += " WHERE id = ?";
        values.push(id); //adiciona em ultimo o id para where no values.

        db.run(query, values, (err)=> {
            if(err) {
                reject(err)
            } else {
                resolve({...user, id}) //devolve todo objeto user + id como resposta
            }
        })
    })
}




async function deleteUserRepository(id){
    return new Promise((resolve, reject)=> {
        db.run(`
            DELETE FROM users
            WHERE id = ?
            `, [id],
            (err) => {
                if(err) {
                    reject(err)
                } else {
                    resolve({message:"User deleted successfuly", id})
                }
            }
        )

        
    })
}


export default {
    createUseerRepository,
    findUserByEmailRepository,
    findUserByIDRepository,
    findAllUserRepository,
    updateUserRepository,
    deleteUserRepository
}
