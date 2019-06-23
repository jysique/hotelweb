## Pago controller
```java
 package com.example.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.exception.ModeloNotFoundException;
import com.example.model.entities.Pago;
import com.example.model.entities.Reserva;
import com.example.service.PagoService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
 @RequestMapping("/pagos")
 @Api(value = "Servicio REST para los Pagos")
public class PagoController {
	
	@Autowired
	private PagoService pagoService;
	
	@ApiOperation("Rertorna una lista de los pagos")
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Pago>> listar() {
		List<Pago> pagos = new ArrayList<>();
		pagos = pagoService.listar();
		return new ResponseEntity<List<Pago>>(pagos, HttpStatus.OK);
	}
	
	@ApiOperation("Retorna un pago por id")
	@GetMapping(value = "/{id}")
	public ResponseEntity<Pago> listarId(@PathVariable("id") Integer id) {
		Optional<Pago> pago = pagoService.listId(id);
		if (!pago.isPresent()) {
			throw new ModeloNotFoundException("ID: " + id);
		}
		return new ResponseEntity<Pago>(pago.get(), HttpStatus.OK);

	}
	
	@ApiOperation("Registra un Pago")
	@PostMapping
	public ResponseEntity<Pago> registrar(@Valid @RequestBody Pago pago) {
		Pago pagoNew = new Pago();
		pagoNew = pagoService.registrar(pago);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(pagoNew.getId()).toUri();
		return ResponseEntity.created(location).build();
	}
	
	@ApiOperation("Actualiza los datos de un Pago")
	@PutMapping
	public ResponseEntity<Pago> actualizar(@Valid @RequestBody Pago pago) {
		pagoService.modificar(pago);
		return new ResponseEntity<Pago>(HttpStatus.OK);
	}
	
	@ApiOperation("Elimina un pago por id")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public void eliminar(@PathVariable Integer id) {
		Optional<Pago> pago = pagoService.listId(id);
		if (!pago.isPresent()) {
			throw new ModeloNotFoundException("ID: " + id);
		} else {
			pagoService.eliminar(id);
		}
	}
	
	@GetMapping(value = "listar/{id}")
	public ResponseEntity<List<Pago>> findByIdCliente(@PathVariable int id) {
		try {
			List<Pago> pagos = pagoService.buscar(id);
			if (pagos.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(pagos, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

}
```