import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ButtonService } from 'src/app/services/button.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() type!: string
  isActive!:boolean
  @Output() onButtonAction = new EventEmitter()
  @Input('class')
  klass!: string
  @Input()
  ngClass!: string | string[] | Set<string> | { [klass: string]: any; }

  constructor(private buttonService:ButtonService) {
    
  }

  ngOnInit(): void {
    this.buttonService.buttonRequired$().subscribe(resp=> {
      this.isActive=resp
      })
  }

  buttonAction() {
    this.onButtonAction.emit()
  }

}
