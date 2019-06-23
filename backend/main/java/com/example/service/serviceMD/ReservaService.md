##ReservaService
```java
package com.example.service;

import java.util.List;

import com.example.dto.DetalleReservaDTO;
import com.example.model.entities.Reserva;

public interface ReservaService extends CrudService<Reserva> {

	Reserva registrar(DetalleReservaDTO reservaDTO);
	
	List<Reserva> buscar(int id);
}
```