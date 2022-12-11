const express = require("express");
const Course = require("../mongoose/models/courses");

const usersRouter = new express.Router();

usersRouter.post("/courses/enroll/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    let message = "";
    if (course.isApplied) {
      res.status(403);
      message = "You have already applied for this course";
      return res.send({ error: message });
    } else {
      const c = await Course.findByIdAndUpdate(req.params.id, {
        isApplied: true,
      });
      if (!c) {
        return res.status(400).send();
      }
      message = "You have successfully enrolled for the course";
      res.status(200).send({ message: message });
    }
  } catch (e) {
    //res.status(400).send(e);
    if(e.name==="CastError"){
      res.status(400).send({message:`Invalid id for a course with value : ${e.stringValue}`})
    }
  }
});

usersRouter.delete("/courses/drop/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    let message = "";
    // console.log(req.params.id);
    // console.log(course.isApplied);
    if (!course.isApplied) {
      res.status(403);
      message = "You have not enrolled for this course";
      return res.send({ error: message });
    } else {
      const c = await Course.findByIdAndUpdate(req.params.id, {
        isApplied: false,
      });
      if (!c) {
        return res.status(400).send();
      }
      message = "You have dropped the course";
      res.status(200).send({ message: message });
    }
  } catch (e) {
    res.status(400).send();
  }
});

usersRouter.get("/courses/get", async (req, res) => {
  try {
    const courses = await Course.find({});
    return res.status(200).send(courses);
  } catch (e) {
    res.status(400).send();
  }
});

usersRouter.patch("/courses/rating/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    //console.log(course.rating);
    if (course.isRated) {
      res.status(403).send({ error: "You have already rated this course" });
    }
    if (!course.isApplied) {
      res.status(403).send({ error: "You have not enrolled for this course" });
    }
    const newRating =
      (course.rating * course.noOfRatings + req.body.rating) /
      (course.noOfRatings + 1);
    const newNoOfRatings = course.noOfRatings + 1;
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, {
      noOfRatings: newNoOfRatings,
      rating: Math.round(newRating * 10) / 10,
      isRated: true,
    });
    if (!updatedCourse) {
      return res.status(403).send();
    }
    res.status(200).send({ message: "You have rated the course" });
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = usersRouter;
