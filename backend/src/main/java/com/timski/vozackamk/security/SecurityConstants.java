package com.timski.vozackamk.security;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Base64;

public class SecurityConstants {
    static Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    public static final long EXPIRATION_TIME = 864_000_000;
    public static final String JWT_SECRET = Base64.getEncoder().encodeToString(key.getEncoded());
}
