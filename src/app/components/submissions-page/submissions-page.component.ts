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
  activeStatusFilter: string | undefined;
  activeSearchFilter: string | undefined;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `paper_download`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`./../../../../assets/icons/paperDownload.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `calendar_outline`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`./../../../../assets/icons/calendarOutline.svg`)
    );
  }

  statusChange(event: string): void {
    this.activeStatusFilter = event;
    this.filterData();
  }

  search(event: string): void {
    this.activeSearchFilter = event;
    this.filterData();
  }

  private filterData(): void {
    this.filteredData = [...this.data]
      .filter(item => (this.activeStatusFilter === 'All' || !this.activeStatusFilter) || this.activeStatusFilter === item.status)
      .filter(({ task, from, to, address }) => {
        return !this.activeSearchFilter
          ? true
          : Object.values({ task, from, to, address })
            .join(' ')
            .toLowerCase()
            .includes(this.activeSearchFilter.toLowerCase());
      });
  }
}
