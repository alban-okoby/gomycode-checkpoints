function fakeApiCall() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Fetched data from API"), 1000);
  });
}

async function awaitCall() {
  const data = await fakeApiCall();
  console.log(data);
}

// Example usage:
awaitCall();
