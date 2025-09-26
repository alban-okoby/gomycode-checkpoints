### Data query language (DQL)

1. Display all the data of customers 

```SQL
SELECT *
FROM Customer;
```


2. Display the product_name and category for products which their price is between 5000 and 10000

```SQL
SELECT product_name, category
FROM Product
WHERE Price BETWEEN 5000 AND 10000;
```

3. Display all the data of products sorted in descending order of price
```SQL
SELECT *
FROM Product
ORDER BY Price DESC;
```

4. Display the total number of orders, the average amount, the highest total amount and the lower total amountFor each product_id, display the number of orders
```SQL
SELECT
    COUNT(*) AS TotalOrders,
    AVG(Total_amount) AS AverageAmount,
    MAX(Total_amount) AS HighestAmount,
    MIN(Total_amount) AS LowestAmount
FROM Orders;
```

5. Display the customer_id which has more than 2 orders   
```SQL
SELECT
    Customer_id
FROM Orders
GROUP BY Customer_id
HAVING COUNT(*) > 2;
```

6. For each month of the 2020 year, display the number of orders
```SQL
SELECT
    DATE_FORMAT(OrderDate, '%Y-%m') AS OrderMonth,
    COUNT(*) AS NumberOfOrders
FROM Orders
WHERE YEAR(OrderDate) = 2020
GROUP BY OrderMonth
ORDER BY OrderMonth;
```

7. For each order, display the product_name, the customer_name and the date of the order
```SQL
SELECT
    C.Customer_Name,
    P.Product_Name,
    O.OrderDate
FROM Orders O
JOIN Customer C ON O.Customer_id = C.Customer_id
JOIN Product P ON O.Product_id = P.Product_id
ORDER BY O.OrderDate;
```

8. Display all the orders made three months ago
```SQL
SELECT *
FROM Orders
WHERE OrderDate < DATE_SUB(CURDATE(), INTERVAL 3 MONTH);
```

9. Display customers (customer_id) who have never ordered a product
```SQL
SELECT
    Customer_id,
    Customer_Name
FROM Customer
WHERE Customer_id NOT IN (SELECT DISTINCT Customer_id FROM Orders);
```


### RESUME OF DQL : 
- The Data Query Language provides queries to retrieve data from one or more tables
- The main clause provided by the DQL is the `SELECT` statement.
- `Select` and `from` clauses are mandatory is a select statement
- We use single and multiple rows functions to retrieve data from tables.
- There are different `types of join` provided to link several tables based on join conditions