import { Component, Input, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/models/Portfolio';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css']
})
export class CollapseComponent implements OnInit {
  @Input() portfolio:Portfolio;
  constructor() { 
    this.portfolio=new Portfolio();
  }

  ngOnInit(): void {
  }

}
