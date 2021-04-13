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
  error$ = new Subject<boolean>();
  repos$!:Observable<any>;

  constructor(private repoListService: RepoListService) { }

  ngOnInit(): void {
    this.repos$ = this.repoListService.getRepos().pipe(
      catchError((error) => {
        console.error('error loading the list of users', error);
        this.error$.next(error?.message);
        return of();
      })
    );
  }

}
