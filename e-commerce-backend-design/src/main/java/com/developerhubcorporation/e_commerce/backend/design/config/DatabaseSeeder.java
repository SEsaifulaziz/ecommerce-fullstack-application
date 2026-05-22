package com.developerhubcorporation.e_commerce.backend.design.config;

import com.developerhubcorporation.e_commerce.backend.design.model.Product;
import com.developerhubcorporation.e_commerce.backend.design.model.Role;
import com.developerhubcorporation.e_commerce.backend.design.repository.ProductRepository;
import com.developerhubcorporation.e_commerce.backend.design.repository.RoleRepository;
import com.developerhubcorporation.e_commerce.backend.design.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DatabaseSeeder implements CommandLineRunner {

    private final ProductRepository productRepo;
    private final RoleRepository roleRepo;

    @Override
    public void run(String... args) throws Exception {

        if (roleRepo.findByName("ROLE_USER").isEmpty()){
            roleRepo.save(new Role("ROLE_USER"));
        }

        if (roleRepo.findByName("ROLE_ADMIN").isEmpty()){
            roleRepo.save(new Role("ROLE_ADMIN"));
        }

        if(productRepo.count() == 0) {


            log.info("MySQL product table is empty. Initializing SQL seed data...");

            List<Product> initialProducts = Arrays.asList(
                    save("Wireless Mechanical Keyboard", 89.99, "Electronics", "RGB backlit mechanical keyboard with blue switches.", "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef", 45),
                    save("Bluetooth Noise-Canceling Headphones", 149.99, "Electronics", "Over-ear wireless headphones with premium sound quality.", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", 30),
                    save("Ergonomic Office Chair", 249.50, "Furniture", "High-back mesh chair designed for long coding sessions.", "https://images.unsplash.com/photo-1505797149-43b0069ec26b", 12),
                    save("Minimalist Leather Wallet", 35.00, "Accessories", "Slim RFID-blocking leather wallet for everyday carry.", "https://images.unsplash.com/photo-1627123424574-724758594e93", 100),
                    save("Stainless Steel Water Bottle", 24.99, "Accessories", "Vacuum insulated flask keeping drinks cold for 24 hours.", "https://images.unsplash.com/photo-1602143407151-7111542de6e8", 75),
                    save("Vintage Denim Jacket", 65.00, "Apparel", "Classic blue jean jacket with a relaxed regular fit.", "https://images.unsplash.com/photo-1576995853123-5a10305d93c0", 25),
                    save("Running Sports Shoes", 110.00, "Apparel", "Lightweight breathable sneakers with high arch support.", "https://images.unsplash.com/photo-1542291026-7eec264c27ff", 40),
                    save("4K Ultra-Wide Monitor", 399.99, "Electronics", "34-inch curved display perfect for multi-window multitasking.", "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf", 8),
                    save("Smart Fitness Watch", 129.95, "Electronics", "Waterproof fitness tracker tracking heart rate and sleep cycles.", "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1", 55),
                    save("Canvas Travel Backpack", 49.99, "Accessories", "Heavy-duty vintage backpack with a padded laptop sleeve.", "https://images.unsplash.com/photo-1553062407-98eeb64c6a62", 60)
            );

            productRepo.saveAll(initialProducts);
            log.info("Successfully seeded {} products into the database.", initialProducts.size());
        }
    }

    // Quick helper method to construct product entities cleanly
    private Product save(String name, Double price, String category, String description, String image, Integer stock) {
        Product p = new Product();
        p.setName(name);
        p.setPrice(price);
        p.setCategory(category);
        p.setDescription(description);
        p.setImage(image);
        p.setStock(stock);
        return p;
    }
}