package com.cocoviet.backend.utils;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.*;
import com.nimbusds.jwt.*;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Component
public class JwtToken {

    @NonFinal
    @Value("${spring.jwt.signerkey}")
    protected String SIGNER_KEY;

    public String generateToken(String customerEmail) {
        try {
            JWTClaimsSet claims = new JWTClaimsSet.Builder()
                    .subject(customerEmail)
                    .issuer("cocoviet.com")
                    .expirationTime(new Date(System.currentTimeMillis() + 3600000))
                    .build();

            JWSObject jwsObject = new JWSObject(new JWSHeader(JWSAlgorithm.HS256), new Payload(claims.toJSONObject()));
            jwsObject.sign(new MACSigner(SIGNER_KEY));

            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException("Cannot create JWT token", e);
        }
    }

    public JWTClaimsSet validateToken(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWSVerifier verifier = new MACVerifier(SIGNER_KEY);
            if (signedJWT.verify(verifier) && !signedJWT.getJWTClaimsSet().getExpirationTime().before(new Date())) {
                return signedJWT.getJWTClaimsSet();
            } else {
                throw new RuntimeException("Token is invalid or expired");
            }
        } catch (Exception e) {
            log.error("Token validation failed", e);
            throw new RuntimeException("Invalid token", e);
        }
    }




}
