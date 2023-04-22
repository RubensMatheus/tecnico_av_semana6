const express = require('express')
const router = express.Router()
const { Produto, Tag } = require('../models')
const moment = require('moment')
moment.locale('pt-br')

router.get('/', async (req, res) => {
    const produtos = await Produto.findAll({
        include: [
          {
            model: Tag,
        }],raw: false, nest: true,
      })
    const prodResult = produtos.map((produto) => prepararResultado(produto ))
    // console.log(prodResult)
    res.render('pages/index', {produtos: prodResult, layout: 'layouts/layout-produtos.ejs'})
})

function prepararResultado(post){

    const result = Object.assign({}, post)
    result.postadoEm = moment(new Date(result.dataValues.createdAt)).format('L')

    if (result.dataValues.createdAt) delete result.dataValues.createdAt
    if (result.dataValues.updatedAt) delete result.dataValues.updatedAt
    if (result.dataValues.userId) delete result.dataValues.userId
    if(result._previousDataValues) delete result._previousDataValues
    if(result._changed) delete result._changed
    if(result._options) delete result._options
    return result
}

module.exports = router