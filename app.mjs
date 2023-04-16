import express from 'express'
import webhookRoute from './routes/webhook.mjs'

const app = express()
const PORT = process.env.PORT || 8081

app.use(express.json())

app.get('/', (req, res) => res.send('server is perfectly running'))
app.use('/webhook', webhookRoute)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`))