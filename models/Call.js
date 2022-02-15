const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  clientNumber: { type: String },
  clientName: { type: String },
  clientType: { type: String },
  clientCondition: { type: String },
  clientCity: { type: String },
  clientIssue: { type: String },
  clientAppeal: { type: String },
  clientComment: { type: String },
  clientStatus: { type: String },
  clientSDate: { type: String },
  clientEDate: { type: String },
  clientRecord: { type: String },
  owner: { type: Types.ObjectId, ref: 'User' },
})

// экспортируем модель звонков
module.exports = model('Call', schema)
