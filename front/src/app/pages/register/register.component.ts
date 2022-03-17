import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { RegisterError } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { registerUserRequest } from '../../store/users.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  error: Observable<null | RegisterError>;
  errSub!: Subscription;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.error = store.select(state => state.users.registerError);
    this.loading = store.select(state => state.users.registerLoading);
  }

  ngAfterViewInit(): void {
    this.errSub = this.error.subscribe(error => {
      if (error) {
        if (error?.errors.email) {
          const msg = error.errors.email.message;
          this.form.form.get('email')?.setErrors({emailServerError: msg});
        } else this.form.form.get('email')?.setErrors(null);

        if (error?.errors.displayName) {
          const msg = error.errors.displayName.message;
          this.form.form.get('displayName')?.setErrors({displayNameServerError: msg});
        } else this.form.form.get('displayName')?.setErrors(null);
      }
    });
  }

  onSubmit() {
    this.store.dispatch(registerUserRequest({userData: this.form.value}));
  }

  ngOnDestroy(): void {
    this.errSub.unsubscribe();
  }

}
