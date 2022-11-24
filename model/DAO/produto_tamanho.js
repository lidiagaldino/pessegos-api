const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const inserirProdutoTamanho = async (produto) => {

    try{

        const sql = `insert into tbl_produto_tamanho(preco, desconto, id_tamanho, id_produto)
                            values('${produto.preco}', '${produto.desconto}', '${produto.id_tamanho}', '${produto.id_produto}')`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else{
            return false
        }

    } catch(error){
        return false
    }
}

module.exports = {
    inserirProdutoTamanho
}