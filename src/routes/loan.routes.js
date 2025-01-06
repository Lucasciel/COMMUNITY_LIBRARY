import loanController from "../controller/loan.controller.js";
import {Router} from "express"

import {validate, validadeLoanId} from "../middlewares/validation.middlewares.js"
import {loanSchema, loanIdSchema} from "../schema/loan.schema.js"

const router = Router();

//criar
router.post("/loans",validate(loanSchema), loanController.createLoanController);

//pegar tudo
router.get("/loans", loanController.findAllLoansController);

//pega pelo id
router.get("/loans/:id",validadeLoanId, loanController.findAllLoanByIdController);

//deleta
router.delete("/loans/:id",validadeLoanId, loanController.deleteLoanController)

export default router;