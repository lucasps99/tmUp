import { Component, OnInit } from '@angular/core';
import { languages } from '../../Core/Languages'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  arrayString = languages;

  constructor() { }

  ngOnInit() {
  }

}
