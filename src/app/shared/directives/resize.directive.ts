import { Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appResize]',
})
export class ResizeDirective implements OnInit {
  @Output() newSize = new EventEmitter<{ width: string, height: string }>();

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.newSize.emit({
      width: this.elementRef.nativeElement.getBoundingClientRect().width.toFixed() + 'px',
      height: this.elementRef.nativeElement.getBoundingClientRect().height.toFixed() + 'px'
    });
    const observerR = new ResizeObserver(this.throttle(this.handleResize, 500));
    observerR.observe(this.elementRef.nativeElement);
  }

  private handleResize = (entries: ResizeObserverEntry[]) => {
    entries.forEach((entry) => {
      this.newSize.emit({
        width: entry.target.getBoundingClientRect().width.toFixed() + 'px',
        height: entry.target.getBoundingClientRect().height.toFixed() + 'px'
      })
    })
  }

  private throttle(f: (entries: ResizeObserverEntry[]) => void, delay: number) {
    let timer = 0;
    return (entries: ResizeObserverEntry[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => f.apply(this, [entries]), delay);
    }
  }


}
