const joi = require('joi')
const erros = require('../utils/erros')

const esquemaUsuario = joi.object({
    nome: joi.string().pattern(/[\p{L}]+/u).required().min(3).max(40).messages({
        'any.required': erros.obrigatorio,
        'string.empty': erros.obrigatorio,
        'string.pattern.base': erros.stringInvalida,
        'string.base': erros.stringInvalida,
        'string.min': erros.nomeIvalidoMin,
        'string.max': erros.nomeIvalidoMax
    }),

    email: joi.string().email().required().messages({
        'string.email': erros.campoInvalido,
        'any.required': erros.obrigatorio,
        'string.empty': erros.obrigatorio
    }),

    senha: joi.string().required().min(8).max(20).messages({
        'any.required': erros.obrigatorio,
        'string.empty': erros.obrigatorio,
        'string.min': erros.senhaIvalidaMin,
        'string.max': erros.senhaIvalidaMax
    })
})

module.exports = esquemaUsuario