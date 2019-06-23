package com.example.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.model.entities.Reserva;

@Repository
public interface ReservaRepository  extends JpaRepository<Reserva,Integer> {
	
	@Query("FROM Reserva r WHERE r.cliente.id=:id")
	List<Reserva> buscar(@Param("id") int id);
}
