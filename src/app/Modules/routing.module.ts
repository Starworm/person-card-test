import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ContactListComponent} from '../Components/contact-list/contact-list.component';
import {ContactComponent} from '../Components/contact/contact.component';

const appRoutes: Routes = [
  {path: '', component: ContactListComponent},
  {path: 'contact/:id', component: ContactComponent},
  {path: 'contact/new', component: ContactComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class RoutingModule {

}
