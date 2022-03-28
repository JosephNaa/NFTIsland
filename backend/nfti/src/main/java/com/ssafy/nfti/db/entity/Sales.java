package com.ssafy.nfti.db.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Entity(name = "sales")
@EntityListeners(AuditingEntityListener.class)
public class Sales extends BaseEntity {

    @Column(
        name = "sale_contract_address",
        nullable = false
    )
    private String saleContractAddress;

    private Boolean saleYn;

    private Long tokenId;

    private String cashContractAddress;

    private String sellerAddress;

    private String buyerAddress;

    private LocalDateTime completedAt;

}
