import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NotificationMessage } from 'src/app/enums/NotificationMessage';
import { NotificationType } from 'src/app/enums/NotificationType';
import { Skill } from 'src/app/models/Skill';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.css']
})
export class SkillEditComponent implements OnInit {
  skillForm!: FormGroup;
  @Output() onShowDetails = new EventEmitter()
  @Input() skill: Skill;


  constructor(
    private skillService: SkillService,
    private formBuilder: FormBuilder,
    private parserFormatter: NgbDateParserFormatter,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.skill = new Skill()
  }

  ngOnInit(): void {

    this.skillForm = this.formBuilder.group({
      type: [this.skill.type, [Validators.required]],
      name: [this.skill.name, [Validators.required]],
      percent: [this.skill.percent, [Validators.required, Validators.min(0), Validators.max(100)]],

    })
  }
  onSubmit() {

    if (this.skillForm.invalid) {
      alert('Invalid input');
      return;
    }

    this.loaderService.showLoading()
    this.skillService.updateSkill(this.skill.id, this.skillForm.getRawValue()).subscribe({
      next: data => {
        this.notificationService.requestNotification({
          type: NotificationType.SUCCESS,
          message: NotificationMessage.SKILL_UPDATE
        })
      },
      error: error => { 
        this.loaderService.hideLoading()
        throw error
      }
    })

    this.onCloseEdit()
  }
  onCloseEdit() {
    this.onShowDetails.emit()
  }






  get m() {
    return this.skillForm!.controls;
  }


}
