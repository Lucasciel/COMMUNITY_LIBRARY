import loanRepositories from "../repositories/loan.repositories.js";

async function createLoanService(userId,bookId, dueDate) {
    const createLoan = await loanRepositories.createLoanRepository(userId,bookId, dueDate);
    if(!createLoan) throw new Error("Erro ao criar loan");
    return createLoan;
}

async function findAllLoansService() {
    const loans = await loanRepositories.findAllLoansRepository();
    return loans;
}

async function findLoanByIdService(loanId) {
    const loan = await loanRepositories.findLoanByIdRepository(loanId);
    if(!loan) throw new Error("Loan não encontrado");
    return loan;
}

async function deleteLoansService(loanId, userId) {
    const loan = await loanRepositories.findLoanByIdRepository(loanId);
    if(!loan) throw new Error("Loan não encontrado");
    if(loan.userId !== userId) throw new Error("não autorizado");
    const response = await loanRepositories.deleteLoanRepository(loanId);
    return response;
}

export default {
    createLoanService,
    findAllLoansService,
    findLoanByIdService,
    deleteLoansService
}

