const express = require('express');
const router = express.Router();
const db = require('../../models');


router.get("/",(req,res)=>{
    db.Comment.findAll({
        include:[db.User]
    }).then(comment =>{
        res.json(comment);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

router.post("/",(req,res)=>{
    if(req.session.user){
    db.Comment.create({
        description:req.body.description,
    }).then(comment=>{
        res.json(comment);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
    }else {
        res.status(403).send("not logged in")
    }
})

router.delete("/:id",(req,res)=>{
    db.Comment.destroy({
        where:{
            id:req.params.id
        }
    }).then(comment=>{
        res.json(comment);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

router.put('/:id', (req, res) => {
    db.Comment.update(
      {
        description: req.body.description
      },
      {     
        where: {
          id: req.params.id,
        },
      }
    )
      .then((comment) => {
        res.json(comment);
      })
      .catch((err) => {
      console.log(err);
      res.json(err)
      });
  });

  router.get("/:id",(req,res)=>{
    db.Comment.findByPk(req.params.id,{
        include:[{
            model:db.User
        }]
    }).then(comment=>{
        res.json(comment);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})


module.exports = router;