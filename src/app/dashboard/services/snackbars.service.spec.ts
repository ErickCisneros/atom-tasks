import { TestBed } from '@angular/core/testing';
import { SnackbarsService } from './snackbars.service';

describe('SnackbarsService', () => {
  let service: SnackbarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
