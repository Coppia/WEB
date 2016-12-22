import { Directive, ElementRef, forwardRef, HostListener, Renderer } from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[contenteditable]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContentEditableFormDirective),
      multi: true
    }
  ]
})
export class ContentEditableFormDirective implements ControlValueAccessor {
  private defaultValue: any;
  constructor(private _elRef: ElementRef, private _renderer: Renderer) { }
  
  onChange() {
    if (this._onChange) {
      this._onChange(this._elRef.nativeElement.innerText);
    }
    var val = this._elRef.nativeElement.innerText;
    if (val == null || val == '') { 
      val = this.defaultValue;
      this._renderer.setElementProperty(this._elRef.nativeElement, 'innerText', val);
    }
  }
  @HostListener('focus', ['$event'])
  focus(event:any) {
    var val = this._elRef.nativeElement.innerText;
    if(val == this.defaultValue) {
      this._renderer.setElementProperty(this._elRef.nativeElement, 'innerText', '');
    }
  }
  @HostListener('blur', ['$event'])
  blur(event: any) {
    this.onChange();
  }
  
  
  // ControlValueAccessor implementation
  // ====================================

  private _onChange = (_) => { }; // call it if your value changed..
  private _onTouched = () => { }; // call it "on blur" ..

  // will be called if a values comes in via ngModule !
  writeValue(val: any) {
    if(this.defaultValue == null) {
      this.defaultValue = (this._elRef.nativeElement.innerText || 'Just start typing...');
    }
    console.log(val);
    if (val == null || val == '') { 
      val = this.defaultValue;
    }
    this._renderer.setElementProperty(this._elRef.nativeElement, 'innerText', val);
    
  }

  registerOnChange(fn: (_: any) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void { this._onTouched = fn; }
}