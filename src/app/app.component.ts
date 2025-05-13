import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResultadoComponent } from "./componentes/resultado/resultado/resultado.component";
import { HistorialComponent } from "./componentes/historial/historial/historial.component";

@Component({
  selector: 'app-root',
  imports: [ResultadoComponent, HistorialComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'david_prueba';
}
