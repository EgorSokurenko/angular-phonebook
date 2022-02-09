import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [HttpService],
})
export class ContactListComponent implements OnInit {
  constructor(private httpService: HttpService) {}
  contact = { name: '', phone: '' };
  contacts: Contact[] = this.httpService.contacts;
  filter: string = '';

  filterr() {
    if (!this.filter.length) {
      this.contacts = this.httpService.contacts;
    }
    this.contacts = this.httpService.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.filter.toLowerCase())
    );
  }
  delete(id: number) {
    this.httpService.deleteContact(id).subscribe((data: any) => {
      this.httpService.getAll().subscribe((data: Contact[]) => {
        this.contacts = data;
      });
    });
  }
  submit() {
    if (!this.contact.name || !this.contact.phone) {
      alert('Plz entry something');
      return;
    }
    if (
      this.contacts.find(
        (contact) =>
          contact.name.toLowerCase() === this.contact.name.toLowerCase()
      )
    ) {
      alert(`${this.contact.name} is already in contacts`);
      this.contact.name = '';
      this.contact.phone = '';
      return;
    }
    this.httpService.addContact(this.contact).subscribe((data: any) => {
      this.httpService.getAll().subscribe((data: Contact[]) => {
        this.contacts = data;
      });
      this.contact.name = '';
      this.contact.phone = ''
    });
  }
  ngOnInit(): void {
    this.httpService.getAll().subscribe((data: Contact[]) => {
      this.httpService.contacts = data;
      this.contacts = this.httpService.contacts;
      console.log(this.httpService.contacts);
    });
  }
}
