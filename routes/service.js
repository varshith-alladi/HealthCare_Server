const { query, transaction, allQueries, allTransactions } = require('../controllers/serviceController')
const { verifyToken } = require('../middlewares/verifyToken');

const router = require('express').Router()

router.post('/query', verifyToken, query)
router.post('/transaction', verifyToken, transaction)
router.get('/allqueries', allQueries)
router.get('/alltransactions',allTransactions)

module.exports = router