# Bills Module

## Financial Calculation Strategy

The backend acts as the absolute source of truth for all financial calculations in the Bills module.

**If `bill_items` exist:**
- `line_total = quantity × unit_price` (calculated individually per item)
- `subtotal = Σ(line_total)`
- `total_amount = subtotal + tax_amount − discount_amount`

Any `total_amount` or `total_price` provided by the frontend in this scenario is strictly ignored. The backend recalculates everything before insertion to guarantee data integrity.

**If `bill_items` are absent:**
- The module relies on the provided `total_amount`.
- This is intentional to support bills that do not contain individual line items (e.g., utility bills, toll receipts, parking, fuel).

## Future Transaction Note

Currently, the implementation performs sequential inserts (creating a bill, then iterating to create bill items). This is because Supabase JS does not support multi-table transactions directly in a single client call without custom functions.

**Limitation Documented:** Do not attempt to implement multi-table transactions via the JS client alone.

**Future Recommendation:**
For a fully atomic operation, create a PostgreSQL RPC function that wraps the operations:
```sql
BEGIN
  Insert Bill
  Insert Bill Items
  Insert Bill Tags
  Insert Activity Log
COMMIT
```
This future enhancement should be documented only and should not be implemented until the corresponding scaling phase.
