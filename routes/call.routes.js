const { Router } = require('express')
const mysql = require('mysql2')
const config = require('config')
const Call = require('../models/Call')
const auth = require('../middleware/auth.middleware')
const router = Router()

const connection = mysql.createConnection({
  host: config.get('mysqlHost'),
  user: config.get('mysqlUser'),
  password: config.get('mysqlPassword'),
  database: config.get('mysqlDb'),
})

router.post('/createcall', auth, async (req, res) => {
  try {
    const client = req.body

    const call = new Call({
      clientNumber: client.clientNumber,
      clientName: client.clientName,
      clientType: client.clientType,
      clientCondition: client.clientCondition,
      clientCity: client.clientCity,
      clientIssue: client.clientIssue,
      clientAppeal: client.clientAppeal,
      clientComment: client.clientComment,
      clientStatus: client.clientStatus,
      clientSDate: client.clientSDate,
      clientEDate: client.clientEDate,
      clientRecord: client.clientRecord,
      owner: req.user.userId,
    })
    await call.save()
    res.status(201).json({ call })
  } catch (e) {
    res.status(500).json({
      message: `call.routes.js: ${e.message}`,
    })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    //const calls = await Call.find({ owner: req.user.userId })
    connection.query('SELECT * FROM calls', (err, result) => {
      if (err) {
        console.log('Ощибка в запросе к MySql')
      } else {
        res.json(result)
      }
    })
    //res.json(calls)
  } catch (e) {
    res.status(500).json({
      message: `Что-то пошло не так в файле call.routes.js в получении всех звонков ${e.message}`,
    })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const call = await Call.findById(req.params.id)
    res.json(call)
  } catch (e) {
    res.status(500).json({
      message: `Что-то пошло не так в файле auth.routes.js в регистрации ${e.message}`,
    })
  }
})

module.exports = router
