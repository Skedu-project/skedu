package com.schedule.skedu.service;

import java.util.List;
import java.util.Optional;

import com.schedule.skedu.model.User;
import com.schedule.skedu.model.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findCurrentUsers();
    }

    public Optional<User> getUser(Long id) {
        return userRepository.findById(id);
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findUserByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public User userIsSignedIn(User user) {
        return userRepository.save(user);
    }

    public User userTotalTime(User user) {
        return userRepository.save(user);
    }

    public User updateProfile(User user) {
        return userRepository.save(user);
    }
}
