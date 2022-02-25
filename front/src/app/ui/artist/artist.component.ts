import { Component, Input, OnInit } from '@angular/core';
import { Artist } from '../../models/artist.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.sass']
})
export class ArtistComponent implements OnInit {
  @Input() artist!: Artist;

  apiUrl = environment.apiUrl;

  constructor() {
  }

  ngOnInit(): void {
  }

}
