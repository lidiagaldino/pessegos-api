/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autora: Isabelle e Lidia
 * Data Criacao: 23/11/2022
 * Versao: 1.0
 * 
 *****************************************************************************************************************/



const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')

const listarTiposPizza = async () => {

    let tiposJSON = {}

    const { selectAllTiposPizza } = require('../model/DAO/tipos.js')

    const dados = await selectAllTiposPizza()

    if(dados){
        
        tiposJSON.message = dados
        tiposJSON.status = 200

    } else{
        tiposJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        tiposJSON.status = 404
    }

    return tiposJSON
}

const listarTiposBebidas = async () => {

    let tiposJSON = {}

    const { selectAllTiposBebidas } = require('../model/DAO/tipos.js')

    const dados = await selectAllTiposBebidas()

    if(dados){
        
        tiposJSON.message = dados
        tiposJSON.status = 200

    } else{
        tiposJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        tiposJSON.status = 404
    }

    return tiposJSON
}

module.exports = {
    listarTiposPizza,
    listarTiposBebidas
}