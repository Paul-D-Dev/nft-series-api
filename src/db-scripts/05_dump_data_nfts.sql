INSERT INTO `nfts` (`type_id`, `name`, `contract_address`, `image_id`, `name_seo`, `description`,
                    `created_at`, `updated_at`, `character_id`, `season`, `moment`, `production_id`, `creator_id`,
                    `current_owner_id`, `is_tradeable`, `floor_price`, `current_sale_price`, `top_price`,
                    `last_sale_price`, `total_sales`, `token_id`, `chain`, `currency`)
VALUES ('1', 'Joey', '0x32973908FaeE0Bf825A343000fE412ebE56F802A', NULL, 'Joey Friends',
        'This character is roled by Joey', now(), NULL, NULL, NULL,
        NULL, '1', '1', '1', '1', NULL, '0.1', NULL, NULL, '0', NULL, 'ETH', 'ETH');
