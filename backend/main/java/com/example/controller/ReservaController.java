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

import com.example.model.entities.Reserva;
import com.example.dto.DetalleReservaDTO;
import com.example.exception.ModeloNotFoundException;
import com.example.service.ReservaService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/reservas")
@Api(value = "Servicio REST para las reservas")
public class ReservaController {

	@Autowired
	private ReservaService reservaService;

	@ApiOperation("Rertorna una lista de las reservas")
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Reserva>> listar() {
		List<Reserva> reservas = new ArrayList<>();
		reservas = reservaService.listar();
		return new ResponseEntity<List<Reserva>>(reservas, HttpStatus.OK);
	}

	@ApiOperation("Retorna una reserva por id")
	@GetMapping(value = "/{id}")
	public ResponseEntity<Reserva> listarId(@PathVariable("id") Integer id) {
		Optional<Reserva> reserva = reservaService.listId(id);
		if (!reserva.isPresent()) {
			throw new ModeloNotFoundException("ID: " + id);
		}
		return new ResponseEntity<Reserva>(reserva.get(), HttpStatus.OK);
	}

	@ApiOperation("Registra una reserva")
	@PostMapping
	public ResponseEntity<Reserva> registrar(@Valid @RequestBody DetalleReservaDTO reservaDTO) {
		Reserva reservaNew = new Reserva();
		reservaNew = reservaService.registrar(reservaDTO);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(reservaNew.getId())
				.toUri();
		return ResponseEntity.created(location).build();
	}

	@ApiOperation("Actualiza los datos de una reserva")
	@PutMapping
	public ResponseEntity<Reserva> actualizar(@Valid @RequestBody Reserva reserva) {
		reservaService.modificar(reserva);
		return new ResponseEntity<Reserva>(HttpStatus.OK);
	}

	@ApiOperation("Elimina una reserva por id")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public void eliminar(@PathVariable Integer id) {
		Optional<Reserva> reserva = reservaService.listId(id);
		if (!reserva.isPresent()) {
			throw new ModeloNotFoundException("ID: " + id);
		} else {
			reservaService.eliminar(id);
		}
	}
	
	@GetMapping(value = "listar/{id}")
	public ResponseEntity<List<Reserva>> findByIdCliente(@PathVariable int id) {
		try {
			List<Reserva> reservas = reservaService.buscar(id);

			if (reservas.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(reservas, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}

}
