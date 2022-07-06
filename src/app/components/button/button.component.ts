import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() type!: string
  @Output()onButtonAction=new EventEmitter<string>()
  @Input('class')
  klass!: string
  @Input()
  ngClass!: string | string[] | Set<string> | { [klass: string]: any; }

  constructor() {
  }

  ngOnInit(): void {
  }
  
  buttonAction(){
    this.onButtonAction.emit(this.type)
  }

}
