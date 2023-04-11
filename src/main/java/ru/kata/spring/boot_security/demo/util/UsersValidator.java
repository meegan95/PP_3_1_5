package ru.kata.spring.boot_security.demo.util;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UsersDetailsService;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Component
public class UsersValidator implements Validator {
    private final UsersDetailsService usersDetailsService;
    private Pattern pattern;
    private Matcher matcher;
    @Autowired
    public UsersValidator(UsersDetailsService usersDetailsService) {
        this.usersDetailsService = usersDetailsService;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;
        if (user.getPassword().isEmpty() || user.getFirstName().isEmpty() ||
                user.getLastName().isEmpty() || user.getUsername().isEmpty()){
            errors.rejectValue("username", "", "Введены неверные данные");
        }
        try {
            usersDetailsService.loadUserByUsername(user.getUsername());
        } catch (UsernameNotFoundException ignored) {
            return;
        }
        errors.rejectValue("username", "", "Пользователь с таким именем уже существует");
    }


}
