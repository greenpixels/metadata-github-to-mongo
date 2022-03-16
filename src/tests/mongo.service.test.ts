import MongoService from "../service/mongo.service";
import * as dotenv from "dotenv"

interface TestObject {
  testValue: string
}

dotenv.config();
const mongoservice: MongoService = new MongoService();

describe("MongoDB-Testing", () => {
  test('Succesfully connect to MongoDB', () => {
    return expect(mongoservice.connect()).resolves.not.toThrow();
  });

  test('Add data to specified collection', () => {
    return expect(mongoservice.addOne<TestObject>(process.env.DB_MONGO_TESTING_NAME!, { testValue: "test" })).resolves.not.toThrow()
  })

  test('Retrieved data from specified collections is an array', () => {
    return expect(mongoservice.get<Object>(process.env.DB_MONGO_TESTING_NAME!, {})).resolves.toBeInstanceOf(Array);
  })

  test('Retrieved data from specified collection has exactly one entry', () => {
    return expect(mongoservice.get<Object>(process.env.DB_MONGO_TESTING_NAME!, {})).resolves.toHaveLength(1);
  })

  test('Empty collection without throwing', () => {
    return expect(mongoservice.removeAll(process.env.DB_MONGO_TESTING_NAME!)).resolves.not.toThrow();
  })

  test('Retrieved data from specified collection has no entries', () => {
    return expect(mongoservice.get<Object>(process.env.DB_MONGO_TESTING_NAME!, {})).resolves.toHaveLength(0);
  })

  test('Succesfully close db connection', () => {
    return expect(mongoservice.disconnect()).resolves.not.toThrow();
  })
})
