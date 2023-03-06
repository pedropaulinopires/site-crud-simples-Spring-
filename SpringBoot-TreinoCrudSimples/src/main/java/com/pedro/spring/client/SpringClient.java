package com.pedro.spring.client;

import com.pedro.spring.domain.Person;
import com.pedro.spring.request.PersonPutRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;

@Log4j2
public class SpringClient {
    public static void main(String[] args) {
        //log.info(new RestTemplate().getForObject("http://localhost:8080/peoples/{id}", Person.class,5));

        //ResponseEntity<List<Person>> peoples =
        //        new RestTemplate().exchange("http://localhost:8080/peoples/findbyname?name=pedro"
        //                , HttpMethod.GET,null, new ParameterizedTypeReference<>() {});

        //log.info(peoples);

        //log.info(new RestTemplate().exchange
        // ("http://localhost:8080/peoples",HttpMethod.GET,null,new ParameterizedTypeReference<>(){}));

        //delete
        //log.info(new RestTemplate().exchange
        //        ("http://localhost:8080/peoples/{id}", HttpMethod.DELETE,null, Person.class,19));

        //post
        //Person person = new Person().builder()
        //        .name("Rest Template")
        //        .build();
        //log.info(new RestTemplate()
        //        .exchange("http://localhost:8080/peoples",
        //                HttpMethod.POST,
        //               new HttpEntity<>(person), Person.class));

        //replace(put)
        //Person person = new Person(1L,"Pedro Henrique Paulino Pires");
        //log.info(new RestTemplate().exchange("http://localhost:8080/peoples",HttpMethod.PUT
        //        ,new HttpEntity<>(person), Person.class));
    }
}
