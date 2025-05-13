import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private actualizarHistorialSubject = new Subject<void>();
  actualizarHistorial$ = this.actualizarHistorialSubject.asObservable();

  emitirActualizacion() {
    this.actualizarHistorialSubject.next();
  }
}
