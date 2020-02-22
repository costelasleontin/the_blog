const path = require('path');
const express = require('express');
const app = express();
const buildPath=path.join(__dirname,'..','build');
const port = process.env.PORT||3000;

//serve the web app from the build folder with express
app.use(express.static(buildPath));

//any get requests should bring the user to homepage
app.get("*",(req,res)=>{
    res.sendFile(path.join(buildPath,"index.html"));
});

app.listen(port,()=>{
    console.log("The app has started");
})