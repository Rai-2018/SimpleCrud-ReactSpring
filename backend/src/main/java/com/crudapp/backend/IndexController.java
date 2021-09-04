package com.crudapp.backend;

import java.util.Map;
import java.util.Optional;

import com.crudapp.backend.model.*;

import org.springframework.data.domain.Sort;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.boot.json.BasicJsonParser;
import org.springframework.boot.json.JsonParser;
import org.springframework.http.HttpStatus;

@RestController
@CrossOrigin
public class IndexController {

    @Autowired
    private profileRepository profileRepository;

    @GetMapping("/")
    public String home(){
        return "This will be home page then";
    }

    @PostMapping(path="/create") 
    public String addNewUser (
        @RequestBody String jsonStr) {

        JsonParser parser = new BasicJsonParser();
        Map<String, Object> responseMap = parser.parseMap(jsonStr);
        profile entry = new profile();
        String name = (String) responseMap.get("name");
        String age = (String) responseMap.get("age");
        String description = (String) responseMap.get("description");
        entry.setName(name);
        entry.setAge(Integer.parseInt(age));
        entry.setDescription(description);
        profileRepository.save(entry);
        return "saved";
    }

    @GetMapping(path="/all")
    public Iterable<profile> getAllUsers() {
      return profileRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @GetMapping("/delete/{id}")
    public String deleteProfile(@PathVariable(name = "id") Long id) {
        if (profileRepository.existsById(id)) {
            profileRepository.deleteById(id);
            return "deleted";       
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID does not exist");
        }
    }

    @GetMapping("/update/{id}")
    public Optional < profile > updateProfileGET(@PathVariable(name = "id") Long id){

        if (profileRepository.existsById(id)) {
            Optional < profile > user = profileRepository.findById(id);
            return user;
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID does not exist");
        }
    }

    @PostMapping("/update/{id}")
    public String updateProfilePOST(@PathVariable(name = "id") Long id, @RequestBody String jsonStr) {
        if (profileRepository.existsById(id)) {
            profile user = profileRepository.findById(id).get();

            JsonParser parser = new BasicJsonParser();
            Map<String, Object> responseMap = parser.parseMap(jsonStr);
            String name = (String) responseMap.get("name");
            String age = (String) responseMap.get("age");
            String description = (String) responseMap.get("description");

            user.setName(name); 
            user.setAge(Integer.parseInt(age));
            user.setDescription(description);
            profileRepository.save(user);
            return "updated";       
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID does not exist");
        }
    }
}
