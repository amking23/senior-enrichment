'use strict';
var Sequelize = require('sequelize');
var db = require('../index.js');
const Campuses = require('./campuses')

var Students = db.define('students', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  campusId: Sequelize.INTEGER,
  image: Sequelize.STRING
} , {
  classMethods: {
    getStudentsWithCampus: function(campusId){
      if(campusId){
        return Campuses.find({
          where: {id: campusId},
            include: {
              all: true
            }
          })
        .then(function(studentsWithCampus){
          return studentsWithCampus;
        })
      }
      else {
        return Students.findAll({
          include: {
            all: true
          }
        })
        .then(function(studentWithCampus){
          return studentWithCampus;
        })
      }
    }, 
    getStudentWithCampus: function(studentId){
      return Students.find({
        where: {id: studentId},
        include: {
          all: true
        }
      })
      .then(function(studentWithCampus){
        return studentWithCampus
      })
    }
  }
})

// Students.findOrCreate( {where: {name: 'Anne Marie King', email: 'amking23@gmail.com', image: 'http://i.imgur.com/MyzC5Dk.jpg'}})
// Students.findOrCreate( {where: {name: 'Andy King', email: 'andykingFU@gmail.com', image: 'http://i.imgur.com/daxT1SV.jpg'}})
// Students.findOrCreate( {where: {name: 'Amy King', email: 'amy@gmail.com', image: 'http://i.imgur.com/5WRjs59.jpg'}})
// Students.findOrCreate( {where: {name: 'Eric King', email: 'EJKinger@gmail.com', image: 'http://i.imgur.com/zpP309d.jpg'}})
// Students.findOrCreate( {where: {name: 'Emerol King', email: 'SirEmerol@gmail.com', image: 'http://i.imgur.com/CZPKX7D.png'}})
// Students.findOrCreate( {where: {name: 'Jarett Bruner', email: 'JB@gmail.com', image: 'http://i.imgur.com/zTyY8Rn.jpg'}})
// Students.findOrCreate( {where: {name: 'Cameron Saum', email: 'Camera@gmail.com', image: 'http://i.imgur.com/b4gL9XC.jpg'}})
// Students.findOrCreate( {where: {name: 'Megan Kasarda', email: 'BIIGMegs@gmail.com', image: "http://i.imgur.com/ceusL0I.jpg"}})
// Students.findOrCreate( {where: {name: 'PJ Strobel', email: 'Peej@gmail.com', image: 'http://i.imgur.com/npQdPlV.png'}})
// Students.findOrCreate( {where: {name: 'Emily Krutz', email: 'Emily@Emily.com', image: 'http://i.imgur.com/9cKGcu4.png'}})
// Students.findOrCreate( {where: {name: 'Timmy Riggins', email: 'BigRigs@gmail.com', image: 'http://i.imgur.com/eZEzs9i.jpg'}})
// Students.findOrCreate( {where: {name: 'Katherine Pierce', email: 'KaterinaP@gmail.com', image: 'http://i.imgur.com/p4it4jj.jpg'}})
// Students.findOrCreate( {where: {name: 'Hester Notenboom', email: 'HNotenboom@gmail.com', image: 'http://i.imgur.com/YYwtTpT.jpg'}})
// Students.findOrCreate( {where: {name: 'Bobby Kelly', email: 'BK@gmail.com', image: 'http://i.imgur.com/mWUN7w1.png'}})
// Students.findOrCreate( {where: {name: 'Darren Spensieren', email: 'Darryl@gmail.com', image: 'http://i.imgur.com/m5bWqNg.jpg'}})
// Students.findOrCreate( {where: {name: 'Doug Stockton', email: 'DougieFreshe@gmail.com', image: 'http://i.imgur.com/cp1fERX.jpg'}})
// Students.findOrCreate( {where: {name: 'Chandler Bing', email: 'Binger@gmail.com', image: 'http://i.imgur.com/LuKLDKF.png'}})

for(var i = 0; i < 17; i++) {
  
}


module.exports = Students;