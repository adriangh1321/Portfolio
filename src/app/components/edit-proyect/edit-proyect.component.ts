import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/models/Person';
import { Cloneable } from 'src/app/utilities/Clone';

@Component({
  selector: 'app-edit-proyect',
  templateUrl: './edit-proyect.component.html',
  styleUrls: ['./edit-proyect.component.css']
})
export class EditProyectComponent implements OnInit {
  @Input() person: Person;
  updatedPerson: Person;
  @Input() indexProyect: number;
  @Output() offEvent = new EventEmitter<number>()
  @Output() refreshPerson = new EventEmitter<Person>()
  proyectForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.person = new Person();
    this.updatedPerson = new Person();
    this.indexProyect = 0;
    this.proyectForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      description: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.updatedPerson=Cloneable.deepCopy(this.person)
    this.proyectForm.patchValue({
      name:this.updatedPerson.proyects[this.indexProyect].name,
      description:this.updatedPerson.proyects[this.indexProyect].description
    })
  }

  onSubmit(){
    if(this.proyectForm.invalid){
      alert('Invalid input')
      return
    }
    this.updatedPerson.proyects[this.indexProyect].name=this.proyectForm.get('name')?.value
    this.updatedPerson.proyects[this.indexProyect].description=this.proyectForm.get('description')?.value
    this.refreshPerson.emit(this.updatedPerson)
    
    console.log(this.updatedPerson)
    this.emitOff(this.indexProyect)
  }

  get m() {
    return this.proyectForm.controls;
  }

  emitOff(indexProyect: number) {
    this.offEvent.emit(indexProyect);
  }

}
