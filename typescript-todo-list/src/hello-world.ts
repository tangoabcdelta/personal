
// Hello World

function hello(world: String): string {
  return `Hello, ${world}!`;
}

function hello2(world: String): string {
  console.log(`Hello 2, ${world}!`);
  return "hello 2 successfully executed";
}

export { hello, hello2 };