import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/Profile';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.css']
})
export class ProfileItemComponent implements OnInit {
  @Input() profile!:Profile
  constructor() { }

  ngOnInit(): void {
  }

}
