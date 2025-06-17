import mysql from "mysql";

// MySQL connection
const con = mysql.createConnection({
  host: "localhost",
  user: "scott",
  password: "oracle",
  database: "mybd",
  port: "3307",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("connected to MySQL!");
});

// Find a user by email or username
export const findUserByEmailOrUsername = (email, username) => {
  return new Promise((resolve, reject) => {
    const checkQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
    con.query(checkQuery, [email, username], function (err, result) {
      if (err) return reject(err);
      resolve(result.length > 0 ? result[0] : null);
    });
  });
};

// Create a new user
export const createUser = (username, email, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const insertQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    con.query(insertQuery, [username, email, hashedPassword], function (err, result) {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
