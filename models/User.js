const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  ext: { type: String, unique: true, required: true },
  userName: { type: String, default: '' },
  password: { type: String, required: true },
  calls: [{ type: Types.ObjectId, ref: 'Call' }],
})

// экспортируем модель юзера
module.exports = model('User', schema)
