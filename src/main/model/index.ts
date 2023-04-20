import DB from '../db';
import { Database } from 'sqlite3';
interface Bookmark {
  target_uri: string;
  handle: string;
  comment: string;
  file_uri: string;
  file_name: string;
  file_size: number;
  file_type: string;
}
class BookmarkModel {
  db: Database;
  constructor() {
    this.db = DB.getInstance().getDatabase();
    this.createTable();
  }
  private async createTable(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'CREATE TABLE IF NOT EXISTS bookmarks (bookmardedAt DATETIME, target_uri TEXT, handle TEXT, comment TEXT, file_uri TEXT, file_name TEXT, file_size INTEGER, file_type TEXT)',
        (err) => {
          if (err) {
            reject(err);
          }
          resolve('success');
        }
      );
    });
  }
  public async getAllBookmarks(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM bookmarks', (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }
  public async createBookmark(data: Bookmark): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO bookmarks VALUES (?,?,?,?,?,?,?,?)',
        [
          new Date(),
          data.target_uri,
          data.handle,
          data.comment,
          data.file_uri,
          data.file_name,
          data.file_size,
          data.file_type,
        ],
        (err) => {
          if (err) {
            reject(err);
          }
          resolve('success');
        }
      );
    });
  }
}

export default BookmarkModel;
