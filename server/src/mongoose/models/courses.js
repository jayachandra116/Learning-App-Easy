const mongoose=require('mongoose');

const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        validate(value){
            if(!value.match(/^[A-Za-z0-9.  ]{3,}$/)){
                throw new Error("Course name can contain only alphabets, numbers, spcaes and dots. The length of the course name should ");
            }
        }
    },
    courseDept:{
        type:String,
        required:true,
        validate(value){
            if(!value.match(/^(WD|AI|DS|CS|CC|UI|GD)$/)){
                throw new Error("Please enter a valid department name");
            }
        }
    },
    description:{
        type:String,
        required:true,
        validate(value){
            if(!value.match(/(?:[^!@#$%]+ ){2,4}[^!@#$%]+/)){
                throw new Error("Course description should have alenght of atleast 3 words");
            }
        }
    },
    duration:{
        type:Number,
        required:true,
        min:1,
        max:100,
    },
    isRated:{
        type:Boolean,
        default:false
    },
    isApplied:{
        type:Boolean,
        default:false,
    },
    noOfRatings:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:0
    }
});

courseSchema.virtual("courseId",{
    ref:"AppliedCourses",
    localField:"_id",
    foreignField:"courseId"
});

const Course=mongoose.model("Course",courseSchema);

module.exports=Course;
