##HabitacionRepository
```java
package com.example.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.entities.Habitacion;

@Repository
public interface HabitacionRepository extends JpaRepository<Habitacion,Integer> {

}
```