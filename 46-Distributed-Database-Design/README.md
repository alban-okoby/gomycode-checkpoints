# Mini Banking System - Transaction Management

## PART I: Transaction Management (Conceptual)

## Overview
This module simulates transaction management for a mini banking system where users can:
- Transfer money between accounts
- View account balances

It focuses on handling **concurrent transactions** to prevent data inconsistencies.

---

## Concurrency Issue
When two users simultaneously initiate transfers involving the same account, the following issue can occur:

- **Lost Update**:  
  If two transactions read the same balance and update it concurrently, one update may overwrite the other, leading to incorrect balances.

---

## Locking Strategy
To prevent lost updates, we implement **pessimistic locking**:

- **Exclusive Lock (X-Lock)**:  
  - Before modifying an account balance, a transaction acquires an exclusive lock.  
  - Other transactions attempting to access this account must wait until the lock is released.

- **Why Pessimistic Locking?**  
  - Bank transfers are **critical operations** where conflicts can cause financial inconsistencies.  
  - Pessimistic locking prevents conflicts before they occur, ensuring data integrity.

---

## Transaction Schedule Example

Assume:

- **T1**: User 1 transfers $100 from Account A  
- **T2**: User 2 transfers $50 from Account A

| Step | Transaction | Operation             | Lock        | Safe? |
|------|------------|---------------------|------------|-------|
| 1    | T1         | Read balance of A    | X-lock     | ✅    |
| 2    | T2         | Read balance of A    | Wait       | ✅    |
| 3    | T1         | Update balance of A  | X-lock held| ✅    |
| 4    | T1         | Release lock         | -          | ✅    |
| 5    | T2         | Read balance of A    | X-lock     | ✅    |
| 6    | T2         | Update balance of A  | X-lock held| ✅    |
| 7    | T2         | Release lock         | -          | ✅    |

**Outcome:**  
The schedule is **safe**; no lost updates occur.

---

## Summary
- **Concurrency Issue:** Lost update  
- **Lock Type:** Exclusive (X-lock)  
- **Locking Strategy:** Pessimistic locking  
- **Result:** Prevents simultaneous updates, ensuring account balances remain consistent.


## Part II: Distributed Database Planning (High-Level)
The focus is on:
- Horizontal and vertical fragmentation
- Data replication
- Allocation strategies for transaction history

---

## 1. Horizontal Fragmentation

**Strategy:** Split tables based on **rows** (branch location).  

Example: Customers table  

| Fragment           | Criteria            |
|------------------|-------------------|
| Customers_Tunis    | branch = 'Tunis'  |
| Customers_Sousse   | branch = 'Sousse' |
| Customers_Sfax     | branch = 'Sfax'   |

- Each fragment contains **only customers for that branch**.
- Improves **local query performance** and reduces network load.

---

## 2. Vertical Fragmentation

**Strategy:** Split tables based on **columns**.  

Example: Separate sensitive login info  

| Table               | Columns                               |
|--------------------|---------------------------------------|
| Customers (main)    | CustomerID (PK), Name, Branch         |
| Customer_Login      | CustomerID (PK/FK), Email, PasswordHash |

- Enhances **security** and **performance**.
- Primary key is included in all fragments to allow reconstruction.

---

## 3. Data Replication

**Which data to replicate across all branches:**  

| Data Type           | Replication Strategy       | Reason |
|-------------------|--------------------------|--------|
| Account balances   | Full replication          | Must be consistent for transfers between branches |
| Customer info      | Optional/partial          | Useful for cross-branch services |
| Transaction history| Partial/dynamic           | Large volume; replicated based on access patterns |

- **Full replication** for critical, frequently accessed data ensures **high availability**.
- Transaction history is **not fully replicated** to save storage and reduce network traffic.

---

## 4. Allocation Strategy for Transaction History

- **Dynamic allocation** recommended:  
  - Transaction history grows frequently and access patterns vary across branches.  
  - Fragments are stored **locally** per branch and can be **replicated dynamically** if needed.  
  - Reduces storage overhead and improves performance.

---

## Summary Table

| Aspect                        | Strategy / Notes |
|--------------------------------|----------------|
| Horizontal fragmentation        | Split Customers table by branch |
| Vertical fragmentation          | Move login info to separate table |
| Replication                     | Account balances: full; Customer info: partial; Transaction history: dynamic |
| Transaction history allocation  | Dynamic allocation for growth & efficiency |

---

## Notes

- Combining **fragmentation and replication** allows the system to handle **local queries efficiently** while maintaining **global consistency** for critical data.  
- The design supports scalability, branch autonomy, and reduces network congestion for cross-branch operations.