import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Portfolio } from 'src/app/models/Portfolio';

@Component({
  selector: 'app-basic-info-details',
  templateUrl: './basic-info-details.component.html',
  styleUrls: ['./basic-info-details.component.css']
})
export class BasicInfoDetailsComponent implements OnInit {
  @Input() portfolio!:Portfolio;
  @Output() onToggleEditBasicInfo = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  editBasicInfo() {
    this.onToggleEditBasicInfo.emit()
  }

}
