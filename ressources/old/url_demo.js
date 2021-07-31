const url = require("url");

const myUrl = new URL("http://rewear.com:8080/index.html?id=100&status=active");

// Serialised URL
console.log(myUrl.href);
console.log(myUrl.toString());

// Host (root)
console.log(myUrl.host);
console.log(myUrl.hostname);

// Pathname
console.log(myUrl.pathname);

// Serialise Query
console.log(myUrl.search);

// Params object
console.log(myUrl.searchParams);

// Add param
myUrl.searchParams.append("abc", "123");
console.log(myUrl.searchParams);

// Loop Through the params
myUrl.searchParams.forEach((value, name) => console.log(`${name}: ${value}`));
