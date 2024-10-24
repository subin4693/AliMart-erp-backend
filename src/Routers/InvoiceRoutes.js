const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/InvoiceControllers');


router.route('/')
    .post(invoiceController.createInvoice)
    .get(invoiceController.getInvoices);


router.get('/:id', invoiceController.getInvoiceById);


router.put('/:id', invoiceController.updateInvoice);


router.delete('/:id', invoiceController.deleteInvoice);

module.exports = router;
