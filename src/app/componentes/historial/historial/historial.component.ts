import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { CatGift } from '../../../cat-gift';
import { CommonModule } from '@angular/common';
import { HistorialService } from '../../../servicios/historial/historial.service';

@Component({
  selector: 'app-historial',
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {

  private apiUrl = 'https://localhost:7176/CatFact';
  subscripcion!: Subscription;

   private actualizarHistorialSubject = new Subject<void>();
  actualizarHistorial$ = this.actualizarHistorialSubject.asObservable();


  constructor(private http: HttpClient,private historialService: HistorialService) {}

   historial: {
    fecha: string;
    texto: string;
    palabras: string[];
    url: string;
  }[] = [];

   getHistorial(): Observable<CatGift[]> {
    return this.http.get<CatGift[]>(`${this.apiUrl}/historial`);
  }

  emitirActualizacion() {
    this.actualizarHistorialSubject.next();
  }

   ngOnInit(): void {
    this.obtenerHistorial();

    // 🔁 Escuchar evento de actualización
    this.subscripcion = this.historialService.actualizarHistorial$.subscribe(() => {
      this.obtenerHistorial();
    });
  }


  obtenerHistorial() {
     this.getHistorial().subscribe((data: CatGift[]) => {
      this.historial = data.map(item => ({
        fecha: item.fechaBusqueda,
        texto: item.catfactdata,
        palabras: item.palabras.split(','),
        url: item.url
      }));
    });
    
  }

  
   

}
