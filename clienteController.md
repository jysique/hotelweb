# Cliente Controller

```java

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.model.entities.Cliente;
import com.example.exception.ModeloNotFoundException;
import com.example.service.ClienteService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/clientes")
@Api(value = "Servicio REST para los clientes")
public class ClienteController {

	@Autowired
	private ClienteService clienteService;

	@ApiOperation("Rertorna una lista de los clientes")
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Cliente>> listar() {
		List<Cliente> clientes = new ArrayList<>();
		clientes = clienteService.listar();
		return new ResponseEntity<List<Cliente>>(clientes, HttpStatus.OK);
	}

	@ApiOperation("Retorna un cliente por id")
	@GetMapping(value = "/{id}")
	public ResponseEntity<Cliente> listarId(@PathVariable("id") Integer id) {
		Optional<Cliente> cliente = clienteService.listId(id);
		if (!cliente.isPresent()) {
			throw new ModeloNotFoundException("ID: " + id);
		}
		return new ResponseEntity<Cliente>(cliente.get(), HttpStatus.OK);

	}

	@ApiOperation("Registra un cliente")
	@PostMapping
	public ResponseEntity<Cliente> registrar(@Valid @RequestBody Cliente cliente) {
		Cliente clienteNew = new Cliente();
		clienteNew = clienteService.registrar(cliente);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(clienteNew.getId())
				.toUri();
		return ResponseEntity.created(location).build();
	}

	@ApiOperation("Actualiza los datos de un cliente")
	@PutMapping
	public ResponseEntity<Cliente> actualizar(@Valid @RequestBody Cliente cliente) {
		clienteService.modificar(cliente);
		return new ResponseEntity<Cliente>(HttpStatus.OK);
	}

	@ApiOperation("Elimina un cliente por id")
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public void eliminar(@PathVariable Integer id) {
		Optional<Cliente> cliente = clienteService.listId(id);
		if (!cliente.isPresent()) {
			throw new ModeloNotFoundException("ID: " + id);
		} else {
			clienteService.eliminar(id);
		}
	}

}
```
