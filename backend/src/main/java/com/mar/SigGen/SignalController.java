package com.mar.SigGen;

import java.time.Instant;
import java.time.Clock;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class SignalController {
    @CrossOrigin
    @GetMapping(path = "/signal", produces = "application/json")
    public Map<String, Object> getSignal() {
        long timestamp = Instant.now().getEpochSecond();
        double angle = (double) (Clock.systemDefaultZone().millis() % (60000)) / (60000.0) * 2.0 * Math.PI;
        double value = Math.sin(angle);
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", timestamp);
        response.put("value", value);
        return response;
    }
}
