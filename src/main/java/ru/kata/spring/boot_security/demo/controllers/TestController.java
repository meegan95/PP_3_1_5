//package ru.kata.spring.boot_security.demo.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import ru.kata.spring.boot_security.demo.services.UserService;
//
//@Controller
//@RequestMapping
//public class TestController {
//
//    private final UserService userService;
//
//    @Autowired
//    public TestController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @GetMapping("/")  //юзер - один пользователь
//    public String show() {
//        return "show";
//    }
//
//    @GetMapping("/index") //админ - все пользователи
//    public String index(){
//        return "index";
//    }
//}
