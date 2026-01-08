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

// Define type as an array of functions that return Promises
const promiseFunctions: (() => Promise<string>)[] = [];
let j = 5;
while (j > 0) {
  promiseFunctions.push(getNewPromise);
  j--;
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
MutliPromiseHandler(promiseFunctions);

// Function or Method Chaining Example with Calculators

class Calculator {
  private n: number;

  constructor(n: number) {
    this.n = n;
  }

  add(n: number) {
    this.n += n;
    return this;
  }

  multiply(n: number) {
    this.n *= n;
    return this;
  }

  subtract(n: number) {
    this.n -= n;
    return this;
  }

  getValue(): number {
    return this.n;
  }
}

const calculator = new Calculator(5);
console.log(`Output: ${calculator.add(3).multiply(4).subtract(5).getValue()}`);
// console.log(calculator.add(3).multiply(4).subtract(5).getValue()); // Output: 27

// console.log(add(5).multiply(2).subtract(3).value()); // Output: 7
//
// add(n: number) {
//     let total = n;

// Hello World
const world: String = "World";

function hello(world: String): string {
  return `Hello, ${world}!`;
}

function hello2(world: String): string {
  console.log(`Hello 2, ${world}!`);
  return "hello 2 successfully executed";
}

console.log(hello(world));
console.log(`Output:  ${hello2(world)}`);
