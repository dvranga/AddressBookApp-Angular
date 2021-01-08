import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressbookformComponent } from './components/addressbookform/addressbookform.component';
import { AddressbookhomeComponent } from './components/addressbookhome/addressbookhome.component';


const routes: Routes = [
  {path:"create-address",component:AddressbookformComponent},
  {path:"",component:AddressbookhomeComponent},
  {path:"address-list",component:AddressbookhomeComponent},
  {path: "create-address/:id", component: AddressbookformComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
