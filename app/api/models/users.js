/**
 * In model file we include mongoose for model schema, bcrypt to hash our 
 * password and also defined salt round which will be used for hashing 
 * plain text password. Mongoose provide middleware(pre/post hooks) which
 * we can use to manipulate our data before/after inserting into database. 
 * We have used pre hook save method to hash our password before saving into database. 
 * In pre hooks callback function this keyword refer to UserSchema object and 
 * this.password is password passed from registration form which we will be 
 * creating soon. You can read more about mongoose and its function at https://github.com/Automattic/mongoose
 */

// Now lets create model file for user
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// With "salt round" they actually mean the cost 
// factor. The cost factor controls how much time 
// is needed to calculate a single BCrypt hash. 
// The higher the cost factor, the more hashing 
// rounds are done. Increasing te cost factor by 1 
// doubles the necessary time. The more time is 
// necessary, the more difficult is brute-forcing.
const saltRounds = 10;

// The salt is a random value, and should differ for each calculation, so the result should hardly ever be the same, even for equal passwords.
// The salt is usually included in the resulting hash-string in readable form. So with storing the hash-string you also store the salt. Have a look at this answer for more details.

// Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
 name: {
  type: String,
  trim: true,  
  required: true,
 },
 email: {
  type: String,
  trim: true,
  required: true
 },
 password: {
  type: String,
  trim: true,
  required: true
 }
});
// Hash user password before saving into database
UserSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});
module.exports = mongoose.model('User', UserSchema);
