const mongoose = require("mongoose");

// connection create to db [STRATS]
const dbUrl = "mongodb://127.0.0.1:27017/student"; // url of mongodb database.

/*  
    The useNewUrlParser parameter tells the driver to use the latest version of 
    the MongoDB protocol.The useUnifiedTopology parameter tells the driver to 
    use the new connection pool implementation, which is more efficient and reliable.
*/
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(dbUrl, connectionParams)
    .then( () => console.log("Connection successful....!"))
    .catch( (error) => console.log(error));
// Connection code [ENDS]

// schema :- It defines the structures of the doc also defines value, validator and manymore.
const userSchema = new mongoose.Schema({
    firstName: {type:String, require:true},
    lastName : {type:String, require:true},
    email    : {type:String, require:true},
    age      : {type:String, require:true},
    password : {type:String, require:true},
    date     : {type:Date, default:Date.now},
});


// model : a mongoose modle is a wrapper on the mongoose schema.
const User = new mongoose.model("User", userSchema); // creating collection


/**
 * INSERT OPERATION 
 */
const createDoc = async () => {
    
    try {
        const user1 = new User({
            firstName: "Abhijeet",
            lastName : "Kumar",
            email    : "abhi@gmail.com",
            age      : 21,
            password : "password",
        })
        const user2 = new User({
            firstName: "Dhiraj",
            lastName : "yadav",
            email    : "dhiraj@gmail.com",
            age      : 22,
            password : "password",
        })
        const user3 = new User({
            firstName: "Anurag",
            lastName : "Singh",
            email    : "anurag@gmail.com",
            age      : 21,
            password : "password",
        })
        const user4 = new User({
            firstName: "Akshay",
            lastName : "Kumar",
            email    : "akshay@gmail.com",
            age      : 22,
            password : "password",
        })
        const user5 = new User({
            firstName: "Siddharth",
            lastName : "raj",
            email    : "siddharth@gmail.com",
            age      : 23,
            password : "password",
        })

        const result = await User.insertMany([user1, user2, user3, user4, user5]);
        console.log("Saved successfully!");

    } catch (err) {
        console.log(err);
    }
}

// createDoc(); 

// =======================================================================

/**
 * READ OPERATION 
 */
// for all data
const getDoc =  async () => {
    const result = await User.find();
    console.log(result);
}
// getDoc();


// get doc with condition.
const getUniqueDoc = async () => {
    const result = await User.find({age:21}).select({firstName:1}); // It will fetch those data whose age is 21.
    console.log(result);
}
// getUniqueDoc();

// =======================================================================

/*
    Comparisaion operator

    $eq  : Values are equal.
    $ne  : Values are not equal.
    $gt  : Value is greater than another value.
    $gte : Value is greater than or equal to another value.
    $lt  : Value is less than another value.
    $lte : Value is less than or equal to another value.
    $in  : Value is matched within an array.
*/

// greater than data. 
const getDocGreaterThan = async () => {
    try {
        const result = await User
        .find({age:{$lt:22}}) //It will return only those data whose age is greater than 21.
        .select({firstName:1})
        // .limit()
        console.log(result);
    } catch(error) {
        console.log(error);
    }
}
// getDocGreaterThan(); 


// =======================================================================

/*
    Logical Query Operators

    $or	  : Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
    $and  :	Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
    $not  :	Inverts the effect of a query expression and returns documents that do not match the query expression.
    $nor  :	Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
*/
const getDocLogically = async () => {
    try {
        const result = await User
        .find({$and : [{age:22},{lastName: "Kumar"}]})  // and operator
        console.log(result);
    } catch(error) {
        console.log(error);
    }
}

// getDocLogically();

// =======================================================================

//  sorting
const getDocAsc = async () => {
    try {
        const result = await User
        .find()
        .sort({firstName : 1})
        .select({firstName : 1})
        console.log(result);
    } catch(error) {
        console.log(error);
    }
}
// getDocAsc();

// =======================================================================

// UPDATE
const updateDoc = async (id) => {
    try {
        // const result = await User.updateOne({_id : id}, {   // it will update only
        const result = await User.findByIdAndUpdate({_id : id}, {  // it below will update and show updated data
            $set : {
                lastName : "Kumar Sharma"
            }
        },{
            new : true, // it help to get the updated data.
            userFindaAndModify : false,
        });
        console.log(result);

    } catch(error) {
        console.log(error);
    }
}
// updateDoc("6506a192765e7caf0b3848be"); 

// =======================================================================

// DELETE
const deleteDoc = async (id) => {
    try {
        const result = await User.findByIdAndDelete({_id : id})
        console.log(result);
    } catch(error) {
        console.log(error);
    }
}

// deleteDoc("6506a192765e7caf0b3848c2"); 