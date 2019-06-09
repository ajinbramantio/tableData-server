var express = require('express')
var router = express.Router()

const { User } = require('../models')

/* GET home page. */
router.get('/', async (req, res, next) => {
  let getAllData = await User.findAll({
    attributes: ['id', 'fullName', 'email', 'phone']
  }).then(data => {
    const AllUser = JSON.stringify(data)
    return JSON.parse(AllUser)
  })
  res.send({
    message: 'success',
    dataContacts: getAllData
  })
})
router.post('/', async (req, res) => {
  console.log(req.body)
  const postSuccess = await User.create({
    ...req.body
  }).then(postResult => {
    const result = JSON.stringify(postResult)
    // console.log(JSON.parse(result))

    return JSON.parse(result)
  })
  let { createdAt, updatedAt, ...result } = postSuccess

  res.send({
    message: 'post success',
    newData: result
  })
})

module.exports = router
