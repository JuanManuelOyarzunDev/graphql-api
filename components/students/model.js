'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
})

const model = mongoose.model('students', mySchema)

module.exports = model
