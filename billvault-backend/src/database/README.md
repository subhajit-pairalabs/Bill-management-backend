# BillVault Database Architecture

This directory contains the entire relational schema, index configurations, security policies, and migration runner for the BillVault PostgreSQL database.

## 1. Migration Order
Migrations are strictly ordered using zero-padded prefixes (e.g., `001_`, `002_`). They must be executed sequentially. The custom migration runner (`run.js`) guarantees this by alphabetically sorting files and comparing them against the `schema_migrations` tracking table.

## 2. Rollback Strategy
Currently, rollbacks are handled manually or through a restore-from-backup process in production. In development, you can drop the schema or rebuild the container. A strict forward-only migration policy is highly recommended; instead of rolling back, create a new migration to reverse the changes (e.g., `018_revert_add_column.sql`).

## 3. Naming Conventions
- **Tables and Columns**: `snake_case` (e.g., `bill_items`, `created_at`).
- **Migration Files**: `{sequence}_{description}.sql` (e.g., `004_bills.sql`).
- **Primary Keys**: Always `id`.
- **Foreign Keys**: `{table_singular}_id` (e.g., `user_id`, `bill_id`).

## 4. UUID Strategy
We exclusively use `UUID` (v4) for all primary keys. Sequences (`SERIAL`) are strictly avoided to prevent enumeration attacks, simplify data merging, and ensure true distributed global uniqueness across the SaaS platform.

## 5. Foreign Key Strategy
Foreign keys are strictly enforced. We utilize:
- `ON DELETE CASCADE` for strong ownership (e.g., deleting a Bill automatically deletes its Bill Items and Attachments).
- `ON DELETE SET NULL` for global taxonomies (e.g., if a Merchant is deleted, the `merchant_id` on the Bill becomes NULL rather than deleting the user's financial record).

## 6. Index Strategy
B-Tree indexes are created (via `indexes.sql`) for heavily queried columns that do not have implicit indexes. 
- Primary Keys and `UNIQUE` constraints are indexed automatically by Postgres.
- We manually index Foreign Keys (`user_id`, `bill_id`) and high-cardinality search fields (`invoice_number`, `purchase_date`, `created_at`).

## 7. RLS (Row Level Security) Strategy
Row Level Security is enabled on every business table. 
- All data access must evaluate to `TRUE` based on the current session's `auth.uid()`.
- Modification policies (`UPDATE`, `INSERT`) use `WITH CHECK` to ensure the mutated row conforms to the same ownership constraints, preventing users from altering records they own to point to records they do not own.

## 8. Seed Strategy
Seed files (`seeds/`) are used to populate the database with default global data (Categories, Tags) required for the application to function. They use `INSERT ... ON CONFLICT DO NOTHING` to ensure idempotency.

## 9. Soft Delete Strategy
Only the `bills` table implements a `deleted_at` column. This allows users to move bills to a "Trash" state for potential recovery. Detail tables (like `bill_items` or `reminders`) rely on hard deletes cascading from the parent bill when a permanent deletion is triggered.

## 10. Storage Strategy
Raw files (PDFs, images) are NEVER stored in Postgres. The database only tracks the `bucket_name` and `storage_path` in the `attachments` table. RLS policies on the Supabase Storage buckets ensure that users can only access paths matching their UUID.

## 11. Development Workflow
1. Ensure `.env` is populated with a local or dev `DATABASE_URL`.
2. Run `npm run migrate` (executes `run.js`).
3. Run `npm run seed`.
4. Iterate schemas by adding new `xxx_filename.sql` files.

## 12. Production Workflow
1. Migrations are executed via CI/CD pipelines before application deployment.
2. The `DATABASE_URL` uses pooled connections.
3. The migration runner detects `NODE_ENV=production` and strictly enforces `ssl: { rejectUnauthorized: true }`.
4. If a checksum mismatch occurs on an executed migration, the runner forcefully halts to prevent production schema corruption.
