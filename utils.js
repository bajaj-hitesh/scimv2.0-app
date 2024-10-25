// utils.js
//const db = require('./db');
const uuid = require('uuid');

const parseJsonField = (field) => (field ? JSON.parse(field) : []);
const stringifyJsonField = (field) => JSON.stringify(field || []);

function createUser(userData) {
   const id = uuid.v4();
   if(userData && userData.emails)
    var emails = stringifyJsonField(userData.emails);
//    db.run(`INSERT INTO Users (id, userName, name, emails) VALUES (?, ?, ?, ?)`,
//       [id, userData.userName, userData.name, emails]
//    );
   return { id, ...userData };
}

function getUser(id, callback) {
   db.get(`SELECT * FROM Users WHERE id = ?`, [id], (err, row) => {
      if (row) {
         row.emails = parseJsonField(row.emails);
      }
      callback(err, row);
   });
}

function updateUser(id, userData) {
   const emails = stringifyJsonField(userData.emails);
   db.run(`UPDATE Users SET userName = ?, name = ?, emails = ? WHERE id = ?`,
      [userData.userName, userData.name, emails, id]
   );
}

function deleteUser(id) {
   db.run(`DELETE FROM Users WHERE id = ?`, id);
}

module.exports = { createUser, getUser, updateUser, deleteUser };
