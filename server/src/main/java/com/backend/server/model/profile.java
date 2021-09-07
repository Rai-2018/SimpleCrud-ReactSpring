package com.backend.server.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity 
public class profile {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Long id;

  @NotNull(message = "Name may not be null")
  private String name;

  @NotNull(message = "Age may not be null")
  private int age;
  
  private String description;

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getAge() {
    return age;
  }

  public void setAge(int age) {
    this.age = age;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}