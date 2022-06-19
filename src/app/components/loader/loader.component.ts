import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Output() toggleLoader=new EventEmitter<boolean>();

  constructor(private authService: AuthService,private loaderService:LoaderService) { }

  ngOnInit(): void {
   this.loaderService.LoaderRequired.subscribe((res)=>this.toggleLoader.emit(res))
  }
  

}
