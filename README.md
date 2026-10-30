# Paid test: Northside Ice price bot ($100)

This is a tiny version of the price logic in our Instagram DM bot. The client and the prices are made up. The rule is the same as ours: **the bot never guesses a price. If it can't price exactly what the customer asked for, it holds the message for a person.**

Setup: Node 20 or newer, then `npm test`. There are no dependencies.

## 1. Fix a real customer report (required)

> A customer DM'd "how much for the bottom 6?" on our honeycomb ad. The bot replied with the full 6x6 set price, $6,900. They only want one row: 6 teeth on the bottom. The price book has a price for that.

1. Write a test that fails on exactly this message.
2. Fix the code so the test passes. Every other test must still pass.
3. Open a pull request that explains what caused it and what you changed.

## 2. Find one more wrong-price risk (required)

Read the code. Find another message a real customer could send that would get a wrong or guessed price. Add a failing test for it. Fix it if you can. If you can't, explain the fix in the pull request.

## 3. One improvement (short)

In the pull request description, 3 to 5 sentences: what you would improve first in this bot, and why.

## Rules

- Use Claude Code or any AI tool you like. You must be able to explain every line you submit on a call.
- Send it within 48 hours of getting it.
- You're paid $100 on delivery.

## What we look at

- The test fails before your fix and passes after it.
- The smallest change that fixes the real problem.
- When the bot isn't sure, it holds. It never guesses.
- Clear, plain writing in the pull request.
