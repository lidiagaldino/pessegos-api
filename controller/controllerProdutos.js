/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autora: Isabelle e Lidia
 * Data Criacao: 23/11/2022
 * Versao: 1.0
 * 
 *****************************************************************************************************************/

const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')
const produtos = require('../model/DAO/produtos.js')
const pizzaTamanho = require('../model/DAO/produto_tamanho.js')
const e = require('express')

const listarPizzas = async () => {

    let pizzasJSON = {}

    const dados = await produtos.selectAllPizzas()

    if (dados) {
        pizzasJSON.message = dados
        pizzasJSON.status = 200
    } else{
        pizzasJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        pizzasJSON.status = 404
    }

    return pizzasJSON
}

const listarBebidas = async () => {

    let bebidasJSON = {}

    const dados = await produtos.selectAllBebidas()

    if (dados) {
        bebidasJSON.message = dados
        bebidasJSON.status = 200
    } else{
        bebidasJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        bebidasJSON.status = 404
    }

    return bebidasJSON
}

const novaPizza = async (pizza) => {

    if (pizza.id_tamanho == undefined || pizza.id_tamanho == '' || pizza.id_tipo_pizza == undefined || pizza.id_tipo_pizza == '' || pizza.nome == undefined || pizza.nome == '' || pizza.preco == undefined || pizza.preco == '' || pizza.descricao == undefined || pizza.descricao == '' || pizza.imagem == undefined || pizza.imagem == '' || pizza.desconto == undefined || pizza.desconto == '') {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

    const inserirProduto = await produtos.insertProduto(pizza)

    if (inserirProduto) {
        const lastId = await produtos.selectLastIdProduto()
        
        if (lastId > 0) {

            let novaPizza = {
                id_produto: lastId,
                id_tamanho: pizza.id_tamanho,
                preco: pizza.preco,
                desconto: pizza.desconto,
                id_tipo_pizza: pizza.id_tipo_pizza
            }

            const inserirPizza = await produtos.insertPizza(novaPizza)

            if (inserirPizza) {
                const inserirPizzaTamanho = await pizzaTamanho.inserirProdutoTamanho(novaPizza)

                if (inserirPizzaTamanho) {
                    return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
                } else{
                    await produtos.deleteProduto(lastId)
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
                }
                
            } else{
                console.log('aqi')
                await produtos.deleteProduto(lastId)
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }
    } else{
        return {message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR, status: 500}
    }
}

const novaBebida = async (bebida) => {

    if (bebida.id_tamanho == undefined || bebida.id_tamanho == '' || bebida.id_tipo_bebida == undefined || bebida.id_tipo_bebida == '' || bebida.nome == undefined || bebida.nome == '' || bebida.preco == undefined || bebida.preco == '' || bebida.descricao == undefined || bebida.descricao == '' || bebida.imagem == undefined || bebida.imagem == '' || bebida.desconto == undefined || bebida.desconto == '' || bebida.teor_alcoolico == undefined || bebida.teor_alcoolico == '') {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

    const inserirProduto = await produtos.insertProduto(bebida)

    if (inserirProduto) {
        
        const lastId = await produtos.selectLastIdProduto()

        if (lastId > 0) {
            
            let novaBebida = {
                id_produto: lastId,
                id_tamanho: bebida.id_tamanho,
                id_tipo_pizza: bebida.id_tipo_bebida,
                teor_alcoolico: bebida.teor_alcoolico
            }

            const inserirBebida = await produtos.insertBebida(novaBebida)

            if (inserirBebida) {
                return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
            } else{
                await produtos.deleteProduto(lastId)
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }
    }
    else{
        return {message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR, status: 500}
    }
}

const atualizarPizza = async (pizza) => {

    if (pizza.id_produto == undefined || pizza.id_produto == '' || pizza.id_tamanho == undefined || pizza.id_tamanho == '' || pizza.id_tipo_pizza == undefined || pizza.id_tipo_pizza == '' || pizza.nome == undefined || pizza.nome == '' || pizza.preco == undefined || pizza.preco == '' || pizza.descricao == undefined || pizza.descricao == '' || pizza.imagem == undefined || pizza.imagem == '' || pizza.desconto == undefined || pizza.desconto == '') {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(pizza.id_pizza == '' || pizza.id_pizza == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }

    const verificar = await produtos.selectPizzaById(pizza.id_pizza)

    if (verificar) {
        
        const resultProduto = await produtos.updateProduto(pizza)

        const resultTamanho = await produtos.updateTamanho(pizza)
            
        const resultPizza = await produtos.updatePizza(pizza)

        if (resultPizza || resultProduto || resultTamanho) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        }else{
            return {message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR, status: 500}
        }
    } else{
        return {message: MESSAGE_ERROR.NOT_FOUND_DB, status: 404} 
    }
}

const atualizarBebida = async (bebida) => {

    if (bebida.id_produto == undefined || bebida.id_produto == '' || bebida.id_tamanho == undefined || bebida.id_tamanho == '' || bebida.id_tipo_bebida == undefined || bebida.id_tipo_bebida == '' || bebida.nome == undefined || bebida.nome == '' || bebida.preco == undefined || bebida.preco == '' || bebida.descricao == undefined || bebida.descricao == '' || bebida.imagem == undefined || bebida.imagem == '') {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(bebida.id_bebida == '' || bebida.id_bebida == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }

    const verificar = await produtos.selectBebidaById(bebida.id_bebida)

    if (verificar) {
        
        const resultProduto = await produtos.updateProduto(bebida)

        const resultTamanho = await produtos.updateTamanho(bebida)

        const resultBebida = await produtos.updateBebida(bebida)

        if (resultBebida || resultProduto || resultTamanho) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        }else{
            return {message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR, status: 500}
        }
    } else{
        return {message: MESSAGE_ERROR.NOT_FOUND_DB, status: 404} 
    }
}

const buscarPizza = async (id) => {

    if (id == undefined || id == '') {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }

    const dadosPizza = await produtos.selectPizzaById(id)

    if (dadosPizza) {
        return {status: 200, message: dadosPizza}
    } else{
        return false
    }
}

const buscarBebida = async (id) => {

    if (id == undefined || id == '') {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }

    const dadosbebida = await produtos.selectBebidaById(id)

    if (dadosbebida) {
        return {status: 200, message: dadosbebida}
    } else{
        return false
    }
} 

const listarFavoritos = async () => {

    let dadosFavoritosJSON = {}

    const dadosFavoritos = await produtos.selectFavoritos()

    if (dadosFavoritos) {
        dadosFavoritosJSON.status = 200
        dadosFavoritosJSON.message = dadosFavoritos
    } else{
        dadosFavoritosJSON.status = 404
        dadosFavoritosJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    return dadosFavoritosJSON
}

const listarPromocoes = async () => {

    let dadosPromocoesJSON = {}

    const dadosPromocoes = await produtos.selectPromocoes()

    if (dadosPromocoes) {
        dadosPromocoesJSON.status = 200
        dadosPromocoesJSON.message = dadosPromocoes
    } else{
        dadosPromocoesJSON.status = 404
        dadosPromocoesJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    return dadosPromocoesJSON
}

const deletarProduto = async (id) => {

    if (id == undefined || id == '') {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }

    const verificar = await produtos.selectProdutoById(id)

    if (verificar) {
        
        const deleteProduto = await produtos.deletarProdutoUpdate(id)

        if (deleteProduto) {
            return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM}
        } else{
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
        
    } else{
        return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
    }
}

module.exports = {
    listarPizzas,
    listarBebidas,
    novaPizza,
    novaBebida,
    atualizarPizza,
    buscarPizza,
    buscarBebida,
    atualizarBebida,
    listarFavoritos,
    listarPromocoes,
    deletarProduto
}