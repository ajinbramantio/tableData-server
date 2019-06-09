var express = require('express')
var router = express.Router()

const { User, Sequelize } = require('../models')
const Op = Sequelize.Op

/* GET home page. */
router.get('/', async (req, res, next) => {
  let getAllData = await User.findAll({
    attributes: ['id', 'fullName', 'email', 'phone']
  }).then(data => {
    const AllUser = JSON.stringify(data)
    return JSON.parse(AllUser)
  })
  if (!getAllData.length) {
    res.send({
      message: 'data not there'
    })
  } else {
    res.send({
      message: 'get Data success',
      dataContacts: getAllData
    })
  }
})
router.post('/', async (req, res) => {
  let AllData = await User.findOne({
    where: {
      [Op.or]: [{ email: req.body.email }, { phone: req.body.phone }]
    }
  }).then(data => {
    const getData = JSON.stringify(data)
    const result = JSON.parse(getData)
    if (result === null) {
      return result
    } else {
      return [result]
    }
  })
  if (!AllData) {
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
  } else {
    res.send({
      message: 'data is ready exists'
    })
  }
})

router.delete('/delete/:id', async (req, res) => {
  const id = Number(req.params.id)

  await User.destroy({
    where: {
      id: id
    }
  }).then(async data => {
    if (!data) {
      res.send({
        message: 'id not There'
      })
    } else {
      let getAll = await User.findAll({
        attributes: ['id', 'fullName', 'email', 'phone']
      }).then(data => {
        const AllUser = JSON.stringify(data)
        return JSON.parse(AllUser)
      })
      res.send({
        message: 'deleted success',
        newData: getAll
      })
    }
  })
})

module.exports = router
