// const mongoose=require('mongoose')
// //const validator=require('validator')
// //mongodb+srv://1:1@nodetut.kttn7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// //mongodb+srv://1:1@nodetut.kttn7.mongodb.net/nodetut?retryWrites=true&w=majority
// mongoose.connect('mongodb+srv://optimv2ujjwal:optimv2ujjwal@test.zvnfn.mongodb.net/optimv2?retryWrites=true&w=majority',{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology: true, //////////////////////////FIXING NEEDED
//     useFindAndModify:false 
// })

const mongoose = require('mongoose');

const connectDB = async () => {

  try {
    const conn = await mongoose.connect('mongodb+srv://1:1@nodetut.kttn7.mongodb.net/nodetut?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  
  } catch (error) {
    console.log(error)
  }
};

module.exports = connectDB;
