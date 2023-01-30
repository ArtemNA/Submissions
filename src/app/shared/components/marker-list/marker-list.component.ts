import { Component, Input } from '@angular/core';
import { SubmissionInterface } from '../../interfaces/submission.interface';

@Component({
  selector: 'app-marker-list',
  templateUrl: './marker-list.component.html',
  styleUrls: ['./marker-list.component.scss']
})
export class MarkerListComponent {
  @Input() data!: SubmissionInterface[];

  ngOnInit(): void {}
  display: any;

  config = {
    center: {
      lat: 24,
      lng: 12,
    },
    zoom: 4,
    height: '500px',
    width: '500px'
  };

  moveMap(event: google.maps.MapMouseEvent): void {
    if (event.latLng != null) this.config.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent): void {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  resize(event: { width: string, height: string }): void {
    this.config.width = event.width;
    this.config.height = event.height;
  }
}
