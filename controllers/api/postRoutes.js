const express = require('express');
const router = express.Router();
const db = require('../../models');


router.get("/",(req,res)=>{
    db.Post.findAll({
        include:[db.Comment]
    }).then(post =>{
        res.json(post);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

router.post("/",(req,res)=>{
    if(req.session.user){
    db.Post.create({
        UserId:req.session.user.id,
        description:req.body.description,
    }).then(post=>{
        res.json(post);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
    }else {
        res.status(403).send("not logged in")
    }
})

router.delete("/:id",(req,res)=>{
    db.Post.destroy({
        where:{
            id:req.params.id
        }
    }).then(post=>{
        res.json(post);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

router.put('/:id', (req, res) => {
    db.Post.update(
      {
        description: req.body.description
      },
      {     
        where: {
          id: req.params.id,
        },
      }
    )
      .then((post) => {
        res.json(post);
      })
      .catch((err) => {
      console.log(err);
      res.json(err)
      });
  });

  router.get("/:id",(req,res)=>{
    db.Post.findByPk(req.params.id,{
        include:[{
            model:db.Comment
        }]
    }).then(post=>{
        res.json(post);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})


module.exports = router;