package com.ssafy.nfti.common.auth;

import com.ssafy.nfti.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.List;

public class CustomUserDetails {
    @Autowired
    User user;
    boolean accountNonExpired;
    boolean accountNonLocked;
    boolean credentialNonExpired;
    boolean enabled = false;
    List<GrantedAuthority> roles = new ArrayList<>();

    public CustomUserDetails(User user) {
        super();
        this.user = user;
    }

}
