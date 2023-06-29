const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
//npm install express mongoose
const Location=require("./Models/locations");
const app=express();
//middleware
app.use(express.json());
app.use(cors());
// CRUD API

//Create/INSERT API
app.post("/locations", async (req, res) => {
    const location = new Location(req.body);
    try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// READ ALL API
app.get("/locations", async (req, res) => {
    try {
    const locations = await Location.find();
    res.status(200).json(locations);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});
//READ By ID API
app.get("/locations/:id", async (req, res) => {
    try {
    const location = await Location.findById(req.params.id);
    if (location) {
    res.json(location);
    } else {
    res.status(404).json({ message: "Location not found" });
    }
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
 });
//Update by ID API
app.put("/locations/:id", async (req, res) => {
    try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    });
    if (location) {
    res.json(location);
    } else {
    res.status(404).json({ message: "Location not found" });
    }
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
});

//Delete by ID API
app.delete("/locations/:id", async (req, res) => {
    try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (location) {
    res.json({ message: "Location deleted" });
    } else {
    res.status(404).json({ message: "Location not found" });
    }
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});



mongoose.connect("mongodb://127.0.0.1:27017/humanResourceDB",
{
    useNewUrlParser:true, 
    useUnifiedTopology: true
}).then((success)=>{
    console.log("Database Connected");
    app.listen(4000,()=>{
        console.log('Server Started');
    })
}).catch((err)=>{
    throw err;
});

 