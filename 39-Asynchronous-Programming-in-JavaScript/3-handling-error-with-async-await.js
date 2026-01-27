function fakeApiCallWithError(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject("API call failed");
      else resolve("Fetched data successfully");
    }, 1000);
  });
}

async function awaitCallWithErrorHandling() {
  try {
    const data = await fakeApiCallWithError(true); // change to false to succeed
    console.log(data);
  } catch (error) {
    console.log("Oops! Something went wrong:", error);
  }
}

// Example usage:
awaitCallWithErrorHandling();
