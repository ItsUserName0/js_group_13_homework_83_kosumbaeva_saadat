import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ArtistsComponent } from './pages/artists/artists.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { ArtistComponent } from './ui/artist/artist.component';
import { AlbumComponent } from './ui/album/album.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ValidateIdenticalDirective } from './directives/validate-identical.directive';
import { AppStoreModule } from './store/app-store.module';
import { LoginComponent } from './pages/login/login.component';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TracksComponent } from './pages/tracks/tracks.component';
import { TrackComponent } from './ui/track/track.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,
    AlbumsComponent,
    ArtistComponent,
    AlbumComponent,
    RegisterComponent,
    FileInputComponent,
    ValidateIdenticalDirective,
    LoginComponent,
    CenteredCardComponent,
    LayoutComponent,
    TracksComponent,
    TrackComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    AppRoutingModule,
    AppStoreModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
