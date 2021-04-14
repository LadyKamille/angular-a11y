import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RepoListService } from './repo-list.service';

describe('RepoListService', () => {
  let service: RepoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RepoListService]
    });
    service = TestBed.inject(RepoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
