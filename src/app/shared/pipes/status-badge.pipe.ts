import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export enum StatusBageType {
  LowRisk = 'Low Risk',
  Uncomplete = 'Uncomplete',
  Unassigned = 'Unassigned'
}

@Pipe({
  name: 'statusBadge'
})
export class StatusBadgePipe implements PipeTransform {
  style = getComputedStyle(document.body);

  constructor(private sanitizer: DomSanitizer) { }

  transform(status: StatusBageType): SafeHtml {
    let bgColor: string | null;
    let color: string | null;
    switch (status) {
      case StatusBageType.LowRisk:
        bgColor = this.style.getPropertyValue('--success-light');
        color = this.style.getPropertyValue('--success');
        break;
      case StatusBageType.Uncomplete:
        bgColor = this.style.getPropertyValue('--error-light');
        color = this.style.getPropertyValue('--error');
        break;
      case StatusBageType.Unassigned:
        bgColor = this.style.getPropertyValue('--table');
        color = this.style.getPropertyValue('--border');
        break;
      default:
        bgColor = null;
        color = null;
        break;
    }
    const newText = status.toString().replace(status, `<span class="status-bage" style="background-color:${bgColor};color:${color};border-color:${color}"><span class="marker">&bull;</span>${status}</span>`);
    return this.sanitizer.bypassSecurityTrustHtml(newText);
  }

}
