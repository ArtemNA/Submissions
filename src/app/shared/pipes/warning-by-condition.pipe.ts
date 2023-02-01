import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'warningByCondition'
})
export class WarningByConditionPipe implements PipeTransform {

  // THIS is mock pipe just for example

  constructor(private sanitizer: DomSanitizer) { }

  transform(text?: string): SafeHtml {
    if (!text) return '';
    let color: string | null;
    switch (true) {
      case text.toLowerCase().includes('2'):
        color = getComputedStyle(document.body).getPropertyValue('--error');
        break;
      default:
        color = null;
        break;
    }
    const newText = text.replace(text, `<span style="color:${color}">${text}</span>`);
    return this.sanitizer.bypassSecurityTrustHtml(newText);
  }

}
