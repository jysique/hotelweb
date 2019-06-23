## Pago
```java
package com.example.model.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import io.swagger.annotations.ApiModel;


@ApiModel(description = "Información de pago")
@Entity
@Table(name = "Pagos")
public class Pago {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@JsonSerialize(using = ToStringSerializer.class)
	private LocalDateTime fechaPago;
	
	@Column(name = "monto", nullable = false, length = 3)
	private int monto;
	
	@Column(name = "IGV", nullable = false, length = 3)
	private int IGV;
	
	@OneToOne
	@JoinColumn(name = "reserva_Id", nullable = false)
	private Reserva reserva;
	
	@Column(name = "bFormadePago", nullable = false, length = 70)
	private boolean bFormadePago;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDateTime getFechaPago() {
		return fechaPago;
	}

	public void setFechaPago(LocalDateTime fechaPago) {
		this.fechaPago = fechaPago;
	}

	public int getMonto() {
		return monto;
	}

	public void setMonto(int monto) {
		this.monto = monto;
	}

	public int getIGV() {
		return IGV;
	}

	public void setIGV(int iGV) {
		IGV = iGV;
	}

	public Reserva getReserva() {
		return reserva;
	}

	public void setReserva(Reserva reserva) {
		this.reserva = reserva;
	}

	public boolean isbFormadePago() {
		return bFormadePago;
	}

	public void setbFormadePago(boolean bFormadePago) {
		this.bFormadePago = bFormadePago;
	}


}



```