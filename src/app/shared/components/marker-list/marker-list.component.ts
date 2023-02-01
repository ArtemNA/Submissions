import { Component, Input } from '@angular/core';
import { SubmissionInterface } from '../../interfaces/submission.interface';

@Component({
  selector: 'app-marker-list',
  templateUrl: './marker-list.component.html',
  styleUrls: ['./marker-list.component.scss']
})
export class MarkerListComponent {
  config = {
    center: {
      lat: 24,
      lng: 12,
    },
    zoom: 4,
    height: '500px',
    width: '500px'
  };
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  markerPositions!: google.maps.LatLngLiteral[];
  list!: SubmissionInterface[];
  @Input() set data (value: SubmissionInterface[]) {
    this.list = value;
    this.markerPositions = this.getMarkers();
    this.config.zoom = this.markerPositions.length ? 16 : this.config.zoom;
    this.config.center = this.markerPositions[0];
  };

  private getMarkers(): google.maps.LatLngLiteral[] {
    const markers = this.list?.filter(item => item.marker && Object.values(item.marker).length).map(item => item.marker);
    return Object.values(markers).filter((item): item is google.maps.LatLngLiteral => !!item);
  }
}
