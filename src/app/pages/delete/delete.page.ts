import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {
  
  public vidrios: Object

  constructor(
    public apiService: ApiService
    ) { }

  ngOnInit() {
    /**this.apiService.VerVidrio().subscribe((vidrios)=>{
      this.vidrios = vidrios;
   })**/
  }
  
  /**EliminarVidrio(id_vidrios:number){
    this.apiService.EliminarVidrio(id_vidrios).subscribe(data=>{ 
      this.ngOnInit();
    })
  }**/
  
}
