
import { TestBed } from '@angular/core/testing';

import {AuthService} from './auth.service';
import { Injectable } from '@angular/core';

describe('AuthService', () => {
  let authService: AuthService; // Add this

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });

    authService = TestBed.get(AuthService); // Add this
  });

  it('should be created', () => { // Remove inject()
    expect(authService).toBeTruthy();
  });
});