'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')

var Campuses = db.define('campuses', {
  name: Sequelize.STRING,
  image: Sequelize.STRING
})

// Campuses.findOrCreate( {where: {name: 'Wyoming', image: 'http://i.imgur.com/oHksTv7.jpg'} })
// Campuses.findOrCreate( {where: {name: 'Lake Tahoe', image: 'http://i.imgur.com/3QjiuIT.jpg'} })
// Campuses.findOrCreate( {where: {name: 'Hawaii', image: 'http://imgur.com/9qWZSqn.jpg'} })
// Campuses.findOrCreate( {where: {name: 'Utah', image: 'http://imgur.com/F3TIQTI.jpg'} })

module.exports = Campuses;