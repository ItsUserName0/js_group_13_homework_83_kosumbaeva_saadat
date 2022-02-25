import { Component, Input, OnInit } from '@angular/core';
import { Album } from '../../models/album.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.sass']
})
export class AlbumComponent implements OnInit {
  @Input() album!: Album;
  apiUrl = environment.apiUrl;

  constructor() { }

  ngOnInit(): void {
  }

}
