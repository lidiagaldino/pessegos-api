const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllPizzas = async () => {

    const sql = `select tbl_tamanho.nome as tamanho, round(tbl_produto_tamanho.preco, 2) as preco, tbl_produto_tamanho.desconto, tbl_produto.nome, tbl_produto.descricao, tbl_produto.imagem, tbl_tipo_pizza.tipo, tbl_produto.id from tbl_produto
	inner join tbl_pizza on tbl_produto.id = tbl_pizza.id_produto
    inner join tbl_produto_tamanho on tbl_produto_tamanho.id_produto = tbl_produto.id
    inner join tbl_tamanho on tbl_tamanho.id = tbl_produto_tamanho.id_tamanho
    inner join tbl_tipo_pizza on tbl_tipo_pizza.id = tbl_pizza.id_tipo_pizza;`

    const rsPizza = await prisma.$queryRawUnsafe(sql)

    if (rsPizza.length > 0) {
        return rsPizza
    } else{
        return false
    }
}

const selectAllBebidas = async () => {

    const sql = `select tbl_tamanho.nome as tamanho, round(tbl_produto_tamanho.preco,2) as preco, tbl_produto_tamanho.desconto, tbl_produto.nome, tbl_produto.descricao, tbl_produto.imagem, tbl_tipo_bebida.tipo, tbl_produto.id from tbl_produto
	inner join tbl_bebida on tbl_produto.id = tbl_bebida.id_produto
    inner join tbl_produto_tamanho on tbl_produto_tamanho.id_produto = tbl_produto.id
    inner join tbl_tamanho on tbl_tamanho.id = tbl_produto_tamanho.id_tamanho
    inner join tbl_tipo_bebida on tbl_tipo_bebida.id = tbl_bebida.id_tipo_bebida;`

    const rsPizza = await prisma.$queryRawUnsafe(sql)

    if (rsPizza.length > 0) {
        return rsPizza
    } else{
        return false
    }
}

const insertProduto = async (produto) => {

    try{

        const sql = `insert into tbl_produto(nome, descricao, imagem)
                            values('${produto.nome}', '${produto.descricao}', '${produto.imagem}')`

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

const updateProduto = async (produto) => {

     try {
        
        const sql = `update tbl_produto set nome = '${produto.nome}', preco = ${produto.preco}, descricao = '${produto.descricao}', imagem = '${produto.imagem}', desconto = ${produto.desconto} where id = ${produto.id_produto}`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }else{
            return false
        }

     } catch (error) {
        return false
     }
}

const deleteProduto = async (id) => {

    try {
        
        const sql = `delete from tbl_produto where id = ${id}`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else{
            return false
        }

    } catch (error) {
        return false
    }
} // TERMINAR

const insertPizza = async (pizza) => {

    try {
        
        const sql = `insert into tbl_pizza(id_produto, id_tipo_pizza) 
                            values(${pizza.id_produto}, ${pizza.id_tipo_pizza})`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else{
            return false
        }
    } catch (error) {
        return false
    }
}

const updatePizza = async (pizza) => {

    try {
        
        const sql = `update tbl_pizza set id_produto = ${pizza.id_produto}, id_tipo_pizza = ${pizza.id_tipo_pizza}, id_tamanho = ${pizza.id_tamanho} where id = ${pizza.id_pizza}`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const insertBebida = async (bebida) => {

    try {
        
        const sql = `insert into tbl_bebida(id_produto, id_tipo_bebida, id_tamanho, teor_alcoolico) 
                        values(${bebida.id_produto}, ${bebida.id_tipo_pizza}, ${bebida.id_tamanho}, ${bebida.teor_alcoolico})`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else{
            return false
        }

    } catch (error) {
        return false
    }
}

const selectPizzaById = async (id) => {

    const sql = `select tbl_produto.nome, tbl_produto.imagem, tbl_produto.descricao, tbl_produto.desconto, tbl_produto.favoritos, round(tbl_produto.preco, 2) as preco, tbl_tamanho.nome as tamamho, tbl_tipo_pizza.tipo  
    from tbl_pizza 
        inner join tbl_produto on tbl_pizza.id_produto = tbl_produto.id 
        inner join tbl_tamanho on tbl_tamanho.id = tbl_pizza.id_tamanho 
        inner join tbl_tipo_pizza on tbl_tipo_pizza.id = tbl_pizza.id_tipo_pizza 
    where tbl_pizza.id = ${id}`

    const rsPizza = await prisma.$queryRawUnsafe(sql)

    if(rsPizza.length > 0){
        return rsPizza
    } else{
        return false
    }
}

const selectLastIdProduto = async () => {

    const sql = `select id from tbl_produto order by id desc limit 1`

    const result = await prisma.$queryRawUnsafe(sql)

    if (result) {
        return result[0].id
    } else{
        return false
    }
}

module.exports = {
    selectAllPizzas,
    selectAllBebidas,
    selectLastIdProduto,
    insertPizza,
    insertProduto,
    deleteProduto,
    insertBebida,
    updatePizza,
    selectPizzaById,
    updateProduto
}