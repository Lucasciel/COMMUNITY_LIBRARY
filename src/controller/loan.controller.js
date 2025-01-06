import loanService from "../service/loan.service.js";

async function createLoanController(req, res) {
    const {bookId, dueDate} = req.body;
    const userId = req.userId;

    try {
        const createLoan = await loanService.createLoanService(userId, bookId, dueDate)
        return res.status(201).send(createLoan)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

async function findAllLoansController(req, res) {
    try {
        const loans = await loanService.findAllLoansService();
        return res.status(201).send(loans)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

async function findAllLoanByIdController(req, res) {
    const loanId = req.params.id;
    try {
        const loan = await loanService.findLoanByIdService(loanId);
        return res.send(loan)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}


async function deleteLoanController(req, res) {
    const loanId = req.params.id;
    const userId = req.userId
    try {
        const response = await loanService.deleteLoansService(loanId, userId);
        return res.send(response)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

export default {
    createLoanController,
    findAllLoansController,
    findAllLoanByIdController,
    deleteLoanController
}