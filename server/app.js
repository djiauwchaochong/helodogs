const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

const axios = require('axios')
const server = axios.create({
  baseURL: 'https://dog.ceo/api'
})

const Redis = require('ioredis')
const redis = new Redis({
  port: 12719,
  host: "redis-12719.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "gajahjerapah",
});

app.use(cors())
app.use(express.json())
app.use('/', express.urlencoded({extended:false}))

app.get('/', async (req, res) => {
  try {
    res.status(200).json({message: `Welcome to HELODOGS Server`})
  } catch (error) {
    res.status(500).json(error)
  }
})

app.get('/data', async (req, res) => {
  try {
    
    const data = await redis.get('data')
    let array = []

    if (data) {
      array = JSON.parse(data)
    } else {
      const resultBreed = await server({
        url: `/breeds/list/all`,
        method: 'GET'
      })
      
      for (const key in resultBreed.data.message) {
        let obj = {
          breed: '',
          subbreed: [],
          images: []
        }
        obj.breed = key
  
        let subbreed = await server({
          url: `/breed/${key}/list`,
          method: 'GET'
        })
        if (subbreed.data.message.length == 0) {
          obj.subbreed = ['No Data']
        } else {
          obj.subbreed = subbreed.data.message
        }
        
        let images = await server({
          url: `/breed/${key}/images`,
          method: `GET`
        })
        obj.images = images.data.message
  
        array.push(obj)
      }
  
      await redis.set('data', JSON.stringify(array))  
    }

    if (req.query.breed) {
      const searchResult = array.filter(el =>{
        if (el.breed.includes(req.query.breed)) {
          return el
        }
      })
      res.status(200).json(searchResult)
    } else {
      res.status(200).json(array)
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

app.listen(port, () => {
  console.log(`This app is listening on port ${port} - Josep Immanuel`)
})