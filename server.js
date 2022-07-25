const express = require('express')
const cors = require('cors')
const fs = require("fs")
const app = express()
const PORT = 3000
const server = app.listen(PORT,() => {
    console.log(`${PORT} IS OPEN`)
})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.post('/sendimage_by_base64',(req,res) => {
    const { body } = req
    const { data } = body 
    const base64Data = data.replace(/^data:image\/jpeg;base64,/, "");
    fs.writeFile("out.jpg", base64Data, 'base64',(err) => {
     console.log(err) 
     res.json({msg: '上傳成功'})  
    });
    
    
})

