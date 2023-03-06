package com.pedro.spring.controller;

import com.pedro.spring.domain.Person;
import com.pedro.spring.request.PersonPostRequest;
import com.pedro.spring.request.PersonPutRequest;
import com.pedro.spring.service.PersonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("peoples")
@RequiredArgsConstructor
public class PersonController {
    private final PersonService personService;

    @GetMapping
    public ResponseEntity<List<Person>> findAll(){
        return new ResponseEntity<>(personService.findAll(),HttpStatus.OK);
    }

    @GetMapping("findbyname")
    public ResponseEntity<List<Person>> findAllByName(@RequestBody @RequestParam String name){
        return new ResponseEntity<>(personService.findAllByName(name),HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Person> findById(@PathVariable long id){
        return new ResponseEntity<>(personService.findById(id),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Person> save(@RequestBody  @Valid  PersonPostRequest personPostRequest){
        return new ResponseEntity<>(personService.save(personPostRequest),HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteById(@PathVariable long id){
        personService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<Void> replace(@RequestBody  @Valid PersonPutRequest personPutRequest){
        personService.replace(personPutRequest);
        return  new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
