import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AddressbookserviceService {

  constructor(private http: HttpClient) { }


  getEmployee(id: any){
    return this.http.get('http://localhost:8080/addressbook/get/' + id);
  }
  
  createContact(data: any){
    return this.http.post('http://localhost:8080/addressbook/create',data);
  }

  getEmployeeList(){
    return this.http.get('http://localhost:8080/addressbook/get');
  }

  deleteEmployee(id: any){
    return this.http.delete('http://localhost:8080/addressbook/delete/' + id);
  }

  updateEmployee(data: any,id: any){
    return this.http.put('http://localhost:8080/addressbook/update/'+id,data);
  }
  

}
