/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autora: Isabelle e Lidia
 * Data Criacao: 23/11/2022
 * Versao: 1.0
 *****************************************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const insertUser = async (user) => {
    try {

        let sql = `insert into tbl_usuario(senha, login)
                        values( 
                            md5('${user.senha}'),
                            '${user.login}'
                        )`;

const result = await prisma.$executeRawUnsafe (sql);

if (result) {
    return true;
}else
    return false;

} catch (error) {
    return false;
}

}

const updateUser = async function (usuario) {

    try {
    
        let sql = `update tbl_usuario set
                                        login  = '${usuario.login}',
                                        senha = md5('${usuario.senha}') where id = ${usuario.id}
                                         `;
     
    // executa o script sql no banco de dados
    //executeRawUnsafe permite encaminhar uma variavel contendo um script e nao um script direto
    const result = await prisma.$executeRawUnsafe (sql);
    
    // verifica se o script foi executado com sucesso no BD
        if (result) {
            return true;
        }else
            return false;
    
        } catch (error) {
            return false;
        }
}


const deleteUser = async (id) => {

    try {

        let sql = `delete from tbl_usuario
                                where id = '${id}'`;

                                console.log(sql)

 const result = await prisma.$executeRawUnsafe (sql);
    
// verifica se o script foi executado com sucesso no BD
    if (result) {
        return true;
    }else
        return false;
                                
    } catch (error) {
        return false;
    }
                            
}

const selectUserById = async function (id) {


                let sql = `select  
                                       id,
                                        login,
                                          senha
                                            from tbl_usuario
                                                  where id = ${id}`;

    //Criamos um objeto de tipo RecordSet (rsAlunos) para receber os dados de BD atraves do script SQL (select)
    const rsUser = await prisma.$queryRawUnsafe(sql)

    if (rsUser.length > 0)
        return rsUser;
    else 
        return false;
}


const selectAllUsers = async () => {

    const sql = `select * from tbl_usuario order by id desc`

    const dados = await prisma.$queryRawUnsafe(sql)

    if (dados.length > 0) {
        return dados
    } else{
        return false
    }
}

module.exports = {
    selectAllUsers,
    insertUser,
    deleteUser,
    selectUserById,
    updateUser
}