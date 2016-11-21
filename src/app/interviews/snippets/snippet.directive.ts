import { Directive, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';


@Directive({ selector: '[appSnippet]' })
export class SnippetDirective implements OnInit {
  @Output()
  onSnippetSelection = new EventEmitter<any>();
  @Output()
  onSnippetDeselection = new EventEmitter<boolean>();

  @HostListener('mouseup') onMouseUp() {
    let selectedText = this.getSelection();
    let position = this.getSelectedPosition();

    if (selectedText && selectedText !== '') {
      let result = { text: selectedText, position: position };
      this.onSnippetSelection.emit( result );
    } else {
      this.onSnippetDeselection.emit(true);
    }
  }

  constructor(public element: ElementRef) {}

  ngOnInit() { console.log('Snippet available.'); }

  getSelection() {
    let doc = (<any>document);
    let text: string;
      if (window.getSelection) {
          text = window.getSelection().toString();
      } else if (doc.selection && doc.selection.type !== 'Control') {
          text = doc.selection.createRange().htmlText;
      }
      return text;
  }

  getSelectedPosition() {
    let doc = (<any>document);
    let element = this.element.nativeElement;
    let start = 0, end = 0;
    let sel, range, priorRange, rect;
    if (typeof window.getSelection !== 'undefined') {
        range = window.getSelection().getRangeAt(0);
        rect = range.getClientRects()[0];
        priorRange = range.cloneRange();
        priorRange.selectNodeContents(element);
        priorRange.setEnd(range.startContainer, range.startOffset);
        start = priorRange.toString().length;
        end = start + range.toString().length;
    } else if (typeof doc.selection !== 'undefined' &&
            (sel = doc.selection).type !== 'Control') {
        range = sel.createRange();
        rect = range.getClientRects()[0];
        priorRange = doc.body.createTextRange();
        priorRange.moveToElementText(element);
        priorRange.setEndPoint('EndToStart', range);
        start = priorRange.text.length;
        end = start + range.text.length;
    }
    return {
        start: start,
        end: end,
        rect: rect
    };
  }

  getSelectionCoords() {
    let win = window;
    let doc = (<any>win.document);
    let sel = doc.selection, range, rects, rect;
    let x = 0, y = 0;
    if (sel) {
        if (sel.type !== 'Control') {
            range = sel.createRange();
            range.collapse(true);
            x = range.boundingLeft;
            y = range.boundingTop;
        }
    } else if (win.getSelection) {
        sel = win.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                range.collapse(true);
                rects = range.getClientRects();
                if (rects.length > 0) {
                    rect = rects[0];
                }
                x = rect.left;
                y = rect.top;
            }
            // Fall back to inserting a temporary element
            if (x === 0 && y === 0) {
                let span = doc.createElement('span');
                if (span.getClientRects) {
                    // Ensure span has dimensions and position by
                    // adding a zero-width space character
                    span.appendChild( doc.createTextNode('\u200b') );
                    range.insertNode(span);
                    rect = span.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;
                    let spanParent = span.parentNode;
                    spanParent.removeChild(span);

                    // Glue any broken text nodes back together
                    spanParent.normalize();
                }
            }
        }
    }
    return { leftx: x, top: y };
}
}
