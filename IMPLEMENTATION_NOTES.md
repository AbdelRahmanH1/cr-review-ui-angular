# Implementation Notes

> Fill this in as part of your submission. 1–2 pages, bullet points are fine. Delete these
> instructions before submitting.

## 1. What I changed
 ## task 1
 - diff misclassification in **diff.ts**: The function only checked unitPrice to decide whether a line had changed. I added quantity to the comparison because changes in quantity should also count as a change.
 - Approve/Reject permissions in cr-detail.component.ts: The buttons only checked the CR status, so read-only users (cr_r_o) could still approve pending CRs. I updated both getters to also check canApprovePolicy from common/permissions.ts. I used the same permission for Reject because there is no separate reject permission.

 ## task 2
 - Status filter in cr-list.component.ts: visibleRows shows all CRs when the filter is ALL, otherwise it shows only CRs with the selected status. The original data stays unchanged.
 - No-match message in cr-list.component.html: If no CRs match the selected filter, the table is hidden and a message is shown. This is different from the empty state, where the API returns no CRs at all.

 ## task 3
 - Timeline in cr-detail.component.ts: The audit entries were shown newest first. I changed the order to oldest first and used a copy so the original data stays unchanged.
 - Approve/Reject: Both actions check permissions and prevent multiple requests at the same time. On success, I update the CR data. On failure, I show an error and keep the current data.
 - Reject validation: I made the reason required and reject blank or spaces-only input. I trim the reason before sending it and clear the field only if the request succeeds

 ## task 4
 - Approve/Reject buttons: Both buttons are always shown but disabled if the user has no permission or the CR is no longer pending. A message explains why

## 2. Component & state model
- Change Request List: Loads the current organization's CRs and displays them in a table. It handles loading, loaded, empty, and error states, with a Retry button on error. Users can filter by status and click a row to view its details.
- Change Request Detail: Loads a single CR through CrApiService, using the user from SessionService, and stores it in a ViewState<CrDetail>. The template handles each state based on state.status. Once loaded, it displays the status, baseline and new totals with the delta, a per-SKU diff table, and an approval timeline.
- Approve/Reject: Actions are available based on the CR's status and the user's permissions. Action state (submitting, actionError, and the reject-reason control) is kept separate from the loaded data.


## 3. Invariants I keep
<!-- Which properties the UI guarantees, and where in the component/template each is enforced. -->

| Invariant | How / where |
|---|---|

## 4. Testing strategy
 - List and detail tests: Checked the rendered UI, including the list rows, empty/error states, Retry button, status filter, no-match message, title, timeline order, and Approve/Reject permissions
 - Diff tests: Tested added and removed items, quantity changes, identical and empty lists, and keeping both versions of a changed item.
 - The tests use the mock API, so they don't need real network requests or long waits.
 - Not tested automatically: Approve/Reject flows, reject-reason validation, diff and totals display, loading/error states on the detail page, and the permission hint. I checked these manually instead because of the time limit

## 5. Assumptions
- I used the same permission for Reject and Approve because there is no separate reject permission in permissions.ts.
- The diff checks changes in quantity and unit price, but not description changes (like CR-2). I use the totals and delta provided by the API.
- If Approve or Reject fails, I keep the current CR data and show an error. However, the mock API may update the CR before returning an error, so reloading could show the new status.
- I kept the action buttons visible but disabled them for users who can’t approve or reject, with a message explaining why.

## 6. Where I used AI
-

## 7. What I'd improve with more time
-
