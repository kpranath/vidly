// _id: 5f125a0c5af3e92e4c59c687

// 24 character long. 12 bytes.
//4bytes = timestamp
//3bytes = machine identifier
//2bytes = process identfier
//3bytes = counter


// const mongoose = require('mongoose');

// const id = new mongoose.Types.ObjectId();
// console.log(id);

// console.log(id.getTimestamp());

// const isValid = mongoose.Types.ObjectId.isValid('1234');
// console.log(isValid);

const sha256 = require('sha256');
console.log(sha256('qwerty123'));