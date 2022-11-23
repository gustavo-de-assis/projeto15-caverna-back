import express, { json } from 'express'
import cors from 'cors'

//configs
const app = express();
app.use(json())
app.use(cors())

const port = process.env.PORT || 5000

app.listen(port, ()=>console.log(`App running on port ${port}`))