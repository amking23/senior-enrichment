const Students = require('./db/models/index').Students
const Campuses = require('./db/models/index').Campuses
const db = require('./db')

const assignRandomCampus = function(){
  return Math.floor(Math.random() * 4) + 1
}

const studentList = [
  {name: 'Anne Marie King', email: 'amking23@gmail.com', image: 'http://i.imgur.com/MyzC5Dk.jpg', campusId: 1},
  {name: 'Andy King', email: 'andykingFU@gmail.com', image: 'http://i.imgur.com/daxT1SV.jpg', campusId: 2},
  {name: 'Amy King', email: 'amy@gmail.com', image: 'http://i.imgur.com/5WRjs59.jpg', campusId: 4}, 
  {name: 'Eric King', email: 'EJKinger@gmail.com', image: 'http://i.imgur.com/zpP309d.jpg', campusId: 3},
  {name: 'Emerol King', email: 'SirEmerol@gmail.com', image: 'http://i.imgur.com/CZPKX7D.png', campusId: 1},
  {name: 'Jarett Bruner', email: 'JB@gmail.com', image: 'http://i.imgur.com/zTyY8Rn.jpg', campusId: 4},
  {name: 'Cameron Saum', email: 'Camera@gmail.com', image: 'http://i.imgur.com/b4gL9XC.jpg', campusId: 3},
  {name: 'Megan Kasarda', email: 'BIIGMegs@gmail.com', image: "http://i.imgur.com/ceusL0I.jpg", campusId: 2},
  {name: 'PJ Strobel', email: 'Peej@gmail.com', image: 'http://i.imgur.com/npQdPlV.png', campusId: 2},
  {name: 'Emily Krutz', email: 'Emily@Emily.com', image: 'http://i.imgur.com/9cKGcu4.png', campusId: 1},
  {name: 'Timmy Riggins', email: 'BigRigs@gmail.com', image: 'http://i.imgur.com/eZEzs9i.jpg', campusId: 3},
  {name: 'Katherine Pierce', email: 'KaterinaP@gmail.com', image: 'http://i.imgur.com/p4it4jj.jpg', campusId: 2},
  {name: 'Hester Notenboom', email: 'HNotenboom@gmail.com', image: 'http://i.imgur.com/YYwtTpT.jpg', campusId: 1},
  {name: 'Bobby Kelly', email: 'BK@gmail.com', image: 'http://i.imgur.com/mWUN7w1.png', campusId: 4},
  {name: 'Darren Spensieren', email: 'Darryl@gmail.com', image: 'http://i.imgur.com/m5bWqNg.jpg', campusId: 1},
  {name: 'Doug Stockton', email: 'DougieFreshe@gmail.com', image: 'http://i.imgur.com/cp1fERX.jpg', campusId: 2},
  {name: 'Chandler Bing', email: 'Binger@gmail.com', image: 'http://i.imgur.com/LuKLDKF.png', campusId: 1}
]

const campusList = [
  {name: 'Wyoming', image: 'http://i.imgur.com/oHksTv7.jpg'},
  {name: 'Lake Tahoe', image: 'http://i.imgur.com/3QjiuIT.jpg'},
  {name: 'Hawaii', image: 'http://imgur.com/9qWZSqn.jpg'},
  {name: 'Utah', image: 'http://imgur.com/F3TIQTI.jpg'}
]


const seed = () =>
  console.log('in seed function')
  Promise.all(campusList.map(campus =>
    Campuses.findOrCreate({where: campus}))
  )
  .then(() =>
  Promise.all(studentList.map(student =>
    Students.findOrCreate({where: student}))
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