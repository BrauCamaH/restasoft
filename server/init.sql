CREATE TABLE Users
(
    "id" SERIAL,
    "name" TEXT,
    "username" VARCHAR(30),
    "password" TEXT,
    "type" VARCHAR(30),
    PRIMARY KEY ("id")
);

CREATE TABLE Clients
(
    "id" SERIAL,
    "rfc" VARCHAR(40),
    "name" TEXT,
    "city" TEXT,
    "address" TEXT,
    "zipcode" VARCHAR(40),
    "colony" TEXT,
    "phone" TEXT,
    PRIMARY KEY ("id")
);

CREATE TABLE Tables
(
    "id" SERIAL,
    "code" TEXT,
    "observations" TEXT,
    PRIMARY KEY ("id")
);

CREATE TABLE Sales
(
    "id" SERIAL,
    "pay" NUMERIC(13,2),
    "total" NUMERIC(13,2),
    "start" TIMESTAMP,
    "finish" TIMESTAMP,
    "user" INT REFERENCES Users(id),
    "client" INT REFERENCES Clients(id),
    "table" INT REFERENCES Tables(id),
    PRIMARY KEY ("id")
);

CREATE TABLE Categories
(
    "id" SERIAL,
    "image" TEXT,
    "name" VARCHAR(40),
    "description" TEXT,
    PRIMARY KEY ("id")
);

CREATE TABLE Products
(
    "id" SERIAL,
    "name"TEXT,
    "description" TEXT,
    "image" TEXT,
    "price" NUMERIC(13,2),
    "category" INT REFERENCES Categories(id),
    PRIMARY KEY ("id")
);

CREATE TABLE Orders
(
    "id" SERIAL,
    "price" NUMERIC(13,2),
    "quantity" INT,
    "sale" INT REFERENCES Sales(id),
    "product" INT REFERENCES Products(id),
    PRIMARY KEY ("id")
);