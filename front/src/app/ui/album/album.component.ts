import { Component, Input, OnInit } from '@angular/core';
import { Album } from '../../models/album.model';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.sass']
})
export class AlbumComponent implements OnInit {
  @Input() album!: Album;
  apiUrl = environment.apiUrl;
  artistId!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.artistId = <string>params['id'];
    });
  }

  getDate() {
    const date = new Date(this.album.release);
    return date.getFullYear();
  }

  removeAlbum() {

  }
}
