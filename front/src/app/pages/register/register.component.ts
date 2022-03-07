import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { RegisterError, User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { registerUserRequest } from '../../store/users.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements AfterViewInit, OnDestroy, OnInit{
  @ViewChild('f') form!: NgForm;
  user: Observable<null | User>;
  userSub!: Subscription;
  userData!: null | User;
  error: Observable<null | RegisterError>;
  errSub!: Subscription;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.error = store.select(state => state.users.registerError);
    this.loading = store.select(state => state.users.registerLoading);
  }

  ngAfterViewInit(): void {
    this.errSub = this.error.subscribe(error => {
      if (error) {
        const msg = error.errors.email.message;
        this.form.form.get('email')?.setErrors({serverError: msg});
      } else this.form.form.get('email')?.setErrors({});
    });
  }

  onSubmit() {
    this.store.dispatch(registerUserRequest({userData: this.form.value}));
  }

  ngOnDestroy(): void {
    console.log(this.userData);
    this.errSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe(user => {
      this.userData = user;
    })
  }

}
