import { TestBed } from '@angular/core/testing';

import { CurrentCompanyService } from './current-company.service';

describe('CurrentCompanyService', () => {
  let service: CurrentCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
