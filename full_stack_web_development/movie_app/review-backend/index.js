import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js" // dao: data access object
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config()

const MongoClient = mongodb.MongoClient
const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.kldy9nz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,    // The maximum number of connections in the connection pool
        wtimeoutMS: 2500,   // 2500ms = 2.5s, The time in milliseconds to wait for the write concern to finish
        useNewUrlParser: true,  // The MongoDB Node.js driver rewrote the tool it uses to parse MongoDB connection strings
    }
)
    .catch(err => { // If the connection fails, log an error message and exit the process
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => { //client comes from MongoClient.connect
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {    // () means that the function is empty
            console.log(`listening on port ${port}`)
        })
    })