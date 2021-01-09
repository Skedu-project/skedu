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
import org.springframework.web.bind.annotation.PutMapping;
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
    public Optional<User> findUserByEmailAndPassword(@RequestParam String email, @RequestParam String password) {
        return userService.findUserByEmailAndPassword(email, password);
        // Long id;
        // if (val.isPresent()) {
        //     id = val.getId();
        // } else {
        //     id = null;
        // }
        //return val;
    }

    @PutMapping("/userIsSignedIn")
    public boolean userIsSignedIn(@RequestParam String email, @RequestParam boolean signIn) {
        User user = userService.findUserByEmail(email).get();
        user.setIsSignedIn(signIn);
        User updatedUser = userService.userIsSignedIn(user);
        return updatedUser.getIsSignedIn();
    }

    @PutMapping("/userTotalTime")
    public int userTotalTime(@RequestParam String email, @RequestParam int totalTime) {
        User user = userService.findUserByEmail(email).get();
        user.setTotalTime(totalTime);
        User updatedUser = userService.userTotalTime(user);
        return updatedUser.getTotalTime();
    }
}
