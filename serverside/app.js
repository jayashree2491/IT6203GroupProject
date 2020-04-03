const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
//specify where to find the schema
const Blog = require('./models/blog')
// connect and display the status 
mongoose.connect('mongodb://localhost:27017/MentalHealthAppDb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log("connected"); })
  .catch(() => { console.log("error connecting"); });
// use the following code on any request that matches the specified mount path
app.use((req, res, next) => {
  console.log('This line is always called');
  res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); //allowable methods
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  next();
});
app.get('/blogs', (req, res, next) => {
  //call mongoose method find (MongoDB db.Blogs.find())
  Blog.find()
    //if data is returned, send data as a response 
    .then(data => res.status(200).json(data))
    //if error, send internal server error
    .catch(err => {
      console.log('Error: ${err}');
      res.status(500).json(err);
    });
});

app.get('/blogs/:id', (req, res, next) => {
  //call mongoose method find (MongoDB db.Students.find())
  Blog.findById({ _id: req.params.id})
     //if data is returned, send data as a response 
     .then(data => res.status(200).json(data))
     //if error, send internal server error
     .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
     });
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// serve incoming post requests to /blogpost
app.post('/blogs', (req, res, next) => {
  // create a new blog variable and save request’s fields 
  const blog = new Blog({
    blogDate: req.body.blogDate,
    blogAuthor: req.body.blogAuthor,
    blogTopic: req.body.blogTopic,
    blogContent: req.body.blogContent
  });
  //send the document to the database 
  blog.save()
    //in case of success
    .then(() => { console.log('Success'); })
    //if error
    .catch(err => { console.log('Error:' + err); });
});
//:id is a dynamic parameter that will be extracted from the URL
app.delete('/blogs/:id', (req, res, next) => {
  Blog.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json("Deleted!");
  });
});
// serve incoming put requests to /blogs
app.put('/blogs/:id', (req, res, next) => {
  console.log("id: " + req.params.id)
  // check that the parameter id is valid 
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    //find a document and set new first and last names
    Blog.findOneAndUpdate({ _id: req.params.id },
      {
        $set: {
          blogDate: req.body.blogDate,
          blogAuthor: req.body.blogAuthor, blogTopic: req.body.blogTopic, blogContent: req.body.blogContent
        }
      }, { new: true })
      .then((blog) => {
        if (blog) { //what was updated
          console.log(blog);
        } else {
          console.log("no data exist for this id");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("please provide correct id");
  }
  });
  
//to use this middleware in other parts of the application
module.exports = app;
