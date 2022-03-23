package com.ssafy.nfti.db.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

@Getter
@Setter
@Entity(name = "sales")
public class Sales extends BaseEntity {

    @Column(
        name = "sale_contract_address",
        nullable = false
    )
    private String saleContractAddress;

    private Boolean saleYn;

    private Long saleId;

    private Long tokenId;

    private String cashContractAddress;

    private String sellerAddress;

    private String buyerAddress;

    @CreatedDate
    private LocalDateTime createdAt;

    private LocalDateTime completedAt;

}
