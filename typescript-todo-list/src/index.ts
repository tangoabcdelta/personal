import { getNewPromise, MutliPromiseHandler } from "./handling-promises.js";
import { Calculator } from "./calculator.js";
import { hello, hello2 } from "./hello-world.js";


(function main(): void {
  // Testing Hello World functions
  const world: String = "World";
  const output1: any = hello(world);
  const output2: unknown = hello2(world);
  console.log(output1);
  console.log(`Output:  ${output2}`);
  // This works on type Any
  console.log(output1.toUpperCase());
  if (typeof output1 === "string") {
    console.log('Switched to uppercase:');
    console.log(output1.toUpperCase());
  }
  // This won't work on type unknown
  // console.log(output2.toUpperCase());
  if (typeof output2 === "string") {
    console.log('Switched to uppercase:');
    console.log(output2.toUpperCase());
  }


  // Define type as an array of functions that return Promises
  const promiseFunctions: (() => Promise<string>)[] = [];
  let j = 5;
  while (j > 0) {
    promiseFunctions.push(getNewPromise);
    j--;
  }

  // Pass the array into the function
  MutliPromiseHandler(promiseFunctions);


  // Testing Calculator class
  const calculator = new Calculator(5);
  console.log(
    `Output: ${calculator.add(3).multiply(4).subtract(5).getValue()}`,
  );

})();
