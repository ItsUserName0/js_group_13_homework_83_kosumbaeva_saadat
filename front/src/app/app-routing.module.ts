import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './pages/artists/artists.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { TracksComponent } from './pages/tracks/tracks.component';
import { TrackHistoryComponent } from './pages/track-history/track-history.component';
import { UserTypeService } from './services/user-type.service';
import { EditArtistComponent } from './pages/edit-artist/edit-artist.component';
import { EditAlbumComponent } from './pages/edit-album/edit-album.component';
import { EditTrackComponent } from './pages/edit-track/edit-track.component';

const routes: Routes = [
  {path: '', component: ArtistsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'artist/albums/:id', component: AlbumsComponent},
  {path: 'tracks/:id', component: TracksComponent},
  {
    path: 'track_history',
    component: TrackHistoryComponent,
    canActivate: [UserTypeService],
    data: {userType: ['user']},
  },
  {
    path: 'artists/create/new',
    component: EditArtistComponent,
    canActivate: [UserTypeService],
    data: {userType: ['user']},
  },{
    path: 'albums/create/new',
    component: EditAlbumComponent,
    canActivate: [UserTypeService],
    data: {userType: ['user']},
  },{
    path: 'tracks/create/new',
    component: EditTrackComponent,
    canActivate: [UserTypeService],
    data: {userType: ['user']},
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
