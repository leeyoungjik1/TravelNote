const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('../config')
const logger = require('morgan')
const usersRouter = require('../src/routes/Users')
const itinerarysRouter = require('../src/routes/Itinerarys')


const corsOptions = {
    origin: '*',
    credentials: true
}

console.log("몽고아틀라스 주소: ", process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('데이터베이스 연결 성공')
    console.log('테스트')
})
.catch(e => console.log(`데이터베이스 연결 실패: ${e}`))

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true})) // form POST 요청 데이터를 req.body에서 받을 수 있도록
app.use(logger('tiny'))


app.use('/api/users', usersRouter)
app.use('/api/itinerarys', itinerarysRouter)
app.get("/", (req, res) => res.send("Express on Vercel"));

app.use((req, res, next) => {
    res.status(404).send('페이지를 찾을수 없습니다.')
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('서버 에러')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})