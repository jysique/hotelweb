package com.example.model.entities;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class DetalleReservaPK implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@ManyToOne
	@JoinColumn(name = "reserva_id",nullable = false)
	private Reserva reserva;
	
	@ManyToOne
	@JoinColumn(name = "habitacion_id",nullable = false)
	private Habitacion habitacion;
	
}
