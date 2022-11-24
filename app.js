const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const controllerTipos = require('./controller/controllerTipos.js')
const controllerMensagem = require('./controller/controllerMensagens.js')
const controllerProdutos = require('./controller/controllerProdutos.js')
const controllerTamanho = require('./controller/controllerTamanho.js')
const controllerUsuario = require('./controller/controllerUsuario.js')
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('./modulo/config.js')
const { response } = require('express')

app.use((request, response, next) => {
    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())

    next()
})

const jsonParser = bodyParser.json()

// ------------- GET ------------- //

app.get('/v1/tipo/pizza', cors(), async (request, response, next) => {
 
    const dadosTipo = await controllerTipos.listarTiposPizza()

    response.status(dadosTipo.status)
    response.json(dadosTipo)
})

app.get('/v1/tipo/bebida', cors(), async (request, response, next) => {
 
    const dadosTipo = await controllerTipos.listarTiposBebidas()

    response.status(dadosTipo.status)
    response.json(dadosTipo)
})

app.get('/v1/mensagem', cors(), async (request, response, next) => {
 
    const dadosMessage = await controllerMensagem.listarMenssagens()

    response.status(dadosMessage.status)
    response.json(dadosMessage)
})

app.get('/v1/produtos/pizza', cors(), async (request, response, next) => {
 
    const dadosPizza = await controllerProdutos.listarPizzas()

    response.status(dadosPizza.status)
    response.json(dadosPizza)
})

app.get('/v1/produtos/bebida', cors(), async (request, response, next) => {
 
    const dadosBebida = await controllerProdutos.listarBebidas()

    response.status(dadosBebida.status)
    response.json(dadosBebida)
})

app.get('/v1/produtos/tamanho', cors(), async (request, response, next) => {
 
    const dadosTamanho = await controllerTamanho.listarTamanhos()

    response.status(dadosTamanho.status)
    response.json(dadosTamanho)
})

// ------------- POST ------------- //

app.post('/v1/produtos/pizza', cors(), jsonParser, async (request, response, next) => {

    let headerContentType = request.headers['content-type']
    let statusCode
    let message

    if (headerContentType == 'application/json') {
        
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
             
            const novaPizza = await controllerProdutos.novaPizza(dadosBody)

            statusCode = novaPizza.status
            message = novaPizza.message

        } else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }
    
    response.status(statusCode)
    response.json(message)
})

app.post('/v1/produtos/bebida', cors(), jsonParser, async (request, response, next) => {

    let headerContentType = request.headers['content-type']
    let statusCode
    let message

    if (headerContentType == 'application/json') {
        
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
             
            const novaBebida = await controllerProdutos.novaBebida(dadosBody)

            statusCode = novaBebida.status
            message = novaBebida.message

        } else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }
    
    response.status(statusCode)
    response.json(message)
})

app.post('/v1/mensagem', cors(), jsonParser, async (request, response, next) => {

    let headerContentType = request.headers['content-type']
    let statusCode
    let message

    if (headerContentType == 'application/json') {
        
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
             
            const novaMensagem = await controllerMensagem.novaMensagem(dadosBody)

            statusCode = novaMensagem.status
            message = novaMensagem.message

        } else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }
    
    response.status(statusCode)
    response.json(message)
})

app.post('/v1/usuario', cors(), jsonParser, async (request, response, next) => {

    let headerContentType = request.headers['content-type']
    let statusCode
    let message

    if (headerContentType == 'application/json') {
        
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
             
            const newUser = await controllerUsuario.novoUser(dadosBody)

            statusCode = newUser.status
            message = newUser.message

        } else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }
    
    response.status(statusCode)
    response.json(message)
})

// ------------- DELETE ------------- //

app.delete('/v1/mensagem/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;

            //recebe o id enviado por parametro na requisicao
            let id = request.params.id

            //validacao do ID na requisicao
            if (id != '' && id != undefined)
            {
                //import do arquivo da controller de aluno
                const controllerMensagens = require('./controller/controllerMensagens.js')
                
                //chama a funcao de excluir aluno
                const deletarMensagem = await controllerMensagens.excluirMensagem(id);

                statusCode = deletarMensagem.status;
                message = deletarMensagem.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID
            } 


    response.status(statusCode);
    response.json(message)
});

// ------------- UPDATE ------------- //

app.put('/v1/produtos/pizza', cors(), jsonParser, async (request, response, next) => {

    let statusCode
    let message

    let headerContentType = request.headers['content-type']

    if (headerContentType == 'application/json') {
        
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
             
            const atualizarPizza = await controllerProdutos.atualizarPizza(dadosBody)

            statusCode = atualizarPizza.status
            message = atualizarPizza.message
        } else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)
})


app.listen(8080, function() {
    console.log('Waiting...')
})