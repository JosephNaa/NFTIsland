package com.ssafy.nfti.config;

import com.fasterxml.classmate.TypeResolver;
import com.ssafy.nfti.api.request.PageReq;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Pageable;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.AlternateTypeRules;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * The Class SwaggerConfig.
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    TypeResolver typeResolver = new TypeResolver();

    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
                .alternateTypeRules(
                    AlternateTypeRules.newRule(
                        typeResolver.resolve(Pageable.class), typeResolver.resolve(PageReq.class)))
                .groupName("nftIsland")
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build();

    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("NFTIsland Rest API")
                .description("<h3>NFTIsland Rest API 문서</h3>")
                .contact(new Contact("NFTIsland", "https://j6d107.p.ssafy.io", "js.pekah@gmail.com"))
                .license("MIT License")
                .version("1.0")
                .build();
    }

}
