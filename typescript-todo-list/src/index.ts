import { getNewPromise, MutliPromiseHandler } from "./handling-promises.js";
import { Calculator } from "./calculator.js";

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

(function main(): void {
  // Define type as an array of functions that return Promises
  const promiseFunctions: (() => Promise<string>)[] = [];
  let j = 5;
  while (j > 0) {
    promiseFunctions.push(getNewPromise);
    j--;
  }

  // Pass the array into the function
  MutliPromiseHandler(promiseFunctions);

  const calculator = new Calculator(5);
  console.log(
    `Output: ${calculator.add(3).multiply(4).subtract(5).getValue()}`,
  );
  // console.log(calculator.add(3).multiply(4).subtract(5).getValue()); // Output: 27

  // console.log(add(5).multiply(2).subtract(3).value()); // Output: 7
  //
  // add(n: number) {
  //     let total = n;
})();
