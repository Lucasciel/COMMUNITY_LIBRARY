
//CRONOMETRO PARA ATIVAR A FUNÇÃO + PEGANDO OS DADOS DO USUARIO


//biblioteca que agenda tarefas para serem executadas em periodos especificos
import cron from 'node-cron' 
import moment from 'moment' //lida com data


//funções com db
import loanRepository from "../repositories/loan.repositories.js"

//função com biblioteca para envio de email
import sendEmail from './email.service.js' //envia email



//executa no minuto 19, as 8 horas, no mês ** no ano ****
cron.schedule('59 * * * *', async()=> {
    console.log('rodando cron')
    const loans = await loanRepository.findAllLoansRepository() //livros emprestados
    const today = moment().startOf('day') //so pega o dia atual



    //passando por todos emprestimos, pegamos o id do user e do libro
    //com o id de cada um, pegamos a tabela do user que fez o emprestimo e do livro 
    //assim teremos todos os dados do user e do livro (email, nome.. etc..)
    loans.forEach(async(loan) => { 

        const dueDate = moment(loan.dueDate).startOf('day'); //data de entrega em dias
        const reminderDueDate = moment(dueDate).subtract(1, "days")// 1 dia ante da entrega
        
        if(today.isSame(reminderDueDate)) {//se hoje for o peultimo dia para entrega
            sendEmail(loan.email, loan.title, loan.username, loan.dueDate) //envie a mensagem de aviso para devolver
        }

    });
})

