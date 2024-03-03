const express = require("express")
const bodyParser = require("body-parser")
const day = require(__dirname + "/date.js")


const app = express()
app.use(bodyParser.urlencoded ({extended: true}))

// Connect CSS and Image
app.use(express.static("public"))

// Set Up for ejs file system ...  
app.set("view engine", "ejs") 

// Array for storing user input
let items = []
let work_item = []

// Main Root
app.get("/", function(req, res){

    let heading = day.getDate()

    // Rendering a ejs 
    res.render("list", {
        // Export day model
        titles: heading,
        todo: items
    })
})

// Get the user input
app.post("/", function(req, res){
    // Get the input value
    
    let item = req.body.value

    // Condition
    if (req.body.list === "Work"){
        work_item.push(item)
        res.redirect("/work")
    }else{
        items.push(item)
        res.redirect("/")
    }
    
})

app.get("/work", function(req, res){
    res.render("list", {
        titles: "Work List",
        todo: work_item
    })
})

// Local Seriver
app.listen(3000, function(){
    console.log("Server 3000 has been connecting....")
})