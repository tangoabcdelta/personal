// Handling Promises Example
function fetchData(): Promise<string> {
  return Promise.resolve("data fetched");
}

// Handling Promises Example

function getNewPromise(): Promise<string> {
  const t: number = Math.random() * 1000;
  const p: Promise<string> = new Promise((resolve, reject) => {
    if (t > 300 && t < 800) {
      setTimeout(() => {
        resolve(`resolved within ${t}ms`);
      }, t);
    } else {
      setTimeout(() => {
        reject(`rejected within ${t}ms`);
      }, t);
    }
  });

  return p;
}


async function MutliPromiseHandler(
  tasks: (() => Promise<string>)[]
): Promise<void> {
  // a function that executes an array of asynchronous tasks sequentially
  // this collects both resolved values and errors
  // returns the array of results and errors
  const results: string[] = [];

  for (const task of tasks) {
    try {
      // Await the execution of the function
      let res = await task();
      console.log(res);
      results.push(res);
      // .then((result: string) => {
      //     console.log(`Promise ${i + 1} resolved with value: ${result}`);
      // })
      // .catch((error: any) => {
      //     console.log(`Promise ${i + 1} rejected with error: ${error}`);
      // });
    } catch (error) {
      console.log(`Promise failed: ${error}`);
      results.push(`Error: ${error}`);
    }

    console.log("All tasks complete:", results);
  }
}

// Pass the array into the function
// MutliPromiseHandler(promiseFunctions);

export default MutliPromiseHandler;
export {
    getNewPromise,
    MutliPromiseHandler
};