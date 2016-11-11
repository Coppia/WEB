import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';

//TODO: Rewrite this component. It is too buggy for input/outputs.
@Directive({
  selector: '[contenteditableModel]'
})
export class ContenteditableModelDirective implements OnChanges, OnInit {

  private valueSet: boolean = false;
  private updatingModel = false;

  @Input() contenteditableModel: string;
  @Input() defaultValue: any;
  @Output() contenteditableModelChange = new EventEmitter();

  @HostBinding('attr.contenteditable') contenteditable = 'true';

  @HostListener('focus') onFocus() {
    if(this.defaultValue === this.getValue()) {
      this.setValue('');
    }
  }

  @HostListener('blur') onBlur() {
    let value = this.getValue();
    if (value) {
      this.updatingModel = true;
      this.contenteditableModel = value;
      this.contenteditableModelChange.emit(value);
    } else {
      this.setValue(this.defaultValue);
    }
  }

  constructor(private element: ElementRef) { console.log(`new ContenteditableModelDirective()`); }

  ngOnInit() {
    if (!this.valueSet) {
      this.defaultValue = this.defaultValue || this.element.nativeElement.innerText || 'Just start typing...';
      this.setValue(this.defaultValue);
    }
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (!this.updatingModel) {
      for (let propName in changes) {
        if (changes.hasOwnProperty(propName) && propName === 'contenteditableModel') {
          let changedProp = changes[propName];
          this.setValue(changedProp.currentValue);
        }
      }
    } else {
      this.updatingModel = false;
    }
  }

  private setValue(value: any) {
    if (typeof value !== 'undefined' && this.getValue() !== value) {
      this.element.nativeElement.innerText = value;
      this.valueSet = true;
    }
  }

  private getValue() {
    return this.element.nativeElement.innerText;
  }
}
