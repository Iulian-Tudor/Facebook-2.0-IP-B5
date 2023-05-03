package org.Facebook.controller;

import org.Facebook.model.entity.Post;
import org.Facebook.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping(value = "/posts")
    public List<Post> posts() {
        return postService.getAllPosts();
    }
}
