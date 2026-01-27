/** 
 * Logs each value with a 1-second delay between logs
 */
 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function iterateWithAsyncAwait(values) {
  for (const value of values) {
    console.log(value);
    await delay(1000); // Wait 1 second before next iteration
  }
}

// Example usage:
iterateWithAsyncAwait([1, 2, 3, 4]);
