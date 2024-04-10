const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./front'));
// app.use("/styles", express.static(__dirname + '/front'));


const ProductRouter = require('./Routes/product.router');
app.use('/upload', ProductRouter)
app.use('/download',ProductRouter)
// const OrderRoute = require('./Routes/Orders');
// app.use('/orders', OrderRoute)
// const UserRoute = require('./Routes/User')
// app.use('/user', UserRoute)
Port = 6002;
const mongoAtlasUri =
  "mongodb+srv://awsuser:awsuser@aws-s3.digtsr5.mongodb.net/AWSupload?retryWrites=true&w=majority";

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}

// mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(response=>{
//         console.log("connected")
//     })
//     .catch(err=>{
//         console.error(err)
//     })
  

app.listen(Port,()=>{
  console.log(`listening on port,${Port}`)
}
)

app.use((req, res, next) => {
    res.status(200).json({
        message: "It works"

        
    });
})



module.exports = app;