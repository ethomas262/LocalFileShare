import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message'

import { config } from 'dotenv'

import { FileDataService } from './file-service.service';

describe('FileDataService', () => {
  let service: FileDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
