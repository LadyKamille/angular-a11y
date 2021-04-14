import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

const API_ENDPOINT = 'https://api.github.com';
const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class RepoListService {
  private cache$!: Observable<any>;

  constructor(private http: HttpClient) { }

  get repos() {
    if (!this.cache$) {
      this.cache$ = this.getRepos().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  getRepos() {
    return this.http.get(`${API_ENDPOINT}/users/LadyKamille/repos`)
      .pipe(
        map((response: any) => {
          return response?.map((item: any) => item);
        }),
        retry(3), // retry a failed request up to 3 times
      )
  }

  getLanguages(repo: string) {
    return this.http.get(`${API_ENDPOINT}/users/LadyKamille/${repo}/languages`)
      .pipe(
        map((response: any) => {
          return response?.map((item: any) => item);
        }),
        retry(3), // retry a failed request up to 3 times
      )
  }
}
