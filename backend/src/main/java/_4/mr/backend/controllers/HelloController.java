package _4.mr.backend.controllers;

import _4.mr.backend.dtos.HelloResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public HelloResponse hello() {
        return new HelloResponse("Hello from JWT Authorization");
    }

}
