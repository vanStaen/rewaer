const testuser = {
  firstname: "Clement",
  lastname: "van Staen",
  username: "clement",
  age: 34,
  from: "Berlin",
  email: "clement.vanstaen@gmail.com",
};

class User {
  constructor(firstname, lastname, age, from) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.from = from;
  }

  greeting() {
    console.log(
      "Hello " + this.firstname + this.lastname + " from " + this.from
    );
  }
}

module.exports = testuser;
module.exports = User;
