const express = require('express');
const mongoose = require('mongoose');

const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/taskDB').then(() =>{
    console.log("Connected to mongoose!");
})



app.get('/', (req,res) => {
    res.send('Server working')
})

const studentSchema = mongoose.Schema({

    user: {
        type:String,
        required:true
    },
    password: {
        type:Number,
        required:true
    },
    age: {
        type:Number,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    bio: {
        type:String,
        required:true
    }


})

const  Student = mongoose.model('Student',studentSchema)


const courseSchema = mongoose.Schema({

    name: {
        type:String,
        required:true
    },
    location: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    }


})

const  Course = mongoose.model('Course',courseSchema)


// Documents

const Studentarr = [

    {
        user:"ibtehal",
        password:1,
        age:5,
        address:"hezb el watany",
        bio:"IS Student"
    },
    {
        user:"dode",
        password:5,
        age:6,
        address:"aswan",
        bio:"iS Student"
    },
    {
        user:"joj",
        password:9,
        age:1,
        address:"loza",
        bio:"ij Student"
    }

]

const Coursesarr = [

    {
        name:"udsty",
        location:"libnan",
        description:"Course for FCI students"

    },
    {
        name:"udimy",
        location:"ussa",
        description:"learn"

    }

]


//Inserting documents

const insertDocs = async () => {

    await Student.deleteMany()
    await Course.deleteMany()

    await Student.insertMany(Studentarr)
    await Course.insertMany(Coursesarr)

}

insertDocs();

//Student endpoint

app.get('/students', async (req,res) => {
    const students = await Student.find()
    res.send(students)
})

//Courses endpoint

app.get('/courses', async (req,res) => {
    const courses = await Course.find()
    res.send(courses)
})








app.listen(3000, () => {
    console.log("Server on!")
})