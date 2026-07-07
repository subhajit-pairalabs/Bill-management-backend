# Family Vault RBAC Architecture

The current implementation of `shared_bills` provides simple binary access (users can read bills shared with their family). As the BillVault application scales, a more robust Role-Based Access Control (RBAC) model will be required to handle granular permissions.

## Future RBAC Model Roles

The following roles will be implemented within the `family_members` table and inherited contextually when interacting with family resources:

1. **Owner**
   - The creator of the Family Group.
   - Has absolute control over the family group and all resources shared within it.
   - Can delete the family group.
   - Can promote/demote Admins.
   - Can force-remove any shared bill from the family vault.

2. **Admin**
   - Can invite new members to the family group.
   - Can remove Members and Viewers from the group.
   - Can manage (edit/delete) all bills shared with the family group (acting as an Editor on all shared resources).

3. **Editor**
   - Can view all bills shared with the family group.
   - Can edit metadata (tags, categories, notes) of bills shared with the family group.
   - Cannot manage family memberships.
   - Cannot delete bills owned by others.

4. **Viewer**
   - Can only `SELECT` (read) bills shared with the family group.
   - Cannot modify any shared bills, tags, or notes.
   - Cannot invite or remove family members.

## Implementation Strategy

When implemented, the Database RLS policies will need to join against the `family_members.role` column to dynamically compute `UPDATE`, `INSERT`, and `DELETE` access on shared resources. 

For example, an `UPDATE` policy on `bills` will verify if the user is an `Admin` or `Editor` in any family group that the bill is currently shared with.
