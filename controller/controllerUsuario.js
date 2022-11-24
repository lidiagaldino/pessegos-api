const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')
const newUser = require('../model/DAO/usuario.js');

const listarUsuarios = async () => {

    let usuariosJSON = {}

    const dados = await newUser.selectAllUsers()

    if (dados) {
        usuariosJSON.message = dados
        usuariosJSON.status = 200
    } else{
        usuariosJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        usuariosJSON.status = 404
    }

    return usuariosJSON
}

const novoUser = async (user) => {

    //validacao de campos obrigatórios  
    if (user.login == undefined || user.login == '' || user.senha == '' || user.senha == undefined ) {
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    }
    else
    {

        //chama funcao para inserir um  novo user
        const resultNewUser = await newUser.insertUser(user);

        if (resultNewUser) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        } else 
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
      }

}

const updateUser = async (user) => {

    //validacao para o id como campo obrigatorio
    if (user.id == '' || user.id == undefined)
        return {status: 400, MESSAGE: MESSAGE_ERROR.REQUIRED_ID}
        else if (user.login == undefined || user.login == '' || user.senha == '' || user.senha == undefined) {
            return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
        }
        else 
        {
            const atualizarUser = require ('../model/DAO/usuario.js');

            const result = await atualizarUser.updateUser(id)

            if (result) {
                return {status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM};
            } else 
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
}

const excluirUsuario = async (id) => {

//validacao para o id como campo obrigatorio
    if (id == '' || id == undefined)
        return {status: 400, MESSAGE: MESSAGE_ERROR.REQUIRED_ID}

    const usuario = await newUser.selectUserById(id)

    if(usuario) {
        const deletarUser = require('../model/DAO/mensagens.js')

         //funcao para deletar um curso
         const result = await deletarUser.deleteMessage(id);
 
         if (result) {
             return {status: 201, message: MESSAGE_SUCCESS.DELETE_ITEM};
         } else 
             return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
     } else {
         return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB};
     }
        
}


module.exports = {
    listarUsuarios,
    novoUser,
    excluirUsuario,
    updateUser
}