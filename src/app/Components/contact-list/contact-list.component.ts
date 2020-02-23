import {Component, OnInit} from '@angular/core';
import {Contact} from '../../Classes/contact';
import {Subscription} from 'rxjs';
import {ContactService} from '../../Services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];
  subscription: Subscription;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {

    // Contacts showing after changing
    this.subscription = this.contactService.contactChanged
      .subscribe((res: Contact[]) => {
        this.contacts = res;
      });

    // Initial contacts showing
    this.contacts = this.contactService.getContacts();
  }

}
