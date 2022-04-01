import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { FbLoginUserData, LoginError, LoginUserData } from '../../models/user.model';
import { fbLoginRequest, loginUserRequest } from '../../store/users.actions';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | LoginError>;
  authStateSub!: Subscription;
  fbLoading: Observable<boolean>;

  constructor(private store: Store<AppState>,
              private auth: SocialAuthService) {
    this.loading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.loginError);
    this.fbLoading = store.select(state => state.users.fbLoginLoading);
  }

  ngOnInit(): void {
    this.authStateSub = this.auth.authState.subscribe((user: SocialUser) => {
      const userData: FbLoginUserData = {
        authToken: user.authToken,
        id: user.id,
        email: user.email,
        name: user.name,
        picUrl: user.response.picture.data.url,
      };
      this.store.dispatch(fbLoginRequest({userData}));
    });
  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(loginUserRequest({userData}));
  }

  fbLogin() {
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy(): void {
    this.authStateSub.unsubscribe();
  }
}
