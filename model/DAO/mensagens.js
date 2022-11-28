/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autora: Isabelle e Lidia
 * Data Criacao: 23/11/2022
 * Versao: 1.0
 *****************************************************************************************************************/


const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertMessages = async (mensagem) => {
    try {

        const { PrismaClient } = require('@prisma/client')

        const prisma = new PrismaClient();

        let sql = `insert into tbl_mensagem(texto, nome, email)
                        values( 
                            '${mensagem.texto}',
                            '${mensagem.nome}',
                            '${mensagem.email}'
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

const deleteMessage = async (id) => {

    try {

        const { PrismaClient } = require('@prisma/client')

        const prisma = new PrismaClient();

        let sql = `delete from tbl_mensagem
                                where id = '${id}'`;

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

const  selectMessageById = async function (id) {

    //Import da classe prismaClient, que é responsavel pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as id,
                                        nome,
                                         email,
                                          texto
                                            from tbl_mensagem
                                                  where id = ${id}`;

    //Criamos um objeto de tipo RecordSet (rsAlunos) para receber os dados de BD atraves do script SQL (select)
    const rsMensagem = await prisma.$queryRawUnsafe(sql)

    if (rsMensagem.length > 0)
        return rsMensagem;
    else 
        return false;
}



const selectAllMessages = async () => {

    const sql = `select * from tbl_mensagem order by id desc`

    const dados = await prisma.$queryRawUnsafe(sql)

    if (dados.length > 0) {
        return dados
    } else{
        return false
    }
}

module.exports = {
    selectAllMessages,
    insertMessages,
    deleteMessage,
    selectMessageById
}