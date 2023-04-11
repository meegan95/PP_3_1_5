package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RolesService;
import ru.kata.spring.boot_security.demo.services.UserService;
import ru.kata.spring.boot_security.demo.util.UsersValidator;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/users")
public class FirstRestController {

    private final UserService userService;
    private final RolesService rolesService;
    private final UsersValidator usersValidator;

    @Autowired
    public FirstRestController(UserService userService, RolesService rolesService, UsersValidator usersValidator) {
        this.userService = userService;
        this.rolesService = rolesService;
        this.usersValidator = usersValidator;
    }

    @GetMapping
    public List<User> userList() {
        return userService.findAll();
    }

    @GetMapping("/roles")
    public List<Role> roleList() {
        return rolesService.getRoles();
    }

    @PostMapping
    public ResponseEntity<HttpStatus> create(@RequestBody @Valid User user, BindingResult bindingResult) {
        usersValidator.validate(user, bindingResult);
        if (bindingResult.hasErrors()) {
            System.out.println(Objects.requireNonNull(bindingResult.getFieldError()).getDefaultMessage());
            return ResponseEntity.badRequest().body(HttpStatus.BAD_REQUEST);
        } else {
            userService.save(user);
            return ResponseEntity.ok(HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") int id) {
        return userService.findOne(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<HttpStatus> update(@RequestBody User user, @PathVariable("id") int id) {
        userService.update(id, user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") int id) {
        userService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
