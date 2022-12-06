/*****************************************************************************************************************
 * Objetivo: API responsavel pela manipulacao de dados do back end
    (GET, POST, PUT, DELETE)
 * Autora: Isabelle e Lidia
 * Data Criacao: 23/11/2022
 * Versao: 1.0
 * 
 * Anotacoes:
 
    //Para manipular o acesso ao BD podemos utilizar o Prisma
    //Para instalar o prisma, devemos rodar os seguintes comandos
    //npm install prisma --save
    //npx prisma
    //npx prisma init
    //npm install @prisma/client
 *****************************************************************************************************************/


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

app.get('/v1/usuario', cors(), async (request, response, next) => {
 
    const dadosUser = await controllerUsuario.listarUsuarios()

    response.status(dadosUser.status)
    response.json(dadosUser)
})

app.get('/v1/produtos/favoritos', cors(), async (request, response, next) => {
 
    const dadosFavoritos = await controllerProdutos.listarFavoritos()

    response.status(dadosFavoritos.status)
    response.json(dadosFavoritos)
})

app.get('/v1/produtos/promocoes', cors(), async (request, response, next) => {
 
    const dadosPromocoes = await controllerProdutos.listarPromocoes()

    response.status(dadosPromocoes.status)
    response.json(dadosPromocoes)
})

app.post('/v1/user/login', cors(), jsonParser, async (request, response, next) => {
 
    let headerContentType = request.headers['content-type']
    let statusCode
    let message

    if (headerContentType == 'application/json') {
        
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
            const dadosUser = await controllerUsuario.autenticar(dadosBody)

            statusCode = dadosUser.status
            message = dadosUser.message

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

// ------------- GET BY ID ------------- //

app.get('/v1/usuario/:id',cors(), async function (request, response) {

    let id = request.params.id
    let statusCode
    let message

    if (id != '' && id != undefined) {
        const dadosUser = await controllerUsuario.buscarUser(id)

        if (dadosUser) {
            statusCode = dadosUser.status
            message = dadosUser.message
        } else{
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else{
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.json(message)
    response.status(statusCode)
})


app.get('/v1/produtos/pizza/:id',cors(), async function (request, response) {

    let id = request.params.id
    let statusCode
    let message

    if (id != '' && id != undefined) {
        const dadosPizza = await controllerProdutos.buscarPizza(id)

        if (dadosPizza) {
            statusCode = dadosPizza.status
            message = dadosPizza.message
        } else{
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else{
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.json(message)
    response.status(statusCode)
})

app.get('/v1/produtos/bebida/:id',cors(), async function (request, response) {

    let id = request.params.id
    let statusCode
    let message

    if (id != '' && id != undefined) {
        const dadosBebida = await controllerProdutos.buscarBebida(id)

        if (dadosBebida) {
            statusCode = dadosBebida.status
            message = dadosBebida.message
        } else{
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else{
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.json(message)
    response.status(statusCode)
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


app.delete('/v1/usuario/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;

            //recebe o id enviado por parametro na requisicao
            let id = request.params.id

            //validacao do ID na requisicao
            if (id != '' && id != undefined)
            {
                //import do arquivo da controller de aluno
                const controllerUsuario = require('./controller/controllerUsuario.js')
                
                //chama a funcao de excluir aluno
                const deletarUser = await controllerUsuario.excluirUsuario(id);

                statusCode = deletarUser.status;
                message = deletarUser.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID
            } 


    response.status(statusCode);
    response.json(message)
});

app.put('/v1/produtos/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;

    let id = request.params.id

    if (id != '' && id != undefined){

        const deleteProduto = await controllerProdutos.deletarProduto(id);

        statusCode = deleteProduto.status
        message = deleteProduto.message

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID
    } 


    response.status(statusCode);
    response.json(message)
});

// ------------- UPDATE ------------- //

app.put('/v1/produtos/pizza/:id', cors(), jsonParser, async (request, response, next) => {

    let statusCode
    let message

    let headerContentType = request.headers['content-type']
    let id = request.params.id

    if (headerContentType == 'application/json') {
        
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {

            if (id != undefined && id != '') {

                dadosBody.id_pizza = id

                const atualizarPizza = await controllerProdutos.atualizarPizza(dadosBody)

                statusCode = atualizarPizza.status
                message = atualizarPizza.message
            } else{
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
             
            
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

app.put('/v1/produtos/bebida/:id', cors(), jsonParser, async (request, response, next) => {

    let statusCode
    let message

    let headerContentType = request.headers['content-type']
    let id = request.params.id

    if (headerContentType == 'application/json') {
        
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {

            if (id != undefined && id != '') {

                dadosBody.id_bebida = id

                const atualizarBebida = await controllerProdutos.atualizarBebida(dadosBody)

                statusCode = atualizarBebida.status
                message = atualizarBebida.message
            } else{
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
             
            
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

app.put('/v1/usuario/:id', cors(), jsonParser, async (request, response, next) => {
    let statusCode;
    let message;
    let headerContentType;

    //Recebe o tipo de content type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type']
    //console.log(headerContentType);

    //validar se o content type é do tipo application/json
    if (headerContentType == 'application/json') {
        //recebe conteudo do corpo da mensagem
        let dadosBody = request.body;
        
        //realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}' ) 
        {
            //recebe o id enviado por parametro na requisicao
            let id = request.params.id

            //validacao do ID na requisicao
            if (id != '' && id != undefined)
            {
                // adiciona o id no JSON que chegou do corpo da requisicao
                dadosBody.id = id;
                //import do arquivo da controller de curso
                const controllerUsuario = require('./controller/controllerUsuario.js')
                //chama funcao novoAluno da controller e encaminha  os dados do body
                const atualizarUser = await controllerUsuario.updateUser(dadosBody);

                statusCode = atualizarUser.status;
                message = atualizarUser.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID
            } 

        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY
        }


    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode);
    response.json(message)
});

app.put('/v1/produtos/favoritos/:id', cors(), jsonParser, async (request, response, next) => {

    let statusCode
    let message

    let id = request.params.id

    if (id != undefined && id != '') {

        const atualizarBebida = await controllerProdutos.adicionarFavorito(id)

        statusCode = atualizarBebida.status
        message = atualizarBebida.message
    } else{
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }
             
            

    response.status(statusCode)
    response.json(message)
})

app.listen(8080, function() {
    console.log('Waiting...')
})