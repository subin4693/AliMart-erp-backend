const Invoice = require('../models/InvoiceSchema');

// Create a new invoice
exports.createInvoice = async (req, res) => {
    const { customername, items } = req.body;

    if (!customername || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            status: "fail",
            message: 'Customer name and items are required, and items must be a non-empty array.',
        });
    }

    try {
        const invoice = new Invoice(req.body);
        await invoice.save();
        res.status(201).json({
            status: "success",
            data: invoice,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};


// Get all invoices
exports.getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('items.product');
        res.status(200).json({
            status: "success",
            data: invoices,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

// Get a single invoice by ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('items.product');
        if (!invoice) {
            return res.status(404).json({
                status: "fail",
                message: 'Invoice not found',
            });
        }
        res.status(200).json({
            status: "success",
            data: invoice,
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};

// Update an invoice
exports.updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!invoice) {
            return res.status(404).json({
                status: "fail",
                message: 'Invoice not found',
            });
        }
        res.status(200).json({
            status: "success",
            data: invoice,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

// Delete an invoice
exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) {
            return res.status(404).json({
                status: "fail",
                message: 'Invoice not found',
            });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message,
        });
    }
};
