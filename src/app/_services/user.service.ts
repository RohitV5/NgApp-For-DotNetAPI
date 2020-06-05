import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

// No need to manally pass auth http header  because library is doing it
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  // the return type of this method is Observable and we are saying its of type user Array
  getUsers(): Observable<User[]> {
    // get typically returns a type of object so we tell it its type User Array
    return this.http.get<User[]>(this.baseUrl + 'users')
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id)
  }


  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user)
  }

}
