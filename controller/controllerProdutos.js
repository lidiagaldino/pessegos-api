const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')
const produtos = require('../model/DAO/produtos.js')
const pizzaTamanho = require('../model/DAO/produto_tamanho.js')

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
            
        const resultPizza = await produtos.updatePizza(pizza)

        if (resultPizza || resultProduto) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        }else{
            return {message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR, status: 500}
        }
    } else{
        return {message: MESSAGE_ERROR.NOT_FOUND_DB, status: 404} 
    }
}

module.exports = {
    listarPizzas,
    listarBebidas,
    novaPizza,
    novaBebida,
    atualizarPizza
}