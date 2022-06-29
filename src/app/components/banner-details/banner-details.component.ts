import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-banner-details',
  templateUrl: './banner-details.component.html',
  styleUrls: ['./banner-details.component.css']
})
export class BannerDetailsComponent implements OnInit {

  @Input() banner!:string;
  @Output() onToggleEditBanner = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  editBanner() {
    this.onToggleEditBanner.emit()
  }

}
