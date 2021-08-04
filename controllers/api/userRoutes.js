const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require('../../models');
const { bulkBuild } = require('../../models/user');

router.post("/",(req,res)=>{
    db.User.create(req.body).then(user=>{
        req.session.user = {
            id:user.id,
            username:user.username,
            email:user.email
        }
        res.json(user);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

router.post("/login",(req,res)=>{
    db.User.findOne({
        where:{
            email:req.body.email
        }
    }).then(user=>{
        if(!user){
            res.status(403).json({
                message:"incorrect login, please try again"
            })
        }else {
            const correctPassword = bcrypt.compareSync(req.body.password,user.password);
            if(correctPassword){
                req.session.user = {
                    id:user.id,
                    username:user.username,
                    email:user.email
                }
                res.json(user);
            } else {
                res.status(403).json({
                    message:"incorrect login, please try again"
                })
            }
        }
    })
})

router.get("/",(req,res)=>{
    db.User.findAll({
        include:[db.Post],
    }).then( users=>{
        res.json(users);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

router.get("/:id",(req,res)=>{
    db.User.findByPk(req.params.id,{
        include:[{
            model:db.Post
        }]
    }).then(users=>{
        res.json(users);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})




module.exports = router;