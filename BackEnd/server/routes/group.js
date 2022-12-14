const Joi = require('joi');
const knl = require('../knl');
const { Op } = require("sequelize")
knl.post('group', async (req, resp) => {
    const schema = Joi.object({
        description: Joi.string().min(1).max(100).required(),
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Group.findAll({
        where: {
            description: req.body.description,
            status: 1
        }
    })

    knl.createException('0009', '', !knl.objects.isEmptyArray(result));

    const description = knl.sequelize().models.Group.build({
        description: req.body.description,
        status: 1
    });

    await description.save();
    resp.end();
})

knl.get('group', async (req, resp) => {
    const result = await knl.sequelize().models.Group.findAll({
        where: {
            status: 1
        }
    })
    resp.send(result);
    resp.end();
});

knl.put('group', async (req, resp) => {
    const result = await knl.sequelize().models.Group.update({
        description: req.body.description,
    }, {
        where: {
            id: req.body.id
        }
    });

    resp.send(result);
})

knl.patch('group', async (req, resp) => {
    if(req.body.status == 1){
         await knl.sequelize().models.Group.update({
            status: "1"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.end();
    } else {
         await knl.sequelize().models.Group.update({
            status: "0"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.end();
    }
       
});

knl.get("groupsearch/:groupname", async (req, resp) => {
    const query = `%${req.params.groupname}%`; 

    const result = await knl.sequelize().models.Group.findAll({
      where: { description: { [Op.like]: query },
      status : 1 }
    });

    resp.json(result);
})


knl.get("groupall", async (req, resp) => {

    const result = await knl.sequelize().models.Group.findAll(
    );

    resp.json(result);
})