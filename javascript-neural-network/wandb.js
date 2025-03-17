/**
 * This code uses the `@wandb/client` library to initialize W&B and load the data to be trained.
 * It then defines a neural network architecture with one hidden layer of size 10 and a learning rate of 0.01.
 * Finally, it trains the neural network using W&B's `train()` method on the loaded data.
 * This uses Weights and Biases (W&B) to train a neural network on some data.
 *
 * Note that this is just an example code snippet and you will need to modify it to suit your specific use case.
 * You can find more information about training a neural network with W&B in their documentation:
 * <https://docs.wandb.ai/guides/trained-models>
 *
 */

// Import the necessary libraries
const wb = require("@wandb/client");
const { NeuralNetwork } = require("../src/NeuralNetwork");

// Initialize W&B
wb.init({ apiKey: "YOUR_API_KEY" });

// Load the data to be trained
const trainData = [
  { input: [1, 2], output: [3] },
  { input: [4, 5], output: [6] },
  // ...
];

// Define the neural network architecture
const nn = new NeuralNetwork({
  hiddenLayers: [10],
  learningRate: 0.01,
});

// Train the neural network using W&B
wb.train(nn, trainData);
