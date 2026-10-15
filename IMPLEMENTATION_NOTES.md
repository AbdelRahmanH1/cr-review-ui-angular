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

## 2. Component & state model
- Change Request List: Loads the current organization's CRs and displays them in a table. It handles loading, loaded, empty, and error states, with a Retry button on error. Users can filter by status and click a row to view its details.
- Change Request Detail: Loads a single CR through CrApiService, using the user from SessionService, and stores it in a ViewState<CrDetail>. The template handles each state based on state.status. Once loaded, it displays the status, baseline and new totals with the delta, a per-SKU diff table, and an approval timeline.
- Approve/Reject: Actions are available based on the CR's status and the user's permissions. Action state (submitting, actionError, and the reject-reason control) is kept separate from the loaded data.


## 3. Invariants I keep
<!-- Which properties the UI guarantees, and where in the component/template each is enforced. -->

| Invariant | How / where |
|---|---|

## 4. Testing strategy
<!-- What you tested (component/DOM vs pure) and why; what you deliberately skipped given the budget. -->

-

## 5. Assumptions
<!-- Where the requirements left room for interpretation, the calls you made and why. -->

-

## 6. Where I used AI
-

## 7. What I'd improve with more time
-
