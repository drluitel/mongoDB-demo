const mongoose = require('mongoose'); // loading the mongoose
 mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
        .then (() => console.log('Connected to MongoDB.....'))
        .catch(err => console.log(console.error("Could not connected to mongoDB...",err)))
 

// making a constucture
const courseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:5,
        maxlength:255
        // match: /pattern/
      },
      category:{
        type: String,
        required:true,
        enum:['web','mobile','network'],
        lowercase: true
     
    },
    author:String,
    // custome validation
     tags: {
        type: Array,
        validate: {
            // async validation
            isAsync:true,
            validator: function(v, callback){
                //do some async work
                setTimeout(() => {
                    const result = v && v.length>0;
                    callback(result);
                }, 4000);
               
              
            },
            message: 'A course should have at least one tag.'
        }
    }, 
    date:{type:Date, default:Date.now},
    isPublished:Boolean,
    price:{
        type:Number,
        required:function(){return this.isPublished},
        min:5,
        max:200,
        get: V => Math.round(V),
        set: V => Math.round(V)
    }
});
// course object
 const Course = mongoose.model('Course', courseSchema);  // is the class 

 async function createCourse(){
 const course = new Course ({
    name: "Angular Course",
    category:'WEB',
    author:"Mose",
    tags: ['frontend'],
    isPublished: true,
    price: 15.8
 });
 try{
     //await course.validate();
    const result = await course.save();
    console.log(result);
 }
 catch (ex){
  for(fildes in ex.errors)
       //console.log(ex.errors[fildes]);
       console.log(ex.errors[fildes].message);

 }
}
//createCourse();
 // quary to database
 async function getCourses(){
    const pageNumber = 2;
    const pageSize = 10;
     const courses = await Course
     .find({author:"Mose", isPublished: true})
     .skip((pageNumber-1) * pageSize)
     .limit(pageSize)
     .sort({name: 1})
     .select({name:1, tags:1});
     console.log(courses);
}

// Upaditing the a Documents: Quary first
/* 
async function updateCourse(id){
// Approach: Quary first
//  find the course by findById(id)  methids
//Modify its properties
//save()
 const course =  await Course.findById(id);
if (!course) return console.log('Course looking by id is not found.....');
    course.isPublished =true;
    course.author='Another Author';
   const result = await course.save();
   console.log(result);

}
 */


 /* async function updateCourse(id){
    const result =  await Course.update({_id: id},{
     $set: {
            author:'Mosh',
            isPublished:false
        }
    });
    console.log(result);
    
}
   */  
/* async function updateCourse(id){
    const course =  await Course.findByIdAndUpdate(id, {
     $set: {
            author:'Jason',
            isPublished:false
        }
    }, {new: true});
    console.log(course); 
}
    */ 

    // Romoving the Documents 
async function removeCourse(id){
 // const result = await  Course.deleteOne({_id:id});
  const course = await Course.findByIdAndRemove(id);
  console.log();
   
}
createCourse();
