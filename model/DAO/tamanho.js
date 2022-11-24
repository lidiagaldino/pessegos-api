const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllTamanhos = async () => {

    const sql = `select * from tbl_tamanho`

    const rsTamanho = await prisma.$queryRawUnsafe(sql)

    if (rsTamanho.length > 0) {
        return rsTamanho
    } else{
        return false
    }
}

module.exports = {
    getAllTamanhos
}