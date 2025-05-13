import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HistorialComponent } from '../../historial/historial/historial.component';
import { JsonPipe } from '@angular/common';
import { HistorialService } from '../../../servicios/historial/historial.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {
  catFact = '';
  gifUrl = '';
  fact = '';
  tresPrimerasString = '';
  palabras!: string[];
  tresPrimerasP!:string[];
  datojson!:any;
  fecha = new Date().toISOString();

  constructor(private http: HttpClient, private historialService: HistorialService) {}

  ngOnInit(): void {
    this.obtenerData();
  }

  async obtenerData(): Promise<void> {
    const catRes: any = await this.http.get('https://localhost:7176/CatFact').subscribe(
      (r:any)=> {
        this.datojson=r;
       const palabrasObj = JSON.parse(r.palabras); 
     const factTexto: string = palabrasObj.fact;
     this.catFact = factTexto;
     this.tresPrimerasP = factTexto.split(',').slice(0, 3);
     
     // Otros campos
     this.fecha = r.fecha;
     this.gifUrl = r.url;
      }
    );
  }
   
  refrescarGif(){
    this.obtenerData();
    this.guardardato();
  }

  async guardardato(){
    const guardar = await this.http.post('https://localhost:7176/CatFact/historial',this.datojson).subscribe(
      r => {console.log(r,this.datojson);
      this.historialService.emitirActualizacion();
      }
    )
  }
}
