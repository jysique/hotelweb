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

import com.example.model.entities.Habitacion;
import com.example.exception.ModeloNotFoundException;
import com.example.service.HabitacionService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/habitaciones")
@Api(value = "Servicio REST para las habitaciones")
public class HabitacionController {

	@Autowired
	private HabitacionService habitacionService;

	@ApiOperation("Rertorna una lista de las habitaciones")
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Habitacion>> listar() {
		List<Habitacion> habitaciones = new ArrayList<>();
		habitaciones = habitacionService.listar();
		return new ResponseEntity<List<Habitacion>>(habitaciones, HttpStatus.OK);
	}

	@ApiOperation("Retorna una habitación por id")
	@GetMapping(value = "/{id}")
	public ResponseEntity<Habitacion> listarId(@PathVariable("id") Integer id) {
		Optional<Habitacion> habitacion = habitacionService.listId(id);
		if (!habitacion.isPresent()) {
			throw new ModeloNotFoundException("ID: " + id);
		}
		return new ResponseEntity<Habitacion>(habitacion.get(), HttpStatus.OK);

	}

	@ApiOperation("Registra una habitación")
	@PostMapping
	public ResponseEntity<Habitacion> registrar(@Valid @RequestBody Habitacion habitacion) {
		Habitacion habitacionNew = new Habitacion();
		habitacionNew = habitacionService.registrar(habitacion);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(habitacionNew.getId()).toUri();
		return ResponseEntity.created(location).build();
	}

	@ApiOperation("Actualiza los datos de una habitacion")
	@PutMapping
	public ResponseEntity<Habitacion> actualizar(@Valid @RequestBody Habitacion habitacion) {
		habitacionService.modificar(habitacion);
		return new ResponseEntity<Habitacion>(HttpStatus.OK);
	}

	@ApiOperation("Elimina una habitacion por id")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public void eliminar(@PathVariable Integer id) {
		Optional<Habitacion> habitacion = habitacionService.listId(id);
		if (!habitacion.isPresent()) {
			throw new ModeloNotFoundException("ID: " + id);
		} else {
			habitacionService.eliminar(id);
		}
	}

}