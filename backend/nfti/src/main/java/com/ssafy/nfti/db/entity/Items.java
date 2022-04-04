package com.ssafy.nfti.db.entity;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "items")
public class Items {

    @Id
    private Long tokenId;

    private String itemUrl;

    private String itemTitle;

    private String itemDescription;

    private Boolean onSaleYn;

    @ManyToOne
    @JoinColumn(name="owner_address", nullable=false)
    private User owner;

    @ManyToOne
    private Community community;

    @OneToMany(mappedBy = "item")
    private List<Sales> sales;

}
