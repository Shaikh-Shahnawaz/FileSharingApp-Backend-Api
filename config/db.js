// const mongoose = require('mongoose')



// function connectDB(){
//     ///database connection
//     mongoose.connect(DB,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,
//    useFindAndModify:true })

//    const connection = mongoose.connection
//    connection.once('open',()=>{
//        console.log('Database Connected')
//    }).catch(err=>console.log('connection failed',err))
// }

// module.exports = connectDB;



// // const app = require('./app')
// // const mongoose = require('mongoose')
// // const PORT = process.env.PORT
// // const DB = process.env.MONGO_URL


// // mongoose.connect(DB).then(data=>{
// //     console.log('DB Connected !!')
// //     app.listen(PORT,()=>{
// //         console.log(`Server running at http://localhost:${PORT}`)
// //     })
// // }).catch(err=>console.log(err))