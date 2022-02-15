const express = require('express')
const app = express()
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/call', require('./routes/call.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    const server = app.listen(PORT, () =>
      console.log(`App and MongoDB has been started on ${PORT}...`)
    )
    const io = require('socket.io')(server)
    io.on('connection', (client) => {
      setInterval(() => {}, 3000)
      console.log(`V user with id: ${client.id} is connected`)
      client.on('disconnect', () => {
        console.log(`X user with id: ${client.id} is disconnected`)
      })
    })
  } catch (e) {
    console.log('Server error', e.message)
    process.exit(1)
  }
}

start()
