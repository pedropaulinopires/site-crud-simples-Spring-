package com.pedro.spring.request;

import com.pedro.spring.domain.Person;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonPostRequest {

    @NotEmpty(message = "field name is not empty or null!")
    private String name;

    public Person build(){
        return Person.builder()
                .name(this.name)
                .build();
    }
}
