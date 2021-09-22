import { TestBed } from '@angular/core/testing';

import { LoginTpService } from './login-tp.service';

describe('LoginTpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginTpService = TestBed.get(LoginTpService);
    expect(service).toBeTruthy();
  });
});
