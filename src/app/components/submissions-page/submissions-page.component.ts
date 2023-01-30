import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TableDataMock } from '../../mocks/tableData.mock';
import { StatusBageType } from '../../shared/pipes/status-badge.pipe';

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
  filteredData = [...this.data];
  pageSize: number = 10;

  statusList = ['All', ...Object.values(StatusBageType)];
  tab: 'list' | 'map' = 'list';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    this.matIconRegistry.addSvgIcon(
      `paper_download`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`./../../../../assets/icons/paperDownload.svg`)
    );
  }

  statusChange(event: string) {
    this.filteredData = [...this.data].filter(item => event === 'All' || event === item.status);
  }
}
