# Async/Await Practice Tasks

This repository contains examples of using `async/await` in JavaScript for sequential, concurrent, and parallel asynchronous operations.

## Task 01: Iterating with Async/Await
Logs each value from an array with a 1-second delay.


##  Task 02: Awaiting a Call
Simulates fetching data from an API and logs the result.

## Task 03: Handling Errors with Async/Await
Adds error handling for failed API calls.

```js
async function awaitCallWithErrorHandling() {
  try {
    const data = await new Promise((res, rej) => setTimeout(() => rej("API failed"), 1000));
    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
}
```

Chaining Async Functions
Sequentially executes three async functions with delays.
```js
async function chainedAsyncFunctions() {
  for (let i = 1; i <= 3; i++) {
    await new Promise(res => setTimeout(res, 1000));
    console.log(`Function ${i} done`);
  }
}
```

## Task 04: Awaiting Concurrent Requests
Runs multiple async calls concurrently and logs combined results.

```js
async function concurrentRequests() {
  const results = await Promise.all([
    new Promise(res => setTimeout(() => res("API 1"), 1000)),
    new Promise(res => setTimeout(() => res("API 2"), 1500))
  ]);
  console.log("Combined results:", results);
}
```

## Task 05: Awaiting Parallel Calls
Fetches data from multiple URLs concurrently using Promise.all.

```js
async function parallelCalls(urls) {
  const results = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
  console.log("All responses:", results);
}
```


