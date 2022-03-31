import { Component, Input, OnInit } from '@angular/core';
import { TrackHistory } from '../../models/track-history.model';

@Component({
  selector: 'app-track-history-item',
  templateUrl: './track-history-item.component.html',
  styleUrls: ['./track-history-item.component.sass']
})
export class TrackHistoryItemComponent implements OnInit {
  @Input() track!: TrackHistory;

  constructor() { }

  ngOnInit(): void {
  }

}
