##ReservaServiceImpl
```java
package com.example.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dto.DetalleReservaDTO;
import com.example.model.entities.Reserva;
import com.example.model.repository.DetalleReservaRepository;
import com.example.model.repository.ReservaRepository;
import com.example.service.ReservaService;

@Service
public class ReservaServiceImpl implements ReservaService{
	
	@Autowired
	private ReservaRepository reservaRepository;
	
	@Autowired
	private DetalleReservaRepository detalleReservaRepository;
	
	
	@Override
	public Reserva registrar(Reserva t) {
		if(t.getFechaEntrada().isBefore(t.getFechaSalida()) ) {
			return reservaRepository.save(t);
		}else 
			return null;
	}

	@Override
	public Reserva modificar(Reserva t) {
		// TODO Auto-generated method stub
		if(t.getFechaEntrada().isBefore(t.getFechaSalida()) ) {
			return reservaRepository.save(t);
		}else 
			return null;
	}

	@Override
	public void eliminar(int id) {
		reservaRepository.deleteById(id);
		
	}

	@Override
	public Optional<Reserva> listId(int id) {
		// TODO Auto-generated method stub
		return reservaRepository.findById(id);
	}

	@Override
	public List<Reserva> listar() {
		// TODO Auto-generated method stub
		return reservaRepository.findAll();
	}
	
	@Transactional
	@Override
	public Reserva registrar(DetalleReservaDTO reservaDTO) {
		reservaRepository.save(reservaDTO.getReserva());
		
		reservaDTO.getLstHabitacion().forEach
			(habitacion->detalleReservaRepository.registrar
					(reservaDTO.getReserva().getId() , habitacion.getId()));
		
		
		return reservaDTO.getReserva();
	}
	
	public List<Reserva> buscar(int id) {
		return reservaRepository.buscar(id);
	}
}
```