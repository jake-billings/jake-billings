import {Component, OnInit} from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { ResumeComponent } from './+resume';
import { GalleryComponent } from './+gallery';
import { ContactInfoComponent } from './contact-info'

@Component({
  moduleId: module.id,
  selector: 'jake-billings-app',
  templateUrl: 'jake-billings.component.html',
  styleUrls: ['jake-billings.component.css'],
  directives: [ROUTER_DIRECTIVES, MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, ContactInfoComponent],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/resume', component: ResumeComponent},
  {path: '/gallery', component: GalleryComponent}
])
export class JakeBillingsAppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
  }
}
