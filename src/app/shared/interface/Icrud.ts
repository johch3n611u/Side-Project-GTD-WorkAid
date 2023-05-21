import { Observable } from "rxjs";

export interface Icrud {
  Create<T>(): Observable<T>;
  Read<T>(): Observable<T>;
  Update<T>(): Observable<T>;
  Delete<T>(): Observable<T>;
}
