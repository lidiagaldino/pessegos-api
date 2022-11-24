const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllTiposPizza = async () => {

    const sql = `select * from tbl_tipo_pizza`

    const rsTipos = await prisma.$queryRawUnsafe(sql)

    if (rsTipos.length > 0) {
        return rsTipos
    } else{
        return false
    }
}

const selectAllTiposBebidas = async () => {

    const sql = `select * from tbl_tipo_bebida`

    const rsTipos = await prisma.$queryRawUnsafe(sql)

    if (rsTipos.length > 0) {
        return rsTipos
    } else{
        return false
    }
}

module.exports = {
    selectAllTiposPizza,
    selectAllTiposBebidas
}