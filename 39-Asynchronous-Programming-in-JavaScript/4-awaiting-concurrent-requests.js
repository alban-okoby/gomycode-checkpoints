/**
 * Runs both API calls concurrently and logs results once both are done
 */

function fakeApiCall1() {
  return new Promise(resolve => setTimeout(() => resolve("Data from API 1"), 1000));
}

function fakeApiCall2() {
  return new Promise(resolve => setTimeout(() => resolve("Data from API 2"), 1500));
}

async function concurrentRequests() {
  const [result1, result2] = await Promise.all([fakeApiCall1(), fakeApiCall2()]);
  console.log("Combined results:", result1, result2);
}

// Example usage:
concurrentRequests();
