import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-about-details',
  templateUrl: './about-details.component.html',
  styleUrls: ['./about-details.component.css']
})
export class AboutDetailsComponent implements OnInit {

  @Input() aboutMe!: string;
  @Output() onToggleEditAboutMe = new EventEmitter()
  constructor() {
    
  }

  ngOnInit(): void {
  }

  editAboutMe() {
    this.onToggleEditAboutMe.emit()
  }
 

}
