const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
  const blogSchema = new mongoose.Schema({
    blogDate:  { type: String, required: true},
    blogAuthor:  { type: String, required: true},
    blogTopic:  { type: String, required: true},
    blogContent:  { type: String, required: true}
  });

//use the blueprint to create the model 
// Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Blog', blogSchema,'Blogs');
//note capital B in the collection name
