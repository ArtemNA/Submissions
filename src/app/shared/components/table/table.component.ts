import { AfterViewInit, Component, Input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { SubmissionInterface } from '../../interfaces/submission.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements AfterViewInit, OnChanges {
  @Input() config!: { name: string; displayName: string; customClass?: string; type?: string; }[];
  @Input() data!: SubmissionInterface[];
  @Input() pageSize: number = 10;

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<unknown>;
  displayedColumns: string[] = [];
  selection = new SelectionModel<SubmissionInterface>(true, []);

  ngOnChanges() {
    this.displayedColumns = this.config.map((value) => value.name);
    if (this.data?.length) {
      this.selection.select(...this.data.filter((value) => value?.checked));
    }
      this.dataSource = new MatTableDataSource<unknown>(this.data);
    if (this.paginator) {
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    }
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

    this.selection.select(...(this.data));
  }

  toggleOneRow(row: SubmissionInterface): void {
    this.selection.toggle(row);
  }
}
