import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Output() onLoader=new EventEmitter<boolean>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
   this.authService.ShowLoading.subscribe(()=>this.onLoader.emit())
  }
  

}
