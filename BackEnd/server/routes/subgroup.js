const Joi = require('joi');
const knl = require('../knl');
const { Op } = require("sequelize")

knl.post("subgroup", async (req, resp) => {
    const schema = Joi.object({
      description: Joi.string().min(1).max(100).required(),
      fkgroup: Joi.number().required(),
    });
  
    knl.validate(req.body, schema);
  
    const result = await knl.sequelize().models.Subgroup.findAll({
      where: {
        description: req.body.description,
      },
    });
  
    knl.createException("0011", "", !knl.objects.isEmptyArray(result));
  
    const user = knl.sequelize().models.Subgroup.build({
      fkgroup: req.body.fkgroup,
      description: req.body.description,
      status: 1,
    });
  
    await user.save();
    resp.end();
  });

// knl.get('subgroup', async(req, resp) => {
//     const result = await knl.sequelize().models.Subgroup.findAll({
//         where : {
//             status : 1
//         }
//     })
//     resp.send(result);
//     resp.end();
// });

knl.get('subgroup', async(req, resp) => {
    
    const subgroups = knl.objects.copy(await knl.sequelize().models.Subgroup.findAll({
        where : {
            status : 1
        }
     }))

     if (!knl.objects.isEmptyArray(subgroups)){
        for(const subgroup of subgroups){
            const group = await knl.sequelize().models.Group.findAll({
                where : {
                    id : subgroup.fkgroup
                }
            })

            if (!knl.objects.isEmptyArray(group)){
                subgroup.group_description = group[0].description
            }
            console.log(subgroup.group_description)
        }
     }

    resp.send(subgroups);
    resp.end();
});


knl.put('subgroup', async(req, resp) => {
    const result = await knl.sequelize().models.Subgroup.update({
        description : req.body.description,
        fkgroup : req.body.fkgroup,
    }, {
        where : {
        id : req.body.id
    }});
    
    resp.send(result);
})

knl.patch('subgroup', async (req, resp) => {
    if(req.body.status == 1){
         await knl.sequelize().models.Subgroup.update({
            status: "1"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.send("Ativado");
    } else {
         await knl.sequelize().models.Subgroup.update({
            status: "0"
        }, {
            where: {
                id: req.body.id,
            }
        });
        resp.send("Desativado");
    }
});

knl.get("subgroupsearch/:subgroup", async (req, resp) => {
    const query = `%${req.params.subgroup}%`; 

    const result = await knl.sequelize().models.Subgroup.findAll({
      where: { description: { [Op.like]: query },
    status : 1 }
    });

    resp.json(result);
})
