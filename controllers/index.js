const express = require('express');
const router = express.Router();
const apiRoutes = require("./api")
const homeRoutes = require('./homeRoutes');
const dashRoutes = require('./dashRoutes');

router.use("/api",apiRoutes)
router.use('/dash', dashRoutes);
router.use('/', homeRoutes);

router.get("/sessiondata",(req,res)=>{
    res.json({session:req.session})
})

module.exports = router;