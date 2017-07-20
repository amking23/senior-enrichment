'use strict'
const api = require('express').Router()
const db = require('../db')
const Students = require('../db/models/students')
const Campuses = require('../db/models/campuses')

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}))

//STUDENTS
api.get('/students', function(req, res, next) {
  Students.getStudentsWithCampus()
  .then(function(students){
    res.json(students)
  })
  .catch(next)
})

api.get('/students/:studentId', function(req, res, next) {
  Students.getStudentWithCampus(req.params.studentId)
  .then(function(student){
    res.json(student)
  })
  .catch(next)
})

api.get('/campuses', function(req, res, next) {
  Campuses.getCampusesWithStudents()
  .then(function(campusesWithStudents){
    res.json(campusesWithStudents)
  })
  .catch(next)
})

api.get('/campuses/:campusId', function(req, res, next) {
  Students.getStudentsWithCampus(req.params.campusId)
  .then(function(students){
    res.json(students)
  })
  .catch(next)
})

api.post('/students/add', function(req, res, next) {
  Students.create({
    name: req.body.name,
    email: req.body.email,
    image: req.body.image,
    campusId: req.body.campusId
  })
  .then(function (newStudent){
    res.status(201).json(newStudent)
  })
  .catch(next)
})

api.post('/campuses/add', function(req, res, next) {
  Campuses.create({
    name: req.body.name,
    image: req.body.image,
  })
  .then(function (newCampus){
    res.status(201).json(newCampus)
  })
  .catch(next)
})

api.delete('/students/:studentId', function(req, res, next) {
  Students.destroy({where: {id: req.params.studentId}})
  .then(() => res.status(204).end())
  .catch(next)
})

api.delete('/campuses/:campusId', function(req, res, next) {
  Campuses.destroy({where: {id: req.params.campusId}})
  .then(() => res.status(204).end())
  .catch(next)
})




module.exports = api