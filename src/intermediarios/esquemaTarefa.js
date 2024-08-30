const joi = require('joi');
const errors = require('../utils/erros.js');

const esquemaTarefa = joi.object({
    titulo: joi.string().min(3).max(100).required().messages({
        'any.required': errors.obrigatorio,
        'string.empty': errors.obrigatorio,
        'string.pattern.base': errors.tituloInvalido,
        'string.min': errors.tituloInvalido,
        'string.max': errors.tituloInvalido
    }),

    descricao: joi.string().min(10).max(500).required().messages({
        'any.required': errors.obrigatorio,
        'string.empty': errors.obrigatorio,
        'string.min': errors.descricaoInvalida,
        'string.max': errors.descricaoInvalida
    }),

    completa: joi.boolean().required().messages({
        'any.required': errors.obrigatorio,
        'boolean.base': errors.isCompletInvalido
    })
});

module.exports = esquemaTarefa;
