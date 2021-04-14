import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RepoListService } from './repo-list.service';

describe('RepoListService', () => {
  let injector: TestBed;
  let service: RepoListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RepoListService]
    });
    injector = getTestBed();
    service = injector.get(RepoListService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get a list of repos for a user', () => {
    const expectedRepos = [{name: 'Foo'}];

    service.getRepos().subscribe(repos => {
      expect(repos.length).toBe(1);
      expect(repos).toEqual(expectedRepos);
    });

    const req = httpMock.expectOne(`${service.API_URL}/users/LadyKamille/repos`);
    expect(req.request.method).toBe("GET");
    req.flush(expectedRepos);
  });

  it('get a list of languages for a repo', () => {
    const repoName = 'Foo'
    const expectedLanguages = [{name: 'TypeScript'}];

    service.getLanguages(repoName).subscribe(languages => {
      expect(languages.length).toBe(1);
      expect(languages).toEqual(expectedLanguages);
    });

    const req = httpMock
      .expectOne(`${service.API_URL}/users/LadyKamille/${repoName}/languages`);
    expect(req.request.method).toBe("GET");
    req.flush(expectedLanguages);
  });
});
