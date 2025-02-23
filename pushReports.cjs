/**
 * Single Responsibility Principle (SRP): Created a CouchbaseService class to handle Couchbase operations.
 * Open/Closed Principle (OCP): The CouchbaseService class can be extended with new methods without modifying existing code.
 * Liskov Substitution Principle (LSP): Ensured that the CouchbaseService class can be replaced with any other service class that follows the same interface.
 * Interface Segregation Principle (ISP): The class has a clear interface with a single method for pushing reports.
 * Dependency Inversion Principle (DIP): The CouchbaseService class depends on abstractions (configuration object) rather than concrete implementations.
*/

require('dotenv').config();
const uuid = require('uuid');
const nodeConfig = require('config');
const isEmpty = require('lodash/isEmpty');
const forEach = require('lodash/forEach');

class CouchbaseService {
  constructor(config) {
    const {
      connectionString,
      username,
      password,
      configProfile,
      bucketName,
      collectionName,
    } = config.couchBase;

    this.scopeName = process.env.SCOPE || null;
    this.collection = connection.collection({
      connectionString,
      username,
      password,
      configProfile,
      bucketName,
      scopeName: this.scopeName,
      collectionName,
    });
  }

  async pushReports(reports) {
    if (isEmpty(reports)) {
      console.log('couchbase push is skipped: results are empty');
      return;
    }

    forEach(reports, async (report) => {
      await this.collection.upsert(uuid.v6(), report);
    });

    console.log('couchbase: report was pushed successfully!');
  }
}

(async () => {
  try {
    const mergedReports = await reports.get.merged();
    const couchbaseService = new CouchbaseService(nodeConfig);
    await couchbaseService.pushReports(mergedReports);
  } catch (error) {
    console.log(error);
  }
})();
