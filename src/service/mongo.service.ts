import * as mongodb from "mongodb"

export default class MongoService {
  private db! : mongodb.Db;

  private config = {
    connection_string : process.env.DB_CONN_STRING!,
    db_name: process.env.DB_NAME!
  }

  public async connect() {
    const client: mongodb.MongoClient = new mongodb.MongoClient(this.config.connection_string);
    try {
      await client.connect();
      this.db = client.db(this.config.db_name);
      console.log("Succesfully connected to mongodb")
    } catch (e: any) {
      console.error(`Could not establish connection to client.\n` + e)
    }
  }

  public async get<Type>(collection_name: string, filter: Object): Promise<Array<Type>> {
    try {
      const collection: mongodb.Collection = this.db.collection(collection_name);
      const objects = collection.find(filter).toArray() as unknown as Array<Type>;
      return objects;
    } catch (e: any) {
      console.error(`Could not get data from collection "${collection_name}" with the specified type.`);
      return Promise.reject(e);
    }
  }

  public async addOne<Type>(collection_name: string, object: Type): Promise<Type>{
    try {
      const collection: mongodb.Collection = this.db.collection(collection_name);
      const result: Type = collection.insertOne(object) as unknown as Type;
      return result;
    } catch (e: any) {
      console.error(`Could not add data to collection "${collection_name}" with the specified type.`);
      return Promise.reject(e);
    }
  }

  public async addMany<Type>(collection_name: string, array: Array<Type>): Promise<Array<Type>> {
    try {
      const collection: mongodb.Collection = this.db.collection(collection_name);
      const result: Array<Type> = collection.insertMany(array) as unknown as Array<Type>;
      return result;
    } catch (e: any) {
      console.error(`Could not add data to collection "${collection_name}" with the specified type.`);
      return Promise.reject(e);
    }
  }

  public async removeAll(collection_name: string): Promise<void> {
    try {
      const collection: mongodb.Collection = this.db.collection(collection_name);
      await collection.deleteMany({});
    } catch (e: any) {
      console.error(`Could not add data to collection "${collection_name}" with the specified type.`);
      return Promise.reject(e);
    }
  }

}