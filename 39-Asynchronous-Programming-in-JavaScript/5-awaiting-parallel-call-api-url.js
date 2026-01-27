/**
 * Fetches all URLs in parallel and logs the responses together.
 */

async function parallelCalls(urls) {
  const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));
  const results = await Promise.all(fetchPromises);
  console.log("All responses:", results);
}

// Example usage (replace with real URLs or JSONPlaceholder):
parallelCalls([
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2"
]);
