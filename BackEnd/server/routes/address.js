const knl = require('../knl');
const { Op } = require("sequelize")

knl.get('adress', async (req, resp) => {
    const result = await knl.sequelize().models.Adress.findAll({
        where: {
            status: 1
        }
    })
    resp.send(result);
    resp.end();
});

knl.get("adresssearch/:street", async (req, resp) => {
    const query = `%${req.params.street}%`; 

    const result = await knl.sequelize().models.Adress.findAll({
      where: { street: { [Op.like]: query },
    status : 1 }
    });

    resp.json(result);
})

knl.patch('adress', async (req, resp) => {
    if(req.body.status == 1){
         await knl.sequelize().models.Adress.update({
            status: "1"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.send("Ativado");
    } else {
        await knl.sequelize().models.Adress.update({
            status: "0"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.send("Desativado");
    }   
});