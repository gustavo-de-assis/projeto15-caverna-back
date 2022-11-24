import express, { json } from 'express'
import cors from 'cors'
import router from './routes/index.js';

//configs
const app = express();
app.use(json())
app.use(cors())
app.use(router)

const port = process.env.PORT || 5000

app.listen(port, ()=>console.log(`App running on port ${port}`))