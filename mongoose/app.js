const mongoose = require("mongoose");

// connection create to db [STRATS]
const dbUrl = "mongodb://127.0.0.1:27017/student";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(dbUrl, connectionParams)
    .then( () => console.log("Connection successful....!"))
    .catch( (error) => console.log(error));
// Connection code [ENDS]

// schema :- it defines the structures of the doc also defines value, validator and manymore.
const userSchema = new mongoose.Schema({
    firstName: {type:String, require:true},
    lastName : {type:String, require:true},
    email    : {type:String, require:true},
    password : {type:String, require:true},
    date     : {type:Date, default:Date.now},
});


// model : a mongoose modle is a wrapper on the mongoose schema.
const User = new mongoose.model("User", userSchema); // creating collection

const createDoc = async () => {
    try {
        const user = new User({
            firstName: "Abhijeet",
            lastName : "Kumar",
            email    : "abhi@gmail.com",
            password : "password",
        })

        const result = await user.save();
        console.log("Saved successfully!");
    } catch (err) {
        console.log(err);
    }
}

createDoc();