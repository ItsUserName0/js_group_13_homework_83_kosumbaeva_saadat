import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { artistsReducer } from './artists.reducer';
import { albumsReducer } from './albums.reducer';
import { userReducer } from './users.reducer';
import { ArtistsEffects } from './artists.effects';
import { AlbumsEffects } from './albums.effects';
import { UsersEffects } from './users.effects';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{'users': ['user']}],
    rehydrate: true,
  })(reducer);
};

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

const reducers = {
  artists: artistsReducer,
  albums: albumsReducer,
  users: userReducer,
};

const effects = [ArtistsEffects, AlbumsEffects, UsersEffects];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule],
})

export class AppStoreModule { }

