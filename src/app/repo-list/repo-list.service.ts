import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class RepoListService {
  private cache$!: Observable<any>;
  readonly API_URL = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  get repos(): Observable<any> {
    if (!this.cache$) {
      this.cache$ = this.getRepos().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  getRepos() {
    return this.http.get(`${this.API_URL}/users/LadyKamille/repos`)
      .pipe(
        map((response: any) => {
          return response?.map((item: any) => item);
        }),
        retry(3), // retry a failed request up to 3 times
      )
  }

  getLanguages(repo: string) {
    return this.http.get(`${this.API_URL}/users/LadyKamille/${repo}/languages`)
      .pipe(
        map((response: any) => {
          return response?.map((item: any) => item);
        }),
        retry(3), // retry a failed request up to 3 times
      )
  }
}
