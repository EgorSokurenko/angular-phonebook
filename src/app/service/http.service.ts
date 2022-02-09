import { HttpClient } from '@angular/common/http';
import { Injectable,OnInit } from '@angular/core';
import { Observable, } from 'rxjs';
import { Contact } from '../model/contact';
import { map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements OnInit{
  constructor(private http: HttpClient){ }
  errorMessage = ''
  contacts:Contact[]=[]
  getAll(): Observable<Contact[]>{
    return this.http.get("https://61bc594cd8542f00178246b9.mockapi.io/contacts/contacts").pipe((data:any)=>{
    return data})
  }
  addContact(contact:any){
    const body = {name:contact.name, phone:contact.phone}
    return this.http.post('https://61bc594cd8542f00178246b9.mockapi.io/contacts/contacts', body).pipe((data:any)=>{
      return data
    })
  }
  deleteContact(id:number) {
  return this.http.delete(`https://61bc594cd8542f00178246b9.mockapi.io/contacts/contacts/${id}`).pipe(catchError((err)=>{
    return err
  }))
 
 }
 ngOnInit(): void {
  this.getAll().subscribe((data:Contact[])=>{
    this.contacts = data
    console.log(this.contacts);
    
  })
}
}
