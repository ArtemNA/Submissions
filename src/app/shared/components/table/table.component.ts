import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent {
  @Input() config!: { name: string; displayName: string; customClass?: string; type?: string; }[];
  @Input() data!: any[];
  @Input() pageSize: number = 10;

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<unknown>;
  displayedColumns: string[] = [];
  selection = new SelectionModel<any>(true, []);

  ngOnChanges() {
    this.displayedColumns = this.config.map((value) => value.name);
    if (this.data?.length) {
      this.selection.select(...this.data.filter((value: { checked: boolean }) => value?.checked));
    }
      this.dataSource = new MatTableDataSource<unknown>(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected(): boolean {
    const numSelected = this.selection?.selected?.length;
    const numRows = this.data?.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...(this.data as unknown[]));
  }

  toggleOneRow(row: unknown): void {
    this.selection.toggle(row);
  }

  checkboxLabel(row?: { position: string }): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
