import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { JakeBillingsAppComponent } from '../app/jake-billings.component';

beforeEachProviders(() => [JakeBillingsAppComponent]);

describe('App: JakeBillings', () => {
  it('should create the app',
      inject([JakeBillingsAppComponent], (app: JakeBillingsAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'jake-billings works!\'',
      inject([JakeBillingsAppComponent], (app: JakeBillingsAppComponent) => {
    expect(app.title).toEqual('jake-billings works!');
  }));
});
