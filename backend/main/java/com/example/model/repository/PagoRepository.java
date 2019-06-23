package com.example.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.model.entities.Pago;

@Repository
public interface PagoRepository extends JpaRepository<Pago,Integer> {

	@Query("FROM Pago p WHERE p.reserva.cliente.id=:id")
	List<Pago> buscar(@Param("id") int id);
}
