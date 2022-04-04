package com.ssafy.nfti.db.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity(name = "sales")
@EntityListeners(AuditingEntityListener.class)
public class Sales {

    @Id
    @Column(
        name = "sale_contract_address",
        nullable = false
    )
    private String saleContractAddress;

    private Boolean saleYn;

    @ManyToOne
    @JoinColumn(name="token_id", nullable=false)
    private Items item;

    @ManyToOne
    @JoinColumn(name="seller_address", nullable=false)
    private User seller;

    @ManyToOne
    @JoinColumn(name="buyer_address", nullable=true)
    private User buyer;

    @CreatedDate
    private LocalDateTime createdAt;

    private LocalDateTime completedAt;

}
