package com.example.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.entities.Pago;
import com.example.model.repository.PagoRepository;
import com.example.service.PagoService;

@Service
public class PagoServiceimpl implements PagoService {
	
	@Autowired
	private PagoRepository pagoRepository;

	@Override
	public Pago registrar(Pago t) {
		return pagoRepository.save(t);
	}

	@Override
	public Pago modificar(Pago t) {
		return pagoRepository.save(t);
	}

	@Override
	public void eliminar(int id) {
		pagoRepository.deleteById(id);
		
	}

	@Override
	public Optional<Pago> listId(int id) {
		return pagoRepository.findById(id);
	}

	@Override
	public List<Pago> listar() {
		return pagoRepository.findAll();
	}
	
	public List<Pago> buscar(int id) {
		return pagoRepository.buscar(id);
	}
}
