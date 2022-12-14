const Joi = require('joi');
const knl = require('../knl');
const securityConsts = require('../consts/security-consts');
const { Op } = require("sequelize")


knl.post('collection', async (req, resp) => {
    const schema = Joi.object({
        description: Joi.string().min(1).max(100).required(),
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Collection.findAll({
        where: {
            description: req.body.description,
            status: 1
        }
    })

    knl.createException('0009', '', !knl.objects.isEmptyArray(result));

    const description = knl.sequelize().models.Collection.build({
        description: req.body.description,
        status: 1
    });

    await description.save();
    resp.end();
}, securityConsts.USER_TYPE_PUBLIC);

knl.get('collection', async (req, resp) => {
    const result = await knl.sequelize().models.Collection.findAll({
        where: {
            status: 1
        }
    })
    resp.send(result);
    resp.end();
});

knl.put('collection', async (req, resp) => {
    const result = await knl.sequelize().models.Collection.update({
        description: req.body.description,
    }, {
        where: {
            id: req.body.id
        }
    });

    resp.send(result);
})


knl.patch('collection', async (req, resp) => {
    if(req.body.status == 1){
        await knl.sequelize().models.Collection.update({
            status: "1"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.send("Ativado");
    } else {
         await knl.sequelize().models.Collection.update({
            status: "0"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.send("Desativado");
    }
       
});

knl.get("collectionsearch/:collectionname", async (req, resp) => {
    const query = `%${req.params.collectionname}%`; 

    const result = await knl.sequelize().models.Collection.findAll({
      where: { description: { [Op.like]: query },
      status : 1 }
    });

    resp.json(result);
})
