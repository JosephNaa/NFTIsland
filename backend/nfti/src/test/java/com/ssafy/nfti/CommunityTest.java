package com.ssafy.nfti;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

import com.ssafy.nfti.db.entity.Community;
import com.ssafy.nfti.db.repository.CommunityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class CommunityTest {

    @Autowired
    protected CommunityRepository communityRepository;

//    @BeforeEach
//    public void init() {
//        communityRepository.save(Community.builder()
//            .name("testName")
//            .description("testDesc")
//            .payable(false)
//            .logoPath("testLogoPath")
//            .hostAddress("testAddress")
//            .build());
//    }
//
//    @Test
//    void load() {
//        Community community = communityRepository.getById((long) 1);
//        assertThat(community.getName(), is("testName"));
//    }
}
