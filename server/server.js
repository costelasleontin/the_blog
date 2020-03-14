const path = require('path');
const https = require('https');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');//could be eliminated in production if u store user token in state and not in cookie
const {body, param, cookie, validationResult} = require('express-validator');
const moment = require('moment-timezone');
const bcrypt = require('bcrypt');//could use cookie-parser signed cookies but it's better to be able to use custom hash algorithm
const database = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Pascal@07',//credentials could be stored in an encrypted file in production
        database: 'the_blog'
    }
});

const app = express();
const buildPath=path.join(__dirname,'..','build');
const port = process.env.PORT||3000;

//serve the web app from the build folder with express
app.use(express.static(buildPath));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


// CORS enable just for development to run react app on a port and express server on another port for faster debugging
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/login', [body('*').escape().trim(), body('username').escape().trim().isLength({ min: 1, max: 255 }).matches(/^([0-9A-z ]*)$/), body('password').whitelist('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+').trim().isLength({ min: 1, max: 255 }).matches(/^([0-9A-z ]*)$/)], async (req, res) => {
    try {
        await database("users").select("*").where({ username: req.body.username }).then(async (user) => {
            if (user.length) {
                const check = await bcrypt.compare(req.body.password, user[0].hash);
                if (check) {
                    const hash = await generateToken();
                    // console.log("login token hash=", hash);
                    res.cookie('authentication', hash, {
                        secure: false, //this is true in production and false for development cookie debugging
                        maxAge: 10*60*1000, //10minutes (minutes*seconds*miliseconds)
                        httpOnly: true
                    });
                    await database("users").update({ usertoken: hash, tokenexpiration: moment().tz("Europe/Bucharest").add(10, 'minutes') }).where({ user_id: user[0].user_id }).then(data => console.log("usertoken updated = ", moment().format())); //token expires after 10 minutes and should be refreshed on every request
                    res.status(200).json({ message: "Successfully loged in", dashboardredirect:true})
                } else {
                    res.status(442).json({ message: "Invalid Username or Password" });
                }
            } else {
                res.status(442).json({ message: "Invalid Username or Password" });
            }
        });
    } catch (error) {
        console.error(error);
        res.json({ message: "Invalid Username or Password" }); //message is misleading because you don't want users to get informations in case of errors for security reasons
    }
});

//send users list but only if client has secure cookie that has valid user token
app.post("/users", [body('*').escape().trim(), cookie("*").whitelist('./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$')], async (req, res) => {
    try {
        //check to see if cookie expired
        if (req.cookies.authentication) {
            await database("users").select("*").where({ usertoken: req.cookies.authentication }).then(async (data) => {
                if (moment().tz("Europe/Bucharest").diff(moment(data[0].tokenexpiration).tz("Europe/Bucharest")) < 0) {
                    const hash = await generateToken();
                    // console.log("login token hash=", hash);
                    res.cookie('authentication', hash, {
                        secure: false, //this is true in production and false for development cookie debugging
                        maxAge: 10*60*1000, //10minutes (minutes*seconds*miliseconds)
                        httpOnly: true
                    });
                    await database("users").update({ usertoken: hash, tokenexpiration: moment().tz("Europe/Bucharest").add(10, 'minutes') }).where({ user_id: data[0].user_id }).then(data => console.log("usertoken updated = ", moment().format())); //generate and update in database new user token valid for 10 minutes
                    await database("users").select("*").then(data => { const results = data.map(user => ({ username: user.username, firstname: user.firstname, lastname: user.lastname, createdate: user.createdate })); res.json(results); });// send user list
                } else {
                    res.json({ message: "Can't get users", login: true });//if the cookie expires while checking database this should be executed
                }
            });
        } else {
            res.json({ message: "Can't get users", login: true });//if cookie expired and not send back you send answer to ask for login
        }
    } catch (error) {
        console.error(error);
        res.json({ message: "Can't get users" });
    }
});

//deletes post based on post_id and requires usertoken for operation validation
app.post("/deletepost",[body('*').escape(),cookie("*").whitelist('./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$'),body('post_id').escape().trim().isNumeric({no_symbols:false})],async(req,res)=>{
    try{
        if (req.cookies.authentication){
            await database("users").select("*").where({ usertoken: req.cookies.authentication }).then(async (data) => {
                if (moment().tz("Europe/Bucharest").diff(moment(data[0].tokenexpiration).tz("Europe/Bucharest")) < 0) {
                    const hash = await generateToken();
                    // console.log("login token hash=", hash);
                    res.cookie('authentication', hash, {
                        secure: false, //this is true in production and false for development cookie debugging
                        maxAge: 10*60*1000, //10minutes (minutes*seconds*miliseconds)
                        httpOnly: true
                    });
                    await database("users").update({ usertoken: hash, tokenexpiration: moment().tz("Europe/Bucharest").add(10, 'minutes') }).where({ user_id: data[0].user_id }).then(data => console.log("usertoken updated = ", moment().format())); //generate and update in database new user token valid for 10 minutes
                    if(req.body){//check for post body before using it for operations
                        const errors=validationResult(req);
                        if(errors.array().length){
                            res.status(442).json({message:`Can't delete post "${req.body.post_id}". Invalid input`, login: false});
                        }else{
                            await database("posts").where({post_id:req.body.post_id}).del().then(result=>console.log("Deleted ", result, "post(s)",moment().tz("Europe/Bucharest").format()));//log post delete operation moment
                            res.json({message:`Deleted post "${req.body.post_id}" successfully`, login: false});
                        }      
                    }else{
                        res.json({message:"Unsuccessful deleting post", login: false});
                    }
                } else {
                    res.json({ message: "Unsuccessful deleting post", login: true });//if the cookie expires while checking database this should be executed
                }
            });
        }else{
            res.json({ message: "Unsuccessful deleting post", login: true });//if cookie expired and not send back you send answer to ask for login
        }
    }catch(error){
        console.error(error);
        res.json({message:"Unsuccessful deleting post"});
    }
});

app.post("/posts/edit", [body('*').escape(), cookie("*").whitelist('./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$'), body('post_id').escape().trim().isNumeric({ no_symbols: true }), body('author').escape().trim().isLength({ min: 1, max: 255 }).matches(/^([0-9A-z ]*)$/), body('posttitle').escape().trim().isLength({ min: 1, max: 255 }).matches(/^([0-9A-z ]*)$/), body('postcontent').escape().trim().isLength({ min: 1, max: 10000 })], async (req, res) => {
    try {
        if (req.cookies.authentication) {
            await database("users").select("*").where({ usertoken: req.cookies.authentication }).then(async (data) => {
                if (moment().tz("Europe/Bucharest").diff(moment(data[0].tokenexpiration).tz("Europe/Bucharest")) < 0) {
                    const hash = await generateToken();
                    // console.log("login token hash=", hash);
                    res.cookie('authentication', hash, {
                        secure: false, //this is true in production and false for development cookie debugging
                        maxAge: 10 * 60 * 1000, //10minutes (minutes*seconds*miliseconds)
                        httpOnly: true
                    });
                    await database("users").update({ usertoken: hash, tokenexpiration: moment().tz("Europe/Bucharest").add(10, 'minutes') }).where({ user_id: data[0].user_id }).then(data => console.log("usertoken updated = ", moment().format())); //generate and update in database new user token valid for 10 minutes 
                    if (req.body) {
                        const errors = validationResult(req);
                        if (errors.array().length) {
                            res.json({ message: `Can't edit post "${req.body.posttitle}". Invalid input`, login: false });
                        } else {
                            await database.transaction(trx => {
                                return trx("users").where("username", req.body.author).select('user_id').then(async(user) =>await trx("posts").update({ posttitle: req.body.posttitle, author: user.user_id, postcontent: req.body.postcontent }).where({ post_id: req.body.post_id }).then(data => console.log("update post result:", data)));
                            }).then(data => res.json({ message: `Edited post "${req.body.posttitle}" successfully`, login: false , dashboardredirect: true}));
                        }
                    } else {
                        res.json({ message: "Unsuccessful editing post. Invalid input", login: false });
                    }
                } else {
                    res.json({ message: "Unsuccessful editing post", login: true });//if the cookie expires while checking database this should be executed
                }
            });
        } else {
            res.json({ message: "Unsuccessful editing post", login: true });//if cookie expired and not send back you send answer to ask for login
        }
    } catch (error) {
        console.error(error);
        res.json({ message: "Unsuccessful editing post" });
    }
});

app.post("/posts/add",[body('*').escape(),cookie("*").whitelist('./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$'), body('author').escape().trim().isLength({min:1, max:255}).matches(/^([0-9A-z ]*)$/),body('posttitle').escape().trim().isLength({min:1, max:255}).matches(/^([0-9A-z ]*)$/),body('postcontent').escape().trim().isLength({min:1, max:10000})],async(req,res)=>{
    try{
        if (req.cookies.authentication) {
            await database("users").select("*").where({ usertoken: req.cookies.authentication }).then(async (data) => {
                if (moment().tz("Europe/Bucharest").diff(moment(data[0].tokenexpiration).tz("Europe/Bucharest")) < 0) {
                    const hash = await generateToken();
                    // console.log("login token hash=", hash);
                    res.cookie('authentication', hash, {
                        secure: false, //this is true in production and false for development cookie debugging
                        maxAge: 10 * 60 * 1000, //10minutes (minutes*seconds*miliseconds)
                        httpOnly: true
                    });
                    await database("users").update({ usertoken: hash, tokenexpiration: moment().tz("Europe/Bucharest").add(10, 'minutes') }).where({ user_id: data[0].user_id }).then(data => console.log("usertoken updated = ", moment().format())); //generate and update in database new user token valid for 10 minutes 
                    if(req.body){
                        const errors=validationResult(req);
                        if(errors.array().length){
                            res.json({message:`Can't add post "${req.body.posttitle}". Invalid input`, login:false});
                        }else{
                            //these needs to be made async and also could be a transaction
                            await database("users").where({username:req.body.author}).select("user_id").then(async(user)=>await database("posts").insert({author:user[0].user_id,posttitle:req.body.posttitle,postcontent:req.body.postcontent,publishdate:moment().tz("Europe/Bucharest").format()}).then(result=>console.log(`added new post ${req.body.posttitle} at ${moment().format()}`))); 
                            res.json({message:`Added post "${req.body.posttitle}" successfully`});
                        }      
                    }else{
                        res.json({message:"Unsuccessful adding post. Invalid input", login:false});
                    }
                }else{
                    res.json({message:"Unsuccessful adding post", login:true});
                }
            });
        }else{
            res.json({ message: "Unsuccessful adding post", login:true});//if cookie expired and not send back you send answer to ask for login
        }
    }catch(error){
        console.error(error);
        res.json({ message: "Unsuccessful adding post" });
    }
});

//gets the post based on post_id
//could generate client cookie to implement a limit of 100 requests over a maximum of 1 minute to prevent DDoS attacks
app.get("/posts/:postId", [body("*").escape().trim(), cookie("authentication").whitelist('./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$').trim(), param("postId").escape().trim().isNumeric({ no_symbols: true })], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (errors.array().length) {
            res.status(442).json({ message: `Invalid post id. Invalid input` });
        } else {
            if (req.params.postId && (0 < req.params.postId)) {
                database("posts").where({ post_id: req.params.postId }).leftJoin('users', 'posts.author', 'users.user_id').then(data => res.json([{ post_id: data[0].post_id, posttitle: data[0].posttitle, author: data[0].author, postcontent: data[0].postcontent, publishdate: data[0].publishdate, username: data[0].username, firstname: data[0].firstname, lastname: data[0].lastname }]));
            } else {
                res.status(400).send("Id doesn't exists");
            }
        }
    } catch (error) {
        console.log(error);
    }
});

//gets all posts
//could generate client cookie to implement a limit of 100 requests over a maximum of 1 minute to prevent DDoS attacks
app.get("/posts", (req, res) => {
    try{
        database.select('*').from('posts').innerJoin('users','posts.author','users.user_id').then(data=>res.json(data));  
    }catch(error){
        console.log(error);
    }
});

// any other get requests should bring the user to homepage which is served from file
app.get("*",(req,res)=>{
    res.sendFile(path.join(buildPath,"index.html"));
});

// app.listen(port,()=>{console.log("The app has started")});

//in production you use  the https module (down bellow) with certificate to use https connection with app but that also requires to switch all fetches from relative paths to absolute paths cause there isn't a way to use https

https.createServer({
    key: fs.readFileSync(path.join(__dirname,'key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'cert.pem')),
    passphrase: 'Secret123!'
},app).listen(port,()=>{console.log("The app has started");
})

//utility methods
//method for generating token
const generateToken=async()=>{
    const salt = await bcrypt.genSalt(10);
    //the secret for the hash function can be saved in a different encrypted file in production for security reasons
    const hash = await bcrypt.hash("a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26", salt);
    return hash;
}