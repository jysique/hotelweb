package com.example.service;


import java.util.List;

import com.example.model.entities.Pago;

public interface PagoService extends CrudService<Pago> {
	
	List<Pago> buscar(int id);
}
