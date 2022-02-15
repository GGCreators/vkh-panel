const { Router } = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { ext, password } = req.body

    const candidate = await User.findOne({ ext: ext })

    if (candidate) {
      return res.status(400).json({ message: 'Ext существует' })
    }

    const user = new User({ ext, password })

    await user.save()

    res.status(201).json({ message: 'Ext создан' })
  } catch (e) {
    res.status(500).json({
      message: `auth.routes.js в регистрации ${e.message}`,
    })
  }
})

// /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { ext, password } = req.body

    const user = await User.findOne({ ext })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    const isMatch = user.password === password

    if (!isMatch) {
      return res.status(400).json({ message: 'Пароль неверный' })
    }

    const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
      expiresIn: '20h',
    })
    res.json({
      token,
      userId: user.id,
      userName: user.userName,
      userExt: user.ext,
    })
  } catch (e) {
    res.status(500).json({
      message: `auth.routes.js ${e.message}`,
    })
  }
})

// /api/auth/getUser
router.post('/getuser', async (req, res) => {
  try {
  } catch (e) {
    res
      .status(500)
      .json({ message: 'Что-то пошло не так в файле auth.routes.js' })
  }
})

module.exports = router
