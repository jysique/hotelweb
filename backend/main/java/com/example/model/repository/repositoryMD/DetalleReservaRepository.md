##DetalleReservaRepository
```java
package com.example.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.model.entities.DetalleReserva;

@Repository
public interface DetalleReservaRepository
		extends JpaRepository<DetalleReserva,Integer> {

	@Modifying
	@Query(value = "INSERT INTO detalle_reservas(reserva_id,habitacion_id)"
				+ "VALUES(:reservaId,:habitacionId)",nativeQuery = true)
	Integer registrar(@Param("reservaId") Integer reservaId,
			@Param("habitacionId") Integer habitacionId);
}
```