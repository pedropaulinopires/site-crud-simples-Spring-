package com.pedro.spring.service;

import com.pedro.spring.domain.Person;
import com.pedro.spring.exception.BadRequestException;
import com.pedro.spring.repository.PersonRepository;
import com.pedro.spring.request.PersonPostRequest;
import com.pedro.spring.request.PersonPutRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonService {
    private final PersonRepository personRepository;

    /**
     *
     * method list all peoples
     *
     * */
    public List<Person> findAll(){
        return personRepository.findAll();
    }

    /**
     *
     * method find person by id
     *
     * */
    public Person findById(long id){
        return personRepository.findById(id).orElseThrow(
                () -> new BadRequestException("person not found by id")
        );
    }

    /**
     *
     * method find all by name
     *
     * */
    public List<Person> findAllByName(String name){
        return personRepository.findAllByName(name);
    }

    /**
     *
     * save person
     *
     * */
    public Person save(PersonPostRequest personPostRequest){
        return personRepository.save(personPostRequest.build());
    }

    /**
     *
     * method delete person by id
     *
     * */
    public void deleteById(long id){
        personRepository.deleteById(id);
    }

    /**
     *
     * method replace(update)
     *
     * */
    public void replace(PersonPutRequest personPutRequest){ personRepository.save(personPutRequest.build());    }


}
