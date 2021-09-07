package com.backend.server;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.backend.server.model.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Pageable;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
    public String addNewUser (@RequestBody profile input) {
        profile entry = new profile();
        entry.setName(input.getName());
        entry.setAge(input.getAge());
        entry.setDescription(input.getDescription());
        profileRepository.save(entry);
        return "saved";
    }

    @GetMapping(path="/all")
    public Iterable<profile> getAllUsers() {
      return profileRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @GetMapping(path="/findNames")
    public Map<String, Object> getAllMatchName(
        @RequestParam(required = false) String name,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "2") int size
    ) {
        Pageable paging = PageRequest.of(page, size, Sort.by("id"));
        Page<profile> pageName = profileRepository.findByName(name, paging);

        List<profile> names = new ArrayList<profile>();
        names = pageName.getContent();
  
        Map<String, Object> response = new HashMap<>();
        response.put("names", names);
        response.put("currentPage", pageName.getNumber());
        response.put("totalItems", pageName.getTotalElements());
        response.put("totalPages", pageName.getTotalPages());
        return response;
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
    public String updateProfilePOST(@PathVariable(name = "id") Long id, @RequestBody profile input) {
        if (profileRepository.existsById(id)) {
            profile user = profileRepository.findById(id).get();

            user.setName(input.getName()); 
            user.setAge(input.getAge());
            user.setDescription(input.getDescription());
            profileRepository.save(user);
            return "updated";       
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID does not exist");
        }
    }
}
