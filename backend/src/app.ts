import express,{Application} from "express"

const app: Application = express()

app.get("/",(req,res)=>{
    res.status(200).send("Hello World")
})

export default app 
