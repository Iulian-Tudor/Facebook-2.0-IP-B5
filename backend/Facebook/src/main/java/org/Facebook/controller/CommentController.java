package org.Facebook.controller;

import org.Facebook.mapper.CommentMapper;
import org.Facebook.model.dto.CommentDto;
import org.Facebook.model.entity.Comment;
import org.Facebook.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@RestController
//@RequestMapping("/api")
//@Controller
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    /*@PostMapping("/postcomment")
    @ResponseBody
    public Comment postComment(@RequestBody Comment comment) {
        return commentService.postComment(comment);
    }*/

    @PostMapping("/comments/delete")
    @ResponseBody
    public String deleteComment(@RequestParam("id") Integer id, RedirectAttributes redirectAttributes) {
        commentService.deleteComment(id);
        redirectAttributes.addFlashAttribute("message", "Comment deleted!");
        return "redirect:/posts";
    }

    @PostMapping("/postcomment")
    @ResponseBody
    public String postComment(@RequestBody CommentDto commentDto) {
        commentService.postComment(commentDto);
        return "comment posted";
    }

    @GetMapping(value = "/comments")
    @ResponseBody
    public List<CommentDto> comments() {
        return commentService.getAllComments().stream().map(CommentMapper::toDto).toList();
    }


    @GetMapping(value = "/rep_com")
    @ResponseBody
    public void hideCom(@RequestBody Comment comment) {
        commentService.hideCom(comment);
    }

    /*@GetMapping(value = "/comments")
    public List<Comment> posts() {
        return commentService.getAllComments();
    }*/

}
