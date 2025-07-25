// package com.nepool.app.security.filter;

// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.nepool.app.domain.user.dto.UserLoginDTO;
// import com.nepool.app.domain.user.dto.UserLoginRequestDTO;
// import com.nepool.app.security.dto.NePoolAuthDTO;
// import com.nepool.app.util.jwt.JWTUtil;

// import lombok.extern.log4j.Log4j2;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import java.io.IOException;



// @Log4j2
// public class ApiLoginFilter extends AbstractAuthenticationProcessingFilter {
//     private JWTUtil jwtUtil;

//     // @Autowired
//     // private ApiCheckFilter apiCheckFilter;

//     public ApiLoginFilter(String defaultFilterProcessesUrl, JWTUtil jwtUtil) {
//         super(defaultFilterProcessesUrl);
//         this.jwtUtil = jwtUtil;
//     }

//     @Override
//     public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
//         UserLoginRequestDTO body = new ObjectMapper().readValue(request.getInputStream(),UserLoginRequestDTO.class);
//         UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(body.getUsername(),body.getPassword());
//         return getAuthenticationManager().authenticate(authToken);
//     }

//     @Override
//     protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

//         NePoolAuthDTO principal = ((NePoolAuthDTO)authResult.getPrincipal());

//         try {
//             UserLoginDTO req = new UserLoginDTO();
//             req.setId(principal.getId());
//             req.setName(principal.getName());
//             req.setEmail(principal.getEmail());
//             // req.setToken( jwtUtil.generateToken("123"));
//             req.setUsername(principal.getUsername());
//             response.setContentType("application/json;charset=utf-8");
//             response.getWriter().write(new ObjectMapper().writeValueAsString(req));

//         } catch(Exception e) {
//             e.printStackTrace();
//         }
//     }

//     @Override
//     protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {

//         throw new IOException("아이디 혹은 비밀번호를 다시 확인 해주세요.");
//     }
// }
