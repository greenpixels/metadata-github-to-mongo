import * as mongodb from "mongodb"
import dotenv from "dotenv"
import fs from "fs"
import Event from "../dto/event.dto";

dotenv.config();
export default class MongoService {
  private db!: mongodb.Db;
  private client!: mongodb.MongoClient;

  private config = {
    connection_string: process.env.DB_CONN_STRING!,
    db_name: process.env.DB_NAME!
  }

  public async connect(): Promise<void> {
    const client: mongodb.MongoClient = new mongodb.MongoClient(this.config.connection_string);
    try {
      this.client = await client.connect();
      this.db = client.db(this.config.db_name);
      console.log("Succesfully connected to mongodb")
    } catch (e: any) {
      console.error(`Could not establish connection to client.`)
    }
  }

  public async get<Type>(collection_name: string, filter: Object): Promise<Array<Type>> {
    try {
      const collection: mongodb.Collection = this.db.collection(collection_name);
      const objects = collection.find(filter).toArray() as unknown as Array<Type>;
      return objects;
    } catch (e: any) {
      console.error(`Could not get data from collection "${collection_name}" with the specified type.`);
      console.error(e);
      return Promise.reject(e);
    }
  }

  public async addOne<Type>(collection_name: string, object: Type): Promise<Type> {
    try {
      const collection: mongodb.Collection = this.db.collection(collection_name);
      const result: Type = collection.insertOne(object) as unknown as Type;
      return result;
    } catch (e: any) {
      console.error(`Could not add data to collection "${collection_name}" with the specified type.`);
      console.error(e);
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
      console.error(e);
      return Promise.reject(e);
    }
  }

  public async removeAll(collection_name: string): Promise<void> {
    try {
      const collection: mongodb.Collection = this.db.collection(collection_name);
      await collection.deleteMany({});
    } catch (e: any) {
      console.error(`Could remove add data from collection "${collection_name}".`);
      console.error(e);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      return this.client.close();
    } catch (e: any) {
      console.error(e);
    }
  }

  public async convertToCSV(collection_name: string, keys: Array<keyof Event>): Promise<void> {
    let buffer: string = "";
    let entries: Array<Event>;
    console.log("Written to file.");

    try {
      entries = await this.get(collection_name, {});
      buffer = keys.join(';');
      buffer += '\n';

      //Iterate over every entry of the collection and ...
      for (let entry of entries) {
        let row: String = "";
        // Put its field in accordance to the key into the buffer
        for (let key of keys) {
          let field = entry[key as keyof Event];
          // If the field doesn't exist, than leave the value empty
          if (field != undefined) {
            row += '"' + field + '"';
          } else {
            console.error(`Field ${key} was undefined.`)
            row += '""';
          }
          //Seperate values
          row += ";"
        }
        // Concat csv row up until the last comma to the buffer
        buffer += row.substring(0, row.length - 1) + '\n';
      }
      try {
        fs.writeFileSync("data.csv", buffer);
      } catch (e) {
        Promise.reject("Couldn't write to file.")
      }
    } catch (e) {
      Promise.reject(e);
    }
  }
}