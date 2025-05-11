const API = require("../classes/Api");
const Transaction = require("../models/Transaction");
const asyncErrorHandler = require("../wrapper_functions/asyncErrorHandler");

const getTransactions = asyncErrorHandler(async (req, res) => {
  const api = new API(req, res);

  const transactions = await Transaction.aggregate([
    { $sort: { createdAt: -1 } },
    { $limit: 50 },
    {
      $lookup: {
        from: 'dashusers',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $project: {
        userId: 1,
        username: { $arrayElemAt: ['$user.username', 0] },
        userImg: { $arrayElemAt: ['$user.profileImg', 0] },
        products: 1,
        deliveredDate: 1,
        status: 1,
        totalBudget: 1,
        createdAt: 1,
        updatedAt: 1
      }
    }
  ]);

  api.dataHandler('fetch', transactions);
});



const getTransaction = asyncErrorHandler(async (req, res) => {
  const api = new API(req,res)
  const transaction = await Transaction.findById(req.params.id);
  api.dataHandler("fetch", transaction);
});

const postTransaction = asyncErrorHandler(async (req, res) => {
  const api = new API(req,res)
  const transaction = new Transaction(req.body);
  const savedTransaction = await transaction.save();
  api.dataHandler("create", savedTransaction);
});

const updateTransaction = asyncErrorHandler(async (req, res) => {
  const api = new API(req,res)
  const transaction = await Transaction.findById(req.params.id);
  await transaction.updateOne({ $set: req.body });
  api.dataHandler("update");
});

const deleteTransaction = asyncErrorHandler(async (req, res) => {
  const api = new API(req,res)
  const transaction = await Transaction.findById(req.params.id);
  await transaction.deleteOne();
  api.dataHandler("delete");
});

module.exports = {
  getTransactions,
  getTransaction,
  postTransaction,
  updateTransaction,
  deleteTransaction,
};