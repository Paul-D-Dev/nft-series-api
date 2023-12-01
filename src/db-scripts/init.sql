CREATE TABLE images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  src VARCHAR(255),
  alt VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  name_seo VARCHAR(255),
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  contract_address VARCHAR(255),
  image_id int,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE (name),
  UNIQUE (name_seo),
  FOREIGN KEY (image_id) REFERENCES images(id)
);

CREATE TABLE productions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  creator_id INT NOT NULL,
  royalty_fees INT DEFAULT 0,
  title VARCHAR(60) NOT NULL,
  name_seo VARCHAR(255),
  release_year year(4),
  image_id int,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (creator_id) REFERENCES users(id),
  FOREIGN KEY (image_id) REFERENCES images(id)
);

CREATE TABLE available_social_networks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE social_networks (
  social_network_id INT NOT NULL,
  user_id INT NOT NULL,
  profile_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE (user_id, social_network_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (social_network_id) REFERENCES available_social_networks(id)
);

CREATE TABLE nft_types (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(15) NOT NULL
);

CREATE TABLE nfts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  contract_address VARCHAR(255) not null,
  image_id int,
  name_seo VARCHAR(255),
  description TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  character_id INT,
  season VARCHAR(50),
  moment VARCHAR(50),
  production_id INT,
  creator_id INT,
  current_owner_id INT,
  is_tradeable BOOLEAN DEFAULT TRUE,
  floor_price DECIMAL(18, 2),
  current_sale_price DECIMAL(18, 2),
  top_price DECIMAL(18, 2),
  last_sale_price DECIMAL(18, 2),
  total_sales INT DEFAULT 0,
  token_id VARCHAR(255),
  chain VARCHAR(40),
  currency VARCHAR(40),
  FOREIGN KEY (character_id) REFERENCES nfts(id),
  FOREIGN KEY (production_id) REFERENCES productions(id),
  FOREIGN KEY (creator_id) REFERENCES users(id),
  FOREIGN KEY (current_owner_id) REFERENCES users(id),
  FOREIGN KEY (type_id) REFERENCES nft_types(id),
  FOREIGN KEY (image_id) REFERENCES images(id)
);

CREATE TABLE ownerships (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nft_id INT,
  owner_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (nft_id) REFERENCES nfts(id),
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nft_id INT,
  seller_id INT,
  buyer_id INT,
  sale_price DECIMAL(18, 2),
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (nft_id) REFERENCES nfts(id),
  FOREIGN KEY (seller_id) REFERENCES users(id),
  FOREIGN KEY (buyer_id) REFERENCES users(id)
);
