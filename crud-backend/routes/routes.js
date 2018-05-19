const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');
const Course = require('../models/Course');
const Test = require('../models/Test');
const Student = require('../models/Student');



/**
 * Get all the users
 */
router.get('/users', (req, res, next) => {
    User.find(function (error, users) {
        if(error){
            res.status(401).send('Could not find users.');
        } else {
            res.status(200).send(users);
        }
    });
});

/**
 * Gets all the students.
 */
router.get('/students', (req, res, next) => {
   Student.find(function (error, students) {
       if(error) {
           res.status(401).send('Could not find students');
       } else {
           res.status(200).send(students);
       }
   }) 
});



/**
 * Get a user by DePaul ID.
 */
router.get('/user/:depaulID', function(req, res, next) {
    User.findOne({depaulID: req.params.depaulID}, function (error, result) {
        if(error) {
            res.status(401).send('Could not find user.');
        } else {
            res.status(200).send(result);
        }
    });
});

/**
 * Get a student by DePaul ID.
 */
router.get('/student/:depaulID', function(req, res, next) {
   Student.findOne({depaulID: req.params.depaulID}, function(error, result) {
       if(error) {
           res.status(401).send('Could not find student.');
       } else {
           res.status(200).send(result);
       }
   });
});


/**
 * Get all the courses.
 */
router.get('/courses', (req, res, next) => {
    Course.find(function (error, courses) {
        if(error) {
            res.status(401).send('Courses not found.');
        } else {
            res.status(200).send(courses);
        }
    });
});

/**
 * Get a course by ID.
 */
router.get('/course/:CRSE_ID', (req, res, next) => {
    Course.findOne({CRSE_ID: req.params.CRSE_ID}, function (error, course) {
        if(error) {
            res.status(401).send('Course not found.');
        } else {
            res.status(200).send(course);
        }
    })
});



/**
 * Creates a new user and adds it to the User table.
 */
router.post('/user', (req,res, next) => {
    let userData = req.body;
    let newUser = new User(userData);
    newUser.save((error, user) => {
       if(error){
           res.json(error);
       }  else {
           res.json({mssg: 'User added'});
       }
    });
});


/*
    Add a student to the Student table.
 */
router.post('/student',(req, res, next) => {
    let studentData = req.body;
    let newStudent = new Student(studentData);
    newStudent.save((error, student) => {
       if(error) {
           res.json(error);
       } else {
           res.json({mssg: 'Student added'});
       }
    });
});





/**
 * Creates a new course and adds it to the Course table.
 */
router.post('/course', (req, res, next) => {
    let courseData = req.body;
    let newCourse = new Course(courseData);
    newCourse.save((error, course) => {
       if(error) {
           res.status(401).send('Course could not be added.');
       }  else {
           res.status(200).send(course);
       }
    });

});

/********************************* NEW TABLE METHODS START HERE ********************************/
/**
 * Post a course in the table (Ben's table).
 */
router.post('/xcourse', (req, res, next) => {
    let courseData = req.body;
    let newCourse = new xCourse(courseData);
    newCourse.save((error, course) => {
       if(error) {
           res.status(401).send('Course could not be added.');
       } else {
           res.status(200).send(course);
       }
    });
});

/**
 * All the courses
 */
router.get('/xcourses', (req, res, next) => {
    Test.find(function (error, courses) {
        if(error){
            res.status(401).send('Could not find courses.');
        } else {
            res.status(200).send(courses);
        }
    });
});

/**
 * All courses offered in the Fall
 */
router.get('/fall', (req, res, next) => {
    Test.find({OFFERED_FALL: "Y"}, (err, courses) =>{
       if(err) {
           res.json(err);
       }
       else {
           res.json(courses);
       }
    });
});

/**
 * All courses offered in the Winter
 */
router.get('/winter', (req, res, next) => {
   Test.find({OFFERED_WINTER: "Y"}, (err, courses) => {
      if(err) {
          res.json(err);
      } else {
          res.json(courses);
      }
   });
});

/**
 * All courses offered in the Summer
 */
router.get('/summer', (req, res, next) => {
   Test.find({OFFERED_SUMMER: "Y"}, (err, courses) => {
      if(err) {
          res.json(err);
      } else {
          res.json(courses);
      }
   });
});

/**
 * All courses offered in the Spring
 */
router.get('/spring', (req, res, next) => {
    Test.find({OFFERED_SPRING: "Y"}, (err, courses) => {
       if(err) {
           res.json(err);
       } else{
           res.json(courses);
       }
    });
});


/********************************* NEW TABLE METHODS END HERE ********************************/





/**
 * Updates a user with that ID.
 */
router.put('/user/:id', (req, res, next) =>{
    User.findOneAndUpdate({_id: req.params.id}, {
        $set: {
            depaulID: req.body.depaulID,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            userType: req.body.userType
        }
    },function(err, result) {
        if(err) {
         res.json(err);
        }  else {
            res.json(result);
        }
    })
});


/**
 * Update a Student with that ID.
 */
router.put('/student/:id', (req, res, next) => {
   Student.findOneAndUpdate({_id: req.params.id}, {
       $set: {
           depaulID: req.body.depaulID,
           firstName: req.body.firstName,
           lastName: req.body.lastName,
           password: req.body.password,
           userType: req.body.userType
       }
   }, function (error, result) {
       if(error) {
           res.json(error);
       } else {
           res.json(result);
       }
   })
});




/**
 * Updates a course with that ID.
 */
router.put('/course/:id', (req, res, next) => {
    Course.findOneAndUpdate({_id: req.params.id}, {
        $set: {
        CRSE_ID: req.body.CRSE_ID,
        ACAD_GROUPD: req.body.ACAD_GROUPD,
        SUBJECT: req.body.SUBJECT,
        CATALOG_NBR: req.body.CATALOG_NBR,
        DESCR: req.body.DESCR,
        EFFDT: req.body.EFFDT,
        EFF_STATUS: req.body.EFF_STATUS,
        EQUIV_CRSE_ID: req.body.EQUIV_CRSE_ID,
        CONSENT: req.body.CONSENT,
        ALLOW_MULT_ENROLL: req.body.ALLOW_MULT_ENROLL,
        UNITS_ACAD_PROG: req.body.UNITS_ACAD_PROG,
        CRSE_REPEATABLE: req.body.CRSE_REPEATABLE,
        UNITS_REPEAT_LIMIT: req.body.UNITS_REPEAT_LIMIT,
        CRSE_REPEAT_LIMIT: req.body.CRSE_REPEAT_LIMIT,
        GRADING_BASIS: req.body.GRADING_BASIS,
        GRADE_ROSTER_PRINT: req.body.GRADE_ROSTER_PRINT,
        SSR_COMPONENT: req.body.SSR_COMPONENT,
        COURSE_TITLE_LONG: req.body.COURSE_TITLE_LONG,
        COMPONENT_PRIMARY: req.body.COMPONENT_PRIMARY,
        DESCRLONG: req.body.DESCRLONG
        }
    }, function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

/**
 * Deletes a user.
 */
router.delete('/user/:depaulID', (req, res, next) =>{
    User.remove({
        depaulID: req.params.depaulID
    }, function (error, _) {
        if(error) {
            res.send(error);
        } else {
            console.log('User was deleted.');
        }
    })
});


/**
 * Deletes a student.
 */
router.delete('/student/:depaulID', (req, res, next) => {
    Student.remove({
        depaulID : req.params.depaulID
    }, function (error, _) {
        if(error){
            res.send(error);
        } else {
            console.log('Student was deleted.');
        }
    });
});


/**
 * Deletes a course.
 */
router.delete('/course/:CRSE_ID', (req, res, next) => {
    Course.remove({
        CRSE_ID: req.params.CRSE_ID
    }, function (error, _) {
        if(error) {
            res.send(error);
        } else {
            console.log('Course was deleted.');
        }
    });
});

/**
 * Login verification
 */
router.post('/login', (req, res) => {
    let userInfo = req.body;
    User.findOne({userID: userInfo.userID}, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Invalid user ID');
            } else if (user.password !== userInfo.password) {
                res.status(401).send('Invalid password');
            } else {
                res.status(200).send(user);
            }
        }
    });
    console.log(userInfo);
});





module.exports = router;