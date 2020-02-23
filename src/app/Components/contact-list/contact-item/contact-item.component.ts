import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../../Classes/contact';
import {ContactService} from '../../../Services/contact.service';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {

  @Input() contactElement: Contact;
  @Input() index: number;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
  }

  delete() {
    this.contactService.deleteContact(this.index);
  }
}
