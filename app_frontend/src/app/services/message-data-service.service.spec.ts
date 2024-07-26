import { TestBed } from '@angular/core/testing';

import { MessageDataService } from './message-data-service.service';

describe('MessageDataServiceService', () => {
  let service: MessageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
