import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import { FormBuilder, Validators} from '@angular/forms'
import { apiRestProvider } from '../../../providers/apiRest/apiRest'
import { PhotoService } from '../../services/photo.service'
import { Router } from '@angular/router';
import { sports, rols } from '../../Core/Arrays';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.page.html',
  styleUrls: ['./add-team.page.scss'],
})
export class AddTeamPage implements OnInit {

  sportsLists = sports;
  roles = rols;

  segmentModel = "create";

  createTeamForm = this.formBuilder.group({
    teamName: ['', [Validators.required]],
    sport: ['', [Validators.required]],
    teamPhoto: ['']
  });

  joinTeamForm = this.formBuilder.group({
    teamId: ['', [Validators.required]],
    userId: [''],
    role: ['', [Validators.required]]
  });


  errorMessages = {
    teamName: [
      { type: 'required', message: 'Nombre equipo es necesario'},
      { type: 'minlength', message: 'Nombre debe tener más de 3 letras'}
    ],
    sport: [
      { type:'required', message: 'Deporte es necesario' }
    ],
    role: [
      { type: 'required', message: 'Rol es necesario'}
    ],
    teamId: [
      { type: 'required', message: 'Código de equipo es necesario'}
    ]
  }

  constructor(
    private apiProv: apiRestProvider,
    private formBuilder: FormBuilder,
    private menuCtrl: MenuController,
    private photoServ: PhotoService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  get teamName() {
    return this.createTeamForm.get("teamName")
  }
  get sport() {
    return this.createTeamForm.get("sport")
  }
  get teamPhoto() {
    return this.createTeamForm.get("teamPhoto")
  }
  get role() {
    return this.joinTeamForm.get("role")
  }
  get teamId() {
    return this.joinTeamForm.get("teamId")
  }

  onDone() {
    if(this.segmentModel == "create") {
      this.apiProv.createTeam(this.createTeamForm.value)
      .then( (data) => {
        console.log(data);
        this.router.navigate(['/main']);
      },
      (err) => {
        console.log(err.message);
      })
    }
    else {
      this.apiProv.createMembership(this.joinTeamForm.value)
      .then( () => {
        this.router.navigate(['/main']);
      })
    }

  }

  cameraOptions() {
    this.photoServ.alertSheetPictureOptions()
    .then( (photo) => {
      this.createTeamForm.patchValue({teamPhoto: photo});
    });
  }

}
