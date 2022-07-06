import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from 'src/app/models/Portfolio';

@Component({
  selector: 'app-basic-info-details',
  templateUrl: './basic-info-details.component.html',
  styleUrls: ['./basic-info-details.component.css']
})
export class BasicInfoDetailsComponent implements OnInit {
  @Input() portfolio!:Portfolio;
  @Output() onToggleEditBasicInfo = new EventEmitter()
  nickname!:string
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nickname = params['nickname']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
  }
  editBasicInfo() {
    
    this.onToggleEditBasicInfo.emit()
  }

}
