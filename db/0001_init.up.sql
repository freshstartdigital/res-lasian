  -- Verification Token Table
  CREATE TABLE verification_token
  (
    identifier TEXT NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    token TEXT NOT NULL,

    PRIMARY KEY (identifier, token)
  );

  -- Accounts Table
  CREATE TABLE accounts
  (
    id SERIAL,
    "userId" INTEGER NOT NULL,
    type VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    "providerAccountId" VARCHAR(255) NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at BIGINT,
    id_token TEXT,
    scope TEXT,
    session_state TEXT,
    token_type TEXT,

    PRIMARY KEY (id)
  );

  -- Sessions Table
  CREATE TABLE sessions
  (
    id SERIAL,
    "userId" INTEGER NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    "sessionToken" VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
  );

  -- Users Table
  CREATE TABLE users
  (
    id SERIAL,
    name VARCHAR(255),
    email VARCHAR(255),
    "emailVerified" TIMESTAMPTZ,
    image TEXT,

    PRIMARY KEY (id)
  );

  -- Organisations Table
  CREATE TABLE organisations
  (
    id SERIAL,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    contact_email VARCHAR(255),
    PRIMARY KEY (id)
  );

  -- User Organisations Mapping Table
  CREATE TABLE user_organisations
  (
    user_id INTEGER REFERENCES users(id),
    organisation_id INTEGER REFERENCES organisations(id),
    PRIMARY KEY (user_id, organisation_id)
  );

  -- Software Products Table
  CREATE TABLE software_products
  (
    id SERIAL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_monthly DECIMAL(10, 2) NOT NULL,
    price_annually DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id)
  );

  -- Organisation Subscriptions Table
  CREATE TABLE organisation_subscriptions
  (
    id SERIAL,
    organisation_id INTEGER REFERENCES organisations(id),
    software_product_id INTEGER REFERENCES software_products(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    PRIMARY KEY (id)
  );

  -- Discount Codes Table
  CREATE TABLE discount_codes
  (
    id SERIAL,
    code VARCHAR(255) NOT NULL,
    discount_percentage INTEGER NOT NULL,
    valid_from TIMESTAMPTZ NOT NULL,
    valid_until TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (id)
  );

  -- Subscription Discounts Table
  CREATE TABLE subscription_discounts
  (
    subscription_id INTEGER REFERENCES organisation_subscriptions(id),
    discount_code_id INTEGER REFERENCES discount_codes(id),
    PRIMARY KEY (subscription_id, discount_code_id)
  );

  -- Organisation Software Access Table
  CREATE TABLE organisation_software_access
  (
    organisation_id INTEGER REFERENCES organisations(id),
    software_product_id INTEGER REFERENCES software_products(id),
    access_granted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (organisation_id, software_product_id)
  );

CREATE TABLE swms
(
  id SERIAL,
  organisation_id INTEGER REFERENCES organisations(id),
  name VARCHAR(255) NOT NULL,
  swms_type VARCHAR(255) NOT NULL,
  file_name VARCHAR(255),
  file_path VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  account_email VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE swms_data
(
  id SERIAL,
  swms_id INTEGER REFERENCES swms(id),
  data JSONB,
  version INTEGER NOT NULL,
  PRIMARY KEY (id)
);


  -- Sample Insertions
  INSERT INTO organisations (id, name, address, contact_email) VALUES (1, 'Fresh Start Projects', '123 Fake Street, Sydney, NSW, 2000', 'ryan.slater@droneanalytics.com.au');
  INSERT INTO users (name, email, "emailVerified", image) VALUES ('Ryan Slater', 'ryan.slater@droneanalytics.com.au', NOW(), 'https://gravatar.com/avatar/abc123');
  INSERT INTO users (name, email, "emailVerified", image) VALUES ('Justin Keating', 'justin.keating@droneanalytics.com.au', NOW(), 'https://gravatar.com/avatar/abc123');
  INSERT INTO users (name, email, "emailVerified", image) VALUES ('George Frilingos', 'george.frilingos@freshstartprojects.com.au', NOW(), 'https://gravatar.com/avatar/abc123');
  INSERT INTO user_organisations (user_id, organisation_id) VALUES (1, 1);
  INSERT INTO user_organisations (user_id, organisation_id) VALUES (2, 1);
  INSERT INTO user_organisations (user_id, organisation_id) VALUES (3, 1);
  INSERT INTO accounts ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, id_token, scope, session_state, token_type) VALUES (1, 'credentials', 'google', '1234567890', '1234567890', '1234567890', 1234567890, '1234567890', '1234567890', '1234567890', '1234567890');
  INSERT INTO accounts ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, id_token, scope, session_state, token_type) VALUES (2, 'credentials', 'google', '1234567890', '1234567890', '1234567890', 1234567890, '1234567890', '1234567890', '1234567890', '1234567890');
  INSERT INTO accounts ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, id_token, scope, session_state, token_type) VALUES (3, 'credentials', 'google', '1234567890', '1234567890', '1234567890', 1234567890, '1234567890', '1234567890', '1234567890', '1234567890');
  INSERT INTO software_products (id, name, description, price_monthly, price_annually) VALUES (1, 'SWMS Generator', 'SWMS Generator is a software product that helps you streamline your SWMS generation', 10.00, 100.00);
  INSERT INTO organisation_subscriptions (id, organisation_id, software_product_id, start_date, end_date) VALUES (1, 1, 1, NOW(), NOW() + INTERVAL '1 year');
  INSERT INTO organisation_software_access (organisation_id, software_product_id, access_granted) VALUES (1, 1, TRUE);
  INSERT INTO discount_codes (id, code, discount_percentage, valid_from, valid_until) VALUES (1, 'TESTCODE', 50, NOW(), NOW() + INTERVAL '1 year');

