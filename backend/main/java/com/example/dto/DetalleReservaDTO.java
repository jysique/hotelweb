package com.example.dto;


import java.util.List;

import com.example.model.entities.Habitacion;
import com.example.model.entities.Reserva;

public class DetalleReservaDTO {
	
	private Reserva reserva;
	private List<Habitacion> lstHabitacion;
	
	public Reserva getReserva() {
		return reserva;
	}
	public void setReserva(Reserva reserva) {
		this.reserva = reserva;
	}
	public List<Habitacion> getLstHabitacion() {
		return lstHabitacion;
	}
	public void setLstHabitacion(List<Habitacion> lstHabitacion) {
		this.lstHabitacion = lstHabitacion;
	}
	
	
}
