import express from 'express';
const router=express.Router()

router.get("/",(req,res)=>{
    res.send("rooms route here")
})
export default router;