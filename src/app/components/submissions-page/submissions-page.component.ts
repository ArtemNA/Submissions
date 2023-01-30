import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TableDataMock } from '../../mocks/tableData.mock';

@Component({
  selector: 'app-submissions-page',
  templateUrl: './submissions-page.component.html',
  styleUrls: ['./submissions-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubmissionsPageComponent {
  config = [
    { name: 'checkbox', displayName: '', type: 'select' },
    { name: 'task', displayName: 'Task' },
    { name: 'status', displayName: 'Status', type: 'badge' },
    { name: 'from', displayName: 'From' },
    { name: 'to', displayName: 'To' },
    { name: 'address', displayName: 'Customer Address' },
    { name: 'date', displayName: 'Due Date', type: 'date' },
  ];
  data = TableDataMock;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    this.matIconRegistry.addSvgIcon(
      `paper_download`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`./../../../../assets/icons/paperDownload.svg`)
    );
  }
}
