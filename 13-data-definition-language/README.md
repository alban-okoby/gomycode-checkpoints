### Data definition language (DDL) Checkpoint

Let's create tables
```SQL
-- 1. Create the Customer Table
CREATE TABLE Customer (
    Customer_id   VARCHAR(3) PRIMARY KEY,  -- Primary Key, used for referencing
    Customer_Name VARCHAR(50) NOT NULL,
    Customer_Tel  VARCHAR(15)
);

-- 2. Create the Product Table
CREATE TABLE Product (
    Product_id   VARCHAR(3) PRIMARY KEY,
    Product_Name VARCHAR(100) NOT NULL,
    Category     VARCHAR(50),
    Price        DECIMAL(10, 2)
);

-- 3. Create the Orders Table (Junction/Relationship Table)
CREATE TABLE Orders (
    Customer_id    VARCHAR(3),
    Product_id     VARCHAR(3),
    OrderDate      DATE,
    Quantity       INT NOT NULL,
    Total_amount   DECIMAL(10, 2) NOT NULL,
    
    -- Define the Composite Primary Key (PK is a combination of Customer_id and Product_id)
    PRIMARY KEY (Customer_id, Product_id), 
    
    -- Define Foreign Key constraints
    FOREIGN KEY (Customer_id) REFERENCES Customer(Customer_id),
    FOREIGN KEY (Product_id)  REFERENCES Product(Product_id)
);
``` 

After that, let's do our works
1. Add a column Category (VARCHAR2(20)) to the PRODUCT table. 
2. Add a column OrderDate (DATE)  to the ORDERS table which have SYSDATE as a default value.

```SQL
-- 1. Add a column Category to the PRODUCT table
ALTER TABLE Product
ADD Category VARCHAR(20);

-- 2. Add a column OrderDate (DATE) to the ORDERS table which have SYSDATE as a default value

ALTER TABLE Orders
ADD OrderDate DATE DEFAULT CURRENT_DATE;
```

<img src="./ddl.jpeg" />    

### Important Notes:
I used MySQL as DBMS so : 

VARCHAR2 (used in Oracle) becomes VARCHAR in MySQL.
NUMBER becomes DECIMAL(10,2) (or INT if the values are integers).
SYSDATE (used in Oracle) becomes CURRENT_DATE or CURRENT_TIMESTAMP in MySQL, depending on whether we need just the date or the full date and time. 