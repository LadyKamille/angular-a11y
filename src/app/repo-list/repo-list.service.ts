import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepoListService {
  constructor(private http: HttpClient) { }

  getRepos() {
    return this.http.get(`https://api.github.com/users/LadyKamille/repos`)
      .pipe(
        map((response: any) => {
          return response?.map((item: any) => item);
        }),
        retry(3), // retry a failed request up to 3 times
      )
  }
}
