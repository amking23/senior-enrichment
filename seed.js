const Students = require('./db/models/index').Students
const Campuses = require('./db/models/index').Campuses
const db = require('./db')

const studentList = [
  {name: 'Anne Marie King', email: 'amking23@gmail.com', image: 'http://i.imgur.com/MyzC5Dk.jpg'},
  {name: 'Andy King', email: 'andykingFU@gmail.com', image: 'http://i.imgur.com/daxT1SV.jpg'},
  {name: 'Amy King', email: 'amy@gmail.com', image: 'http://i.imgur.com/5WRjs59.jpg'}, 
  {name: 'Eric King', email: 'EJKinger@gmail.com', image: 'http://i.imgur.com/zpP309d.jpg'},
  {name: 'Emerol King', email: 'SirEmerol@gmail.com', image: 'http://i.imgur.com/CZPKX7D.png'},
  {name: 'Jarett Bruner', email: 'JB@gmail.com', image: 'http://i.imgur.com/zTyY8Rn.jpg'},
  {name: 'Cameron Saum', email: 'Camera@gmail.com', image: 'http://i.imgur.com/b4gL9XC.jpg'},
  {name: 'Megan Kasarda', email: 'BIIGMegs@gmail.com', image: "http://i.imgur.com/ceusL0I.jpg"},
  {name: 'PJ Strobel', email: 'Peej@gmail.com', image: 'http://i.imgur.com/npQdPlV.png'},
  {name: 'Emily Krutz', email: 'Emily@Emily.com', image: 'http://i.imgur.com/9cKGcu4.png'},
  {name: 'Timmy Riggins', email: 'BigRigs@gmail.com', image: 'http://i.imgur.com/eZEzs9i.jpg'},
  {name: 'Katherine Pierce', email: 'KaterinaP@gmail.com', image: 'http://i.imgur.com/p4it4jj.jpg'},
  {name: 'Hester Notenboom', email: 'HNotenboom@gmail.com', image: 'http://i.imgur.com/YYwtTpT.jpg'},
  {name: 'Bobby Kelly', email: 'BK@gmail.com', image: 'http://i.imgur.com/mWUN7w1.png'},
  {name: 'Darren Spensieren', email: 'Darryl@gmail.com', image: 'http://i.imgur.com/m5bWqNg.jpg'},
  {name: 'Doug Stockton', email: 'DougieFreshe@gmail.com', image: 'http://i.imgur.com/cp1fERX.jpg'},
  {name: 'Chandler Bing', email: 'Binger@gmail.com', image: 'http://i.imgur.com/LuKLDKF.png'}
]

const campusList = [
  {name: 'Wyoming', image: 'http://i.imgur.com/oHksTv7.jpg'},
  {name: 'Lake Tahoe', image: 'http://i.imgur.com/3QjiuIT.jpg'},
  {name: 'Hawaii', image: 'http://imgur.com/9qWZSqn.jpg'},
  {name: 'Utah', image: 'http://imgur.com/F3TIQTI.jpg'}
]

const assignRandomCampus = function(){
  return Math.floor(Math.random() * 4) + 1
}

const seed = () =>
  console.log('in seed function')
  Promise.all(studentList.map(student =>
    Students.create(Object.assign(student, {campusId: assignRandomCampus()})))
  )
  .then(() =>
  Promise.all(campusList.map(campus =>
    Campuses.create(campus))
  )
);


const main = () => {
  console.log('Syncing db...');
  db.sync({ force: false })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();