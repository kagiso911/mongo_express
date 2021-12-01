require("dotenv").config();
const express = require("express");
const app = express();
app.listen(3000, () => console.log("Server is running"));
const mongoose = require("mongoose");


mongoose.connect(
    process.env.MONGODB_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const studentSchema = new mongoose.Schema({
    roll_no: Number,
    name: String,
    year: Number,
    subjects: [String]
});
roll_no: {
    type: Number,
    required: true
}

const Student = mongoose.model('Student', studentSchema);


// Let’s add two documents whenever our app is loaded
const stud = new Student({
    roll_no: 1001,
    name: 'Madison Hyde',
    year: 3,
    subjects: ['DBMS', 'OS', 'Graph Theory', 'Internet Programming']
});
stud.save().then(() => console.log("One entry added"));

app.get('/', (req, res) => {
    Student.find({}, (found, err) => {
        if (!err) {
            res.send(found);
        }
        console.log(err);
        res.send("Some error occured!")
    })
});

