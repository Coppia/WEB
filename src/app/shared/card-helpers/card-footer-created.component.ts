import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-footer-created',
  templateUrl: './card-footer-created.component.html',
  styleUrls: ['./card-footer-created.component.css']
})
export class CardFooterCreatedComponent {
  @Input() created: Created;

  constructor() { }

}
