import { Database } from 'sqlite3';

class DB {
  //singleton
  private static instance: DB;
  private database: Database;
  private constructor() {
    this.database = new Database('bsky.db');
  }
  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }
  public getDatabase(): Database {
    return this.database;
  }
}

export default DB;
