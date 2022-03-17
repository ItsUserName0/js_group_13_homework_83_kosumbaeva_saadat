import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import {
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess, logoutUser, logoutUserRequest,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';
import { map, mergeMap, NEVER, tap, withLatestFrom } from 'rxjs';
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

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([_, user]) => {
      if (user) {
        return this.usersService.logout(user.token).pipe(
          map(() => logoutUser()),
          tap(() => this.helpers.openSnackBar('Logout successful'))
        );
      }

      return NEVER;
    })
  ));

}
