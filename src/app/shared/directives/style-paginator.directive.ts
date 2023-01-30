import { AfterViewInit, Directive, DoCheck, Host, Input, Optional, Renderer2, Self, ViewContainerRef, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Directive({
  selector: '[appStylePaginator]',
})
export class StylePaginatorDirective implements AfterViewInit, DoCheck {
  @Input() public currentPage!: number;
  public directiveLoaded = false;
  public pageGapTxt = '...';

  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private readonly vr: ViewContainerRef,
    private readonly ren: Renderer2,
  ) {
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      this.directiveLoaded = true;
      this.initPageRange();
    }, 500);
  }

  ngDoCheck(): void {
    if (this.directiveLoaded)
      this.initPageRange();
  }

  private buildPageNumbers(pageCount: number, pageRange: any) {
    const p = this.getNewArray(pageCount);
    p.forEach(item => {
      this.ren.insertBefore(pageRange, this.createPage(item, this.matPag.pageIndex), null);
    });
  }

  private getNewArray(pageCount: number) {
    const range = [...new Set([1, 2, this.matPag.pageIndex + 1, pageCount - 1, pageCount].filter(item => item > 0 && item <= pageCount))].sort((a, b) => a - b);
    if (!range.length) range.push(1);
    let newArr = [];
    if (range.at(-1) !== 5) {
      for (let i = 0; i < range.length; i++) {
        newArr.push(range[i]);
        if (range[i + 1] && (range[i + 1] - range[i] > 1)) {
          newArr.push('...');
        }
      }
    } else {
      newArr = [...range, 3].sort((a, b) => a - b);
    }

    return newArr;
  }

  private createPage(i: any, pageIndex: number): any {
    const linkBtn = this.ren.createElement('button');
    this.ren.addClass(linkBtn, 'mdc-icon-button');
    this.ren.addClass(linkBtn, 'mat-mdc-icon-button');

    const pagingTxt = isNaN(i) ? this.pageGapTxt : +i;
    const text = this.ren.createText(pagingTxt + ' ');
    this.ren.addClass(linkBtn, 'mat-custom-page');

    switch (i) {
      case pageIndex + 1:
        this.ren.addClass(linkBtn, 'active');
        this.ren.setAttribute(linkBtn, 'disabled', 'disabled');
        break;
      case this.pageGapTxt:
        this.ren.setAttribute(linkBtn, 'disabled', 'disabled');
        break;
      default:
        this.ren.listen(linkBtn, 'click', () => {
          this.currentPage = i;
          this.switchPage(i);
        });
        break;
    }

    this.ren.appendChild(linkBtn, text);
    return linkBtn;
  }

  private initPageRange(): void {
    const pagingContainerMain = this.vr.element.nativeElement.querySelector('.mat-mdc-paginator-range-actions');

    if (
      this.vr.element.nativeElement.querySelector('div.mat-mdc-paginator-range-actions div.btn_custom-paging-container')
    ) {
      this.ren.removeChild(
        pagingContainerMain,
        this.vr.element.nativeElement.querySelector('div.mat-mdc-paginator-range-actions div.btn_custom-paging-container'),
      );
    }

    const pagingContainerBtns = this.ren.createElement('div');
    const refNode = this.matPag.showFirstLastButtons
      ? this.vr.element.nativeElement.childNodes[0].childNodes[0].childNodes[1].childNodes[5]
      : this.vr.element.nativeElement.childNodes[0].childNodes[0].childNodes[1].childNodes[4];
    this.ren.addClass(pagingContainerBtns, 'btn_custom-paging-container');
    this.ren.insertBefore(pagingContainerMain, pagingContainerBtns, refNode);

    const pageRange = this.vr.element.nativeElement.querySelector(
      'div.mat-mdc-paginator-range-actions div.btn_custom-paging-container',
    );
    pageRange.innerHtml = '';
    const pageCount = this.pageCount(this.matPag.length, this.matPag.pageSize);
    this.buildPageNumbers(pageCount, pageRange);
  }

  private pageCount(length: number, pageSize: number): number {
    return length % pageSize ? Math.floor(length / pageSize) + 1 : length / pageSize;
  }

  private switchPage(i: number): void {
    this.matPag.pageIndex = i - 1;
    this.matPag._changePageSize(this.matPag.pageSize);
  }
}
