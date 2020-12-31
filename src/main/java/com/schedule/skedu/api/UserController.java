package com.schedule.skedu.api;

import java.util.List;
import java.util.Optional;

import com.schedule.skedu.model.User;
import com.schedule.skedu.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;
    
    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @DeleteMapping("/users/{id}")
    public void removeUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/usersByEmail")
    public Optional<User> findUserByEmail(@RequestParam String email) {
        return userService.findUserByEmail(email);
    }

    @GetMapping("/verifyUser")
    public boolean findUserByEmailAndPassword(@RequestParam String email, @RequestParam String password) {
        Optional<User> val = userService.findUserByEmailAndPassword(email, password);
        boolean bool = false;
        if (val.isPresent()) {
            bool = true;
        } else {
            bool = false;
        }
        return bool;
    }
}
