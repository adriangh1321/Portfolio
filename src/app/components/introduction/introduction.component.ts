import { Component, Input, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/models/Portfolio';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {
@Input() portfolio!:Portfolio;

  constructor() { }

  ngOnInit(): void {
  }

}
