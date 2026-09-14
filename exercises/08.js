// ## Part 2 — Modules, Array Methods, async/await, Optional Chaining
// ### Exercise 8 — async/await
// Run this file in the browser console or with Node 18+.

const BASE_URL = "https://jsonplaceholder.typicode.com";

// 1. Write an async function fetchPosts() that:
//    - fetches BASE_URL + "/posts"
//    - parses the JSON response
//    - returns the first 5 items
//    - logs each item's title
const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const posts = await response.json();
    posts.slice(0, 5).forEach(post => console.log(post.title));
    return posts.slice(0, 5);
  } catch (error) {
    console.log("Failed to load posts");
  }
};
// 2. Add try/catch to fetchPosts().
//    If the fetch fails, log "Failed to load posts".
const fetchPostsWithErrorHandling = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const posts = await response.json();
    posts.slice(0, 5).forEach(post => console.log(post.title));
    return posts.slice(0, 5);
  } catch (error) {
    console.error("Failed to load posts");
  }
};
// 3. Write an async function getPostById(id) that:
//    - fetches BASE_URL + "/posts/" + id
//    - throws an Error if res.ok is false
//    - returns the parsed JSON object
const getPostById = async (id) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error(`Post with id ${id} not found`);
  }
  return await response.json();
};
// Call getPostById(1) and log the result.
// Call getPostById(99999) — what happens? Handle it;
getPostById(1)
  .then(post => console.log(post))
  .catch(error => console.error(error));
getPostById(99999)
  .then(post => console.log(post))
  .catch(error => console.error(error));