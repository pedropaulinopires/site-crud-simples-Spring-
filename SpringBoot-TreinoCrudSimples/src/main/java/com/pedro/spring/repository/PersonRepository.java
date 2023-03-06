package com.pedro.spring.repository;

import com.pedro.spring.domain.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PersonRepository  extends JpaRepository<Person,Long> {

    @Query("SELECT p FROM Person p where lower(p.name) LIKE :name%")
    public List<Person> findAllByName(@Param("name") String name);
}
