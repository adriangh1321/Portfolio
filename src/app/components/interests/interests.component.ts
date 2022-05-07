import { Component, Input, OnInit } from '@angular/core';
import { Interest } from 'src/app/models/Interest';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {
  @Input() interests:Interest[];
  constructor() { 
    this.interests=[];
  }

  ngOnInit(): void {
  }

}
