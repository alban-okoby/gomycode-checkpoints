export class FineStrategy {
    calculate(transaction, strategy) {
        return strategy(transaction);
    }
}

// Example strategies
export const simpleFine = (transaction) => {
    if (!transaction.returnDate) return 0;
    const daysLate = Math.floor((transaction.returnDate - transaction.issueDate) / (1000*60*60*24)) - 14;
    return daysLate > 0 ? daysLate * 1 : 0; // $1 per late day
};

export const premiumFine = (transaction) => {
    if (!transaction.returnDate) return 0;
    const daysLate = Math.floor((transaction.returnDate - transaction.issueDate) / (1000*60*60*24)) - 14;
    return daysLate > 0 ? daysLate * 2 : 0; // $2 per late day
};
