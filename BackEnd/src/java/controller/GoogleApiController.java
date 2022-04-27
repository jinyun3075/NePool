package com.NePool.app.controller;

import com.NePool.app.domain.user.dto.GoogleLoginDTO;
import com.NePool.app.domain.user.dto.UserLoginDTO;
import com.NePool.app.service.UserService;
import com.nimbusds.jose.shaded.json.JSONObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Log4j2
@RequiredArgsConstructor
@RequestMapping("/google")
@RestController
public class GoogleApiController {

    @Value("${google.login.url}")
    private String googleLoginUrl;

    @Value("${google.client-id}")
    private String googleClientId;

    @Value("${google.redirect.url}")
    private String googleRedirectUrl;

    @Value("${google.client-secret}")
    private String googleClientSecret;

    @Value("${google.auth.url}")
    private String googleAuthUrl;

    private final UserService service;

    @GetMapping("/url")
    public @ResponseBody
    String getGoogleURL(HttpServletRequest request) throws Exception {
        String reqUrl = googleLoginUrl + "/o/oauth2/v2/auth?client_id=" + googleClientId + "&redirect_uri=" + googleRedirectUrl
                + "&response_type=code&scope=email%20profile%20openid&access_type=offline";

        return reqUrl;
    }

    // 구글 연동정보 조회
    @GetMapping("/login")
    public ResponseEntity<UserLoginDTO> oauth_google(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "code") String authCode) throws Exception {

        // restTemplate 호출
        RestTemplate restTemplate = new RestTemplate();

        GoogleLoginDTO googleOAuthRequestParam = GoogleLoginDTO
                .builder()
                .clientId(googleClientId)
                .clientSecret(googleClientSecret)
                .code(authCode)
                .redirectUri(googleRedirectUrl)
                .grantType("authorization_code")
                .build();

        ResponseEntity<JSONObject> apiResponse = restTemplate.postForEntity(googleAuthUrl + "/token", googleOAuthRequestParam, JSONObject.class);
        JSONObject responseBody = apiResponse.getBody();

        //   id_token은 jwt 형식
        String jwtToken = responseBody.getAsString("id_token");
        String requestUrl = UriComponentsBuilder.fromHttpUrl(googleAuthUrl + "/tokeninfo").queryParam("id_token", jwtToken).toUriString();

        JSONObject resultJson = restTemplate.getForObject(requestUrl, JSONObject.class);

        // 구글 정보조회 성공
        if (resultJson != null) {
            return new ResponseEntity<>(service.googleLogin(resultJson), HttpStatus.OK);
        } else {
            throw new Exception("구글 정보조회에 실패했습니다.");
        }

    }
}
