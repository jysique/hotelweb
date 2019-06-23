## DetalleReserva
```java
package com.example.model.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@IdClass(DetalleReservaPK.class)
@Table(name = "detalle_reservas")
public class DetalleReserva {
	
	@Id
	private Reserva reserva;
	
	@Id
	private Habitacion habitacion;
	
	public Reserva getReserva() {
		return reserva;
	}
	public void setReserva(Reserva reserva) {
		this.reserva = reserva;
	}
	public Habitacion getHabitacion() {
		return habitacion;
	}
	public void setHabitacion(Habitacion habitacion) {
		this.habitacion = habitacion;
	}
	
}
```