import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, OnInit } from '@angular/core';

@Directive({
  selector: '[contenteditableModel]'
})
export class ContenteditableModelDirective implements OnInit {
  private isLoaded: boolean = false;
  private originalValue: any;
  private currentValue: any;

  @Input()
  set contenteditableModel(model: any)
  {
    this.logIt(`Input().set`);
    if (!this.isLoaded) {
      this.originalValue = model;
    }
  }
  get contenteditableModel() {
    let value = this.getValue();
    return (this.defaultValue === value) ? this.originalValue : value;
  }

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
    if (!value) {
      this.setValue(this.defaultValue);
    } else if (value !== this.originalValue) {
      this.updateModel();
    }
  }

  constructor(private element: ElementRef) { }

  private setValue(value: any) {
    if (this.currentValue !== value) {
      this.currentValue = value;
      this.element.nativeElement.innerText = value;
    }
  }

  private getValue() {
    return this.element.nativeElement.innerText;
  }

  private updateModel() {
    let value = this.getValue();
    this.contenteditableModelChange.emit(value);
  }

  ngOnInit() {
    this.logIt(`OnInit`);
    this.defaultValue = this.defaultValue || this.element.nativeElement.innerText || 'Just start typing...';
    this.setValue(this.originalValue || this.defaultValue);
    this.isLoaded = true;
  }

  logIt(msg: string) {
    console.log(`${msg}`);
  }
}
