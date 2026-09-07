// ## Part 1 — Variables, Arrow Functions, Destructuring, Spread
// ### Exercise 1 — `const` and `let`
// Identify which variables should be `const` and which should be `let`. Rewrite the block.

let movieTitle = "Inception";
const releaseYear = 2010;
let isWatched = false;
let rating = 8.8;

try{

// Later in the code:
isWatched = true;
rating = 8.8 + 0.2;
movieTitle = "Interstellar"; // should this be allowed?

console.log(movieTitle, releaseYear, isWatched, rating);
} catch (error) {
    console.table({msg: "something wrong happened", error: error?.messgae});
} finally {
console.log("the code finished executing");
}