import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import * as axe from 'axe-core';
import { Observable, of, Subject, throwError } from 'rxjs';

import { RepoListComponent } from './repo-list.component';
import { RepoListService } from './repo-list.service';

fdescribe('RepoListComponent', () => {
  let component: RepoListComponent;
  let fixture: ComponentFixture<RepoListComponent>;
  let repoListService: any;

  beforeEach(async () => {
    const repos = [
      {
        name: 'Foo',
        description: 'Bar'
      }
    ];
    repoListService = {
      get repos() {
        return of(repos);
      }
    };

    await TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [ RepoListComponent ],
      providers: [
        { provide: RepoListService, useValue: repoListService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a repo card', () => {
    const ourDomCardsUnderTest = Array.from(
      document.getElementsByTagName('mat-card')
    );

    ourDomCardsUnderTest.forEach(card => {
      const cardTitle = card.getElementsByTagName('mat-card-title')[0]
        .textContent;
      const cardContent = card.getElementsByTagName('mat-card-content')[0]
        .textContent;

      expect(cardTitle).toContain('Foo');
      expect(cardContent).toContain('Bar');
    });
  });

  // it('should show the loading state', () => {
  //   component.repos$ = of(null);
  //   component.error$ = new Subject<string>();
  //   component.error$.next();
  //
  //   const spinner = document.getElementsByTagName('mat-spinner')[0];
  //   console.log('spinner', spinner);
  //   expect(spinner).toBeTruthy();
  // });
  //
  // fit('should show the error state', () => {
  //   spyOn(component, 'getRepoList').and.returnValue(of(null));
  //   component.ngOnInit()
  //   fixture.whenStable().then(() => {
  //     fixture.detectChanges();
  //     component.error$.hasError = true;
  //     component.error$.thrownError = { message: 'foo' };
  //     console.log('component.error$', component.error$);
  //     console.log('component.repos$', component.repos$);
  //
  //     const error = fixture.nativeElement.querySelector('.error-content');
  //     const div = fixture.nativeElement.querySelector('.repo-list');
  //     console.log('div', div);
  //     console.log('error', error);
  //     expect(error).toBeTruthy();
  //   });
  // });

  it('should be accessible', (done: DoneFn) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const div = fixture.nativeElement.querySelector('.repo-list');

      axe.run(div, {}, (err: any, { violations } : {violations: any}) => {
        expect(err).toBe(null);
        expect(violations.length).toBe(0);
        done();
      });
    });
  });
});
