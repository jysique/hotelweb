## Habitacion
```java
package com.example.model.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(description = "Información de la habitacion")
@Entity
@Table(name="habitaciones")
public class Habitacion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "ocupado", nullable = false, length = 8)
	private boolean ocupado;
	
	@ApiModelProperty(notes = "Capacidad debe tener minimo 1 caracteres")
	@Column(name = "capacidad", nullable = false, length = 3)
	private int capacidad;
	
	@ApiModelProperty(notes = "Tipo debe tener minimo 5 caracteres")
	@Size(min = 5, max = 20, message = "Tipo debe tener 5 caracteres")
	@Column(name = "tipo", nullable = false, length = 20)
	private String tipo;
	
	@ApiModelProperty(notes = "Descripcion debe tener minimo 10 caracteres")
	@Size(min = 10, max = 50, message = "Descripcion debe tener 10 caracteres")
	@Column(name = "descripcion", nullable = false, length = 50)
	private String descripcion;
	
	public Integer getId() {
		return id;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public int getCapacidad() {
		return capacidad;
	}

	public void setCapacidad(int capacidad) {
		this.capacidad = capacidad;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public boolean isOcupado() {
		return ocupado;
	}

	public void setOcupado(boolean ocupado) {
		this.ocupado = ocupado;
	}



}


```