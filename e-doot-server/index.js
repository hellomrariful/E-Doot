const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000
const { Server } = require('socket.io');
const { createServer } = require('node:http');

const server = createServer(app);
const io = new Server(server);

// middleware
app.use(cors())
app.use(express.json())



// mongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c6bvskv.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

   //change menuCollection with database name and collection.

    const usersCollection = client.db('e-dootDB').collections("users")
    const messagesCollection = client.db('e-dootDB').collections("messages")

    //connection socket
    io.on('connection', socket => {
      socket.on('disconnect', () => {

      });

      socket.on('sendMessage', async (messageInfo, receiverEmail) => {

          //messageBuffer.push(messageInfo)
          socket.broadcast.emit(receiverEmail, messageInfo);
          await messageList.insertOne(messageInfo);

      });
  });

      //get messages by sender and receiver
      app.get('/messages', async (req, res) => {
        //console.log(req.query.m, req.query.f)
        const query = {
            $or: [
                { 'sender.email': req.query.m, 'receiver.email': req.query.f },
                { 'receiver.email': req.query.m, 'sender.email': req.query.f }
            ]
        }
        const options = {
            // Sort returned documents in ascending order by title (A->Z)
            sort: { time: 1 },
        };
        const result = await messageList.find(query, options).toArray();
        res.send(result)
    })


       // create a new user
       app.put('/addUser', async (req, res) => {
        try {
            const filter = { email: req.body.email };
            const options = { upsert: true };
            const updateDoc = {
                $set: req.body
            };
            const result = await userList.updateOne(filter, updateDoc, options);
            res.status(200).send(result);
        }
        catch (err) {
            res.status(402).send({ err })
        }
    })

      //get all users
      app.get('/users', async (req, res) => {
        try {
            const options = {
                projection: { password: 0 },
            };
            const users = await userList.find({}, options).toArray();
            res.status(200).send(users);
        }
        catch (err) {
            res.status(402).send({ err })
        }
    })







    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// testing
app.get('/', (req, res) => {
    res.send('Server is running')
} )

app.listen(port, () => {
console.log(`Server is running on port: ${port}`);
})