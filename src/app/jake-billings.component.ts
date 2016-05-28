import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'jake-billings-app',
  templateUrl: 'jake-billings.component.html',
  styleUrls: ['jake-billings.component.css']
})
export class JakeBillingsAppComponent {
  title = 'jake-billings works!';
  items: FirebaseListObservable<any[]>;
  constructor(af: AngularFire) {
    this.items = af.database.list('/resume');

  }
}
