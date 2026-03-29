# Mini Banking System - Transaction Management

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