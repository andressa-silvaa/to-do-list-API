const joi = require('joi')
const erros = require('../utils/erros')

const esquemaLogin = joi.object({
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

module.exports = esquemaLogin