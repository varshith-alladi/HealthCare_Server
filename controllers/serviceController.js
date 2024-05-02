const Query = require('../models/queryModel')
const Transaction = require('../models/transactionModel')


/**
 * @swagger
 * components:
 *  schemas:
 *   Query:
 *    type: object
 *    required:
 *     - username
 *     - email
 *     - ques
 *     - sug
 *    properties:
 *     username:
 *      type: string
 *      description: username of the user
 *     email:
 *      type: string
 *      description: email of the user
 *     ques:
 *      type: string
 *      description: question of the user
 *     sug:
 *      type: string
 *      description: suggestion of the user
 */


/**
 * @swagger
 * tags:
 *  name: Query
 *  description: The query managing API
*/


/**
 * @swagger
 * /api/services/query:
 *  post:
 *   summary: Create a new query
 *   security:
 *     - bearerAuth: []
 *   tags: [Query]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       ref: '#/components/schemas/Query'
 *   responses:
 *    200:
 *     description: The query sent successfully 
 *     content:
 *      application/json:
 *       schema:
 *         status: 
 *          type: boolean
 */


module.exports.query = async (req, res, next) => {
    try {
        const { name, email, ques, sug } = req.body;
        const query = new Query({
            username: name,
            email,
            ques,
            sug
        });
        
        await query.save();
        return res.json({status: true})
    }
    catch(err) {
        next(err);
    }
}


/**
 * @swagger
 * /api/services/allqueries:
 *  get:
 *   summary: Get all queries
 *   tags: [Query]
 *   responses:
 *    200:
 *     description: The queries were successfully retrieved
 *     content:
 *      application/json:
 *       schema:
 *         ref: '#/components/schemas/Query'
 */


module.exports.allQueries = async(req,res,next) => {
    try{
        const queries = await Query.find({})
        const queryArray = []
        for(let i=0; i<queries.length; i++){
            queryArray.push({...queries[i], id : i + 1})
        }
        // console.log(queryArray)
        return res.json(queryArray)
    }
    catch(err){
       next(err);
   }
}


/**
 * @swagger
 * components:
 *  schemas:
 *   Transaction:
 *    type: object
 *    required:
 *     - accountholder
 *     - phone
 *     - accountnumber
 *     - ifsc
 *     - amount
 *     - pincode
 *     - address
 *    properties:
 *     accountholder:
 *      type: string
 *      description: accountholder of the user
 *     phone:
 *      type: string
 *      description: phone of the user
 *     accountnumber:
 *      type: string
 *      description: accountnumber of the user
 *     ifsc:
 *      type: string
 *      description: ifsc code of the user
 *     amount:
 *      type: integer
 *      description: amount of the user
 *     pincode:
 *      type: string
 *      description: pincode of the user location
 *     address: 
 *      type: string 
 *      description: address of the user
 */


/**
 * @swagger
 * tags:
 *  name: Transaction
 *  description: The transaction managing API
*/


/**
 * @swagger
 * /api/services/transaction:
 *  post:
 *   summary: Create a new transaction
 *   security:
 *     - bearerAuth: []
 *   tags: [Transaction]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       ref: '#/components/schemas/Transaction'
 *   responses:
 *    200:
 *     description: The transaction was successful
 *     content:
 *      application/json:
 *       schema:
 *         status: 
 *          type: boolean
 */


module.exports.transaction = async (req, res, next) => {
    try {
        const { accountholder, phone, accountnumber, ifsc, amount, pincode, address } = req.body;
        const transaction = new Transaction({
            accountholder,
            phone,
            accountnumber,
            ifsc,
            amount,
            pincode,
            address
        });
        await transaction.save();
        return res.json({status: true})
    }
    catch(err) {
        next(err);
    }
}


/**
 * @swagger
 * /api/services/alltransactions:
 *  get:
 *   summary: Get all Transactions
 *   tags: [Transaction]
 *   responses:
 *    200:
 *     description: The transactions were successfully retrieved
 *     content:
 *      application/json:
 *       schema:
 *         ref: '#/components/schemas/Transaction'
 */


module.exports.allTransactions = async(req,res,next) => {
    try{
        const transactions = await Transaction.find({})
        const transactionArray = []
        for(let i=0; i<transactions.length; i++){
            transactionArray.push({...transactions[i], id : i + 1})
        }
        // console.log(queryArray)
        return res.json(transactionArray)
    }
    catch(err){
       next(err);
   }
}	