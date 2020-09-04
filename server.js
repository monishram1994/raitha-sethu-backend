const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = express.Router();
const PORT = 4000;

let User = require('./models/user.model');

//For middleware
app.use(cors());
app.use(bodyParser.json());

//mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true , useUnifiedTopology: true,});
mongoose.connect('mongodb+srv://dbuser:Ka14@cluster0.eowjo.mongodb.net/users?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true,});

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use('/users',userRoutes);

userRoutes.route('/').get((req,res)=>{
    debugger;
    User.find((err, users)=>{
        if(err){
            console.log(err);
        } else{
            res.json(users);
        }
        
    });
});

userRoutes.route('/:id').get(function(req,res){
    let id= req.params.id;
    User.findById(id, function(err,user){
        res.json(user);
    });
});

userRoutes.route('/add').post(function(req,res){
    let user = new User(req.body); 
    user.save()
    .then(user=>{
        res.status(200).json({'user':'user added successfully'});
    })
    .catch(err =>{
        res.status(400).send('adding new user failed');
    });
});

userRoutes.route('/update/:id').post(function(req,res){
    User.findById(req.params.id, function(err,user){
        if(!user){
            res.status(404).send('data is not found');
        }else{
            user.name = req.body.name;
            user.city = req.body.city;
            user.phone = req.body.phone;
            user.address = req.body.address;

            user.save().then(user=>{
                res.json('User updated');
            })
            .catch(err =>{
                res.status(400).send("user not updated");
            });
    }});
});

app.listen(PORT,()=>{
    console.log("Server is running on port: " + PORT);
})



