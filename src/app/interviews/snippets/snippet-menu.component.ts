import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { SnippetMenuConfig } from './snippet-menu-config.model';

@Component({
  selector: 'app-snippet-menu',
  templateUrl: './snippet-menu.component.html',
  styleUrls: ['./snippet-menu.component.css']
})
export class SnippetMenuComponent implements AfterViewInit {
  private topOffset: number = 40;
  private leftOffset: number = 175; //This is the offset of the column width.

  @Input()
  config: SnippetMenuConfig;

  @Output()
  onMakeSnippet = new EventEmitter<any>();

  constructor(private element: ElementRef) {}

  getTop(): string {
    return `${this.config.top - this.topOffset}px`;
  }

  getLeft(): string {
    return `${this.config.left}px`;
  }

  makeSnippet() {
    this.onMakeSnippet.emit(true);
  }

  ngAfterViewInit() {
    this.topOffset = (this.element.nativeElement.children.length > 0
    && this.element.nativeElement.children[0].clientHeight || this.topOffset);
  }
}
