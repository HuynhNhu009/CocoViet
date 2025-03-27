package com.cocoviet.backend.utils;

import com.cocoviet.backend.Enum.ErrorCode;
import com.cocoviet.backend.exception.AppException;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Component
public class AdminAuthen {
    @NonFinal
    @Value("${spring.jwt.signerkey}")
    protected String SIGNER_KEY;

    public String generateToken(String customerEmail) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512); // thuat toan ma hoa

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(customerEmail)
                .issuer("cocoviet.com")
                .expirationTime(new Date(Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))
                .claim("customClaim", "customClaimValue")
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY));
            return jwsObject.serialize();
        }catch (JOSEException e) {
            log.error("Can not create JWT object", e);
            throw new RuntimeException(e);
        }
    }

    public JWTClaimsSet introspectToken(String tokenRequest) throws JOSEException, ParseException {
        var token = tokenRequest;

        JWSVerifier verifier = new MACVerifier(SIGNER_KEY);
        SignedJWT signedJWT = SignedJWT.parse(token);

        JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();
        Date expirationTime = claimsSet.getExpirationTime();

        if (signedJWT.verify(verifier) && expirationTime.after(new Date())) {
            return claimsSet;
        } else {
            throw new AppException(ErrorCode.TOKEN_EXPIRED);
        }
    }


}
