##ClienteServiceIMPL
```java
package com.example.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.entities.Cliente;
import com.example.model.repository.ClienteRepository;
import com.example.service.ClienteService;

@Service
public class ClienteServiceImpl implements ClienteService {

	@Autowired
	private ClienteRepository clienteRepository;
	
	@Override
	public Cliente registrar(Cliente t) {
		return clienteRepository.save(t);
	}

	@Override
	public Cliente modificar(Cliente t) {
		// TODO Auto-generated method stub
		return clienteRepository.save(t);
	}

	@Override
	public void eliminar(int id) {
		clienteRepository.deleteById(id);
		
	}

	@Override
	public Optional<Cliente> listId(int id) {
		// TODO Auto-generated method stub
		return clienteRepository.findById(id);
	}

	@Override
	public List<Cliente> listar() {
		// TODO Auto-generated method stub
		return clienteRepository.findAll();
	}

}
```