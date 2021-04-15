import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { RepoListService } from '../repo-list/repo-list.service';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.scss']
})
export class RepoDetailsComponent implements OnInit {
  error$ = new Subject<string>();
  languages$!: Observable<any>;
  repo!: any;

  constructor(
    private repoListService: RepoListService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.repo = this.router.getCurrentNavigation()?.extras?.state;
    this.getLanguageList();
  }

  getLanguageList() {
    console.log('this.repo', this.repo);
    if (this.repo) {
      return this.repoListService.getLanguages(this.repo).pipe(
        catchError((error) => {
          console.error('error loading the list of repos', error);
          this.error$.next(error?.message);
          return of();
        })
      );
    }

    return of();
  }
}
