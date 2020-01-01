const mongoose = require('mongoose');// load the mongoose to cannect
// connect 
mongoose.connect('/mongodb://localhost/mongo-exercises', { useNewUrlParser: true })// 'useNewUrlParser: true')
        .then(()=> console.log('connected to the mongodb.....'))
        .catch(err => console.log(console.error("Could not connected to mongoDB...",err)));

        // ceate the schema which is the documents
const courseSchema = new mongoose.Schema({
    name: String,
    author:String,
    tags: [String],
    date: {type:Date, default:Date.now},
    isPublished:Boolean,
    price:Number
 });
// Create the model
const Cousre = mongoose.model('Course',courseSchema);


// quareies to get courese from mongodb
/* async function getCourses(){
    return await Cousre
    .find({isPublished: true, tags: 'backend'})
    .sort({name: 1})
    .select({name: 1, author: 1});
}
 */

 // quareies to get courese from mongodb
async function getCourses(){
    return await Cousre
    .find({isPublished: true, tags: {$in: ['frontend', 'backend']}})
    //.find({isPublished:true})
    //.or([{tags:'frontend'},{tags:'backend'}])
    .sort({price: -1})
    //.sort("-price");
    .select({name: 1, author: 1, price: -1});
    //.select('name author price');
}



async function run(){
const courses = await getCourses();
console.log(courses);

}
run();
/* 
 async function createCourse(){
const course = new Course ({
    name: "node.js Course",
    auther:'Mose',
    tags: ['node', 'backend'],
    isPublished:true,
    price:10

});
 const result = await course.save();
 console.log(result);

} */

 
