import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.page.html',
  styleUrls: ['./get.page.scss'],
})
export class GetPage implements OnInit {
  public vidrios: Object
  
  constructor(
    public apiService: ApiService
  ) { }

  ngOnInit() {
    /**this.apiService.VerVidrio().subscribe((vidrios)=>{
      this.vidrios = vidrios; 
      console.log(vidrios);
   },error=>{
   console.log("errorrrrrrr") })**/
    
  }
  
  /**EliminarVidrio(id_vidrios:number){
    this.apiService.EliminarVidrio(id_vidrios).subscribe(data=>{
      alert("El contenedor ha sido eliminado")
      console.log(id_vidrios) 
      this.ngOnInit();
    },error=>{ 
     console.log('errrooooooorrrr')  
    })
  }**/
}
