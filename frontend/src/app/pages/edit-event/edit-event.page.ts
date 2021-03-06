import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';
import { ModalController } from '@ionic/angular';
import { LocationSelectPage } from '../location-select/location-select.page';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit {

  event: any;

  locationForm = this.formBuilder.group({
    latitude: [null, [Validators.required]],
    longitude: [null, [Validators.required]],
    name: ['', [Validators.required]]
  });

  editEventForm = this.formBuilder.group({
    eventId: ['',[Validators.required]],
    type: ['',[Validators.required]],
    title: ['',[Validators.required]],
    location: this.locationForm,
    startTime: ['',[Validators.required]],
    endTime: ['',[Validators.required]],
    allDay: [false],
    rival: [''],
    description: ['']
  });

  constructor(
    private apiProv: apiRestProvider,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.queryParams.subscribe(params => {
      let evId = this.router.getCurrentNavigation().extras.state.evId;
      this.event = this.router.getCurrentNavigation().extras.state.ev;
      this.editEventForm.patchValue({
        eventId: evId,
        type: this.event.type,
        title: this.event.title,
        location: this.event.location,
        startTime: this.event.startTime,
        endTime: this.event.endTime,
      });
      if(this.event.type == "match"){
        this.editEventForm.patchValue({rival: this.event.rival});
      }
      else{
        this.editEventForm.patchValue({description: this.event.description});
      }
    });
  }

  ngOnInit() {
  }

  dateChanged(date) {
    let time = new Date(date.detail.value)
    time.setMinutes(time.getMinutes()+60);
    this.editEventForm.patchValue({endTime: time.toISOString()});
  }

  async launchLocationPage(){
    let modal = await this.modalCtrl.create({
      component: LocationSelectPage
    });
    modal.onDidDismiss().then((location) => {
      this.editEventForm.patchValue(location.data);
    });
    return modal.present();
  }

  deleteEvent() {
    this.apiProv.deleteEvent(this.event.id)
    .then(() => {
      this.router.navigate(['/calendar']);
    });
  }

  onDone() {
    if(this.event.type == "match") {
      this.apiProv.editMatch(this.editEventForm.value)
      .then(() => {
        this.router.navigate(['/event', this.editEventForm.get('eventId').value]);
      });
    }
    else {
      this.apiProv.editTraining(this.editEventForm.value)
      .then(() => {
        this.router.navigate(['/event', this.editEventForm.get('eventId').value]);
      });
    }
  }

}
