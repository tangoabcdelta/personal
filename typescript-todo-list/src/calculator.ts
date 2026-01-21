
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




export default Calculator;
export {
  Calculator
}