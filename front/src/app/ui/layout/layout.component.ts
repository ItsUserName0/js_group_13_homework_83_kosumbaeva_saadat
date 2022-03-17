import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {
  user: Observable<null | User>;

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
  }

}
