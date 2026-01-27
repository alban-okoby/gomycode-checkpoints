async function asyncFunc1() {
  await delay(1000);
  console.log("Function 1 done");
}

async function asyncFunc2() {
  await delay(1000);
  console.log("Function 2 done");
}

async function asyncFunc3() {
  await delay(1000);
  console.log("Function 3 done");
}

async function chainedAsyncFunctions() {
  await asyncFunc1();
  await asyncFunc2();
  await asyncFunc3();
}

// Example usage:
chainedAsyncFunctions();
