package com.fuelapp.config;

import jakarta.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.*;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.*;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = "com.fuelapp.dmt.repository", // DMT-specific repos
        entityManagerFactoryRef = "dmtEntityManager",
        transactionManagerRef = "dmtTransactionManager"
)
public class DMTDBConfig {

    @Bean(name = "dmtDataSource")
    @ConfigurationProperties(prefix = "app.second.datasource")
    public DataSource dmtDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "dmtEntityManager")
    public LocalContainerEntityManagerFactoryBean dmtEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("dmtDataSource") DataSource dataSource) {
        return builder
                .dataSource(dataSource)
                .packages("com.fuelapp.dmt.model") // Adjust entity path
                .persistenceUnit("dmt")
                .build();
    }

    @Bean(name = "dmtTransactionManager")
    public PlatformTransactionManager dmtTransactionManager(
            @Qualifier("dmtEntityManager") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}
