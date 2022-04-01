import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import {
  fbLoginFailure,
  fbLoginRequest, fbLoginSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUser,
  logoutUserRequest,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from './types';

@Injectable()
export class UsersEffects {

  constructor(private actions: Actions,
              private router: Router,
              private store: Store<AppState>,
              private helpers: HelpersService,
              private usersService: UsersService,) {
  }

  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({userData}) => this.usersService.registerUser(userData).pipe(
      map(user => registerUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackBar('Registered successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(registerUserFailure),
    )),
  ));

  loginUser = createEffect(() => this.actions.pipe(
    ofType(loginUserRequest),
    mergeMap(({userData}) => this.usersService.loginUser(userData).pipe(
      map(user => loginUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackBar('Sign in successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginUserFailure),
    )),
  ));

  fbLoginUser = createEffect(() => this.actions.pipe(
    ofType(fbLoginRequest),
    mergeMap(({userData}) => this.usersService.fbLoginUser(userData).pipe(
      map(user => fbLoginSuccess({user})),
      tap(() => {
        this.helpers.openSnackBar('Sign in successful');
        void this.router.navigate(['/']);
      }),
      catchError(error => {
        return of(fbLoginFailure({error}));
      }),
    )),
  ));

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    mergeMap(() => {
      return this.usersService.logout().pipe(
        map(() => logoutUser()),
        tap(() => {
          void this.router.navigate(['/']);
          this.helpers.openSnackBar('Logout successful');
        })
      );
    })
  ));

}
