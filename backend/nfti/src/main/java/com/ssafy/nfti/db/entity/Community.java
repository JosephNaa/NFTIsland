package com.ssafy.nfti.db.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

@Getter
@Setter
@Entity(name = "community")
public class Community extends BaseEntity {

    @Column(nullable = false)
    private String name;

    private String desc;

    @Column(nullable = false)
    private Boolean payable;
    private String logoPath;

    @CreatedDate
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "community")
    private Set<Items> items = new HashSet<>();

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL)
    private List<Board> boards = new ArrayList<>();

    // host address
    private String hostAddress;

    @Builder
    public Community(
        String name,
        String desc,
        Boolean payable,
        String logoPath,
        String hostAddress
    ) {
        this.name = name;
        this.desc = desc;
        this.payable = payable;
        this.logoPath = logoPath;
        this.hostAddress = hostAddress;
    }
}
