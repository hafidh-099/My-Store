const express =require('express')
const router = express.Router();

router.get('/',(req,res)=>{
    const cookes = req.get('cookie')
    console.log(cookes)
});
//send cookie
router.post('/',(req,res)=>{
    res.cookie('isLoggedIng','true')
    res.send('cockie Send')
})
module.exports=router; 