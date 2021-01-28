package com.schedule.skedu.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SinglePageAppController {
    @RequestMapping(value = {"/", "home", "/login"})
    public String index() {
        return "index.html";
    }
}
