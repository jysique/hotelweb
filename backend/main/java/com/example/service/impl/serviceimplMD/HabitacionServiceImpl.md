##HabitacionServiceImpl
```java
package com.example.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.entities.Habitacion;
import com.example.model.repository.HabitacionRepository;
import com.example.service.HabitacionService;

@Service
public class HabitacionServiceImpl implements HabitacionService{
	
	@Autowired
	private HabitacionRepository habitacionRepository;
	
	@Override
	public Habitacion registrar(Habitacion t) {
		return habitacionRepository.save(t);
	}

	@Override
	public Habitacion modificar(Habitacion t) {
		// TODO Auto-generated method stub
		return habitacionRepository.save(t);
	}

	@Override
	public void eliminar(int id) {
		habitacionRepository.deleteById(id);
		
	}

	@Override
	public Optional<Habitacion> listId(int id) {
		// TODO Auto-generated method stub
		return habitacionRepository.findById(id);
	}

	@Override
	public List<Habitacion> listar() {
		// TODO Auto-generated method stub
		return habitacionRepository.findAll();
	}
	
}


```