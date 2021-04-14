import { Component, OnInit } from '@angular/core';

import { RepoListService } from './repo-list.service';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit {
  error$ = new Subject<string>();
  repos$!:Observable<any>;

  constructor(private repoListService: RepoListService) { }

  ngOnInit(): void {
    this.repos$ = this.getRepoList();
  }

  getRepoList() {
    console.log('the fuck');
    return this.repoListService.repos.pipe(
      catchError((error) => {
        console.error('error loading the list of users', error);
        this.error$.next(error?.message);
        return of();
      })
    );
  }

}
