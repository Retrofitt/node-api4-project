const express = require('express')

const server = express()
server.use(express.json())

const initialUsers = ()=>([
    {username: 'john', password:'123abc'},
    {username: 'james', password:'123abc'},
    {username: 'arthur', password:'123abc'},
    {username: 'alex', password:'123abc'},
])

let users = initialUsers()

server.get('/', (req, res)=>{
    res.send('<h2>Welcome to my API on Heroku</h2>')
})

server.get('/api/users', async (req, res)=>{
    try{
        const getUsers = await Promise.resolve(users)
        res.status(200).json(getUsers)
    }catch (err){
        res.status(500).json({
            message:'Could not find users',
            error: err.message
        })
    }
})

server.post('/api/register', async (req,res)=>{
    try{
        const {username, password} = req.body
        if(!username || !password){
            res.status(400).json({
                message: "Please provide both username and password"
            })
        }else{
            const newUser = {username, password}
            users.push(newUser)
            res.status(201).json(newUser)
        }
    }catch (err){
        res.status(500).json({
            message:'Could not register',
            error: err.message
        })
    }
})

server.post('/api/login', (req,res)=>{
    try{
        const {username, password} = req.body
        if(!username || !password){
            res.status(400).json({
                message: "Please provide both username and password"
            })
        }else{
            res.status(200).json({
                message: "Welcome!"
            })
        }
    }catch (err){
        res.status(500).json({
            message:'Could not Login',
            error: err.message
        })
    } 
})

const port = process.env.PORT || 5000

server.listen(port,()=>{
    console.log(`listening on ${port}`)
})