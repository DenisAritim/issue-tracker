const { PrismaClient, Status } = require("@prisma/client");

const prisma = new PrismaClient();

const openIssues = [
  {
    title: "Dashboard cards do not refresh after issue status update",
    description:
      "The summary totals remain stale until the page is hard-refreshed, even though the issue list updates correctly after editing an issue.",
    status: Status.OPEN,
  },
  {
    title: "Assignee dropdown closes before user selection is saved",
    description:
      "On slower connections the assignee menu dismisses immediately, which makes it look like the assignment failed even when the request is still in flight.",
    status: Status.OPEN,
  },
  {
    title: "Markdown preview overflows on long code blocks",
    description:
      "Issue descriptions containing fenced code snippets push the layout horizontally on smaller laptop screens instead of scrolling within the preview area.",
    status: Status.OPEN,
  },
  {
    title: "Filtering by status resets after browser back navigation",
    description:
      "Users returning from the issue detail page lose the selected filter state and are dropped back into the default all-issues view.",
    status: Status.OPEN,
  },
  {
    title: "New issue form allows submit with leading whitespace in title",
    description:
      "Titles with only spaces at the start pass client validation, which results in inconsistent formatting in the issue table and detail page.",
    status: Status.OPEN,
  },
  {
    title: "Toast notification overlaps actions on narrow screens",
    description:
      "Success messages appear directly above the action buttons on mobile-sized layouts and partially cover the edit and delete controls.",
    status: Status.OPEN,
  },
  {
    title: "Issue chart legend uses low-contrast colors in dark mode",
    description:
      "The closed and in-progress labels are difficult to read when the system theme is dark, especially on lower-brightness displays.",
    status: Status.OPEN,
  },
  {
    title: "Pagination controls disappear when search returns one page of results",
    description:
      "The page links vanish entirely after narrowing the list, which makes the layout jump and removes context about the current page.",
    status: Status.OPEN,
  },
  {
    title: "Session expiry redirects user away from unsaved edit form",
    description:
      "If authentication expires while editing an issue, the user is sent to the sign-in page without a warning and loses unsaved changes.",
    status: Status.OPEN,
  },
  {
    title: "Recently created issues are not sorted consistently on dashboard",
    description:
      "Two issues created within the same minute can appear in different orders between reloads, which makes the latest-issues widget feel unreliable.",
    status: Status.OPEN,
  },
];

const closedIssues = [
  {
    title: "Fix broken redirect after successful sign in",
    description:
      "Updated the auth callback flow so users are returned to the dashboard instead of landing on a blank intermediate page.",
    status: Status.CLOSED,
  },
  {
    title: "Prevent duplicate issue creation on double submit",
    description:
      "Disabled the submit button during mutation and added server-side protection to avoid accidental duplicate records.",
    status: Status.CLOSED,
  },
  {
    title: "Align issue table columns with summary card totals",
    description:
      "Adjusted spacing and label widths so the dashboard metrics and issue table present status data with consistent naming and alignment.",
    status: Status.CLOSED,
  },
  {
    title: "Restore missing validation message for empty descriptions",
    description:
      "Users now receive clear inline feedback when attempting to create an issue without entering a description.",
    status: Status.CLOSED,
  },
  {
    title: "Improve loading state for latest issues widget",
    description:
      "Added a skeleton state so the dashboard no longer flashes empty content while issue data is loading.",
    status: Status.CLOSED,
  },
  {
    title: "Correct issue count query for closed items",
    description:
      "Fixed the dashboard aggregate query to stop counting archived drafts as closed issues in the summary cards.",
    status: Status.CLOSED,
  },
  {
    title: "Resolve avatar fallback bug in assignee list",
    description:
      "Users without profile images now display initials consistently instead of broken image icons in the assignment menu.",
    status: Status.CLOSED,
  },
  {
    title: "Reduce layout shift on dashboard initial render",
    description:
      "Reserved chart and table space before data hydration to eliminate the jump users saw when opening the home page.",
    status: Status.CLOSED,
  },
  {
    title: "Update issue detail page heading hierarchy for accessibility",
    description:
      "Adjusted heading levels and label associations to improve screen reader navigation across the issue detail layout.",
    status: Status.CLOSED,
  },
  {
    title: "Handle deleted assignee references gracefully",
    description:
      "Issue detail pages now render an unassigned state when a previously assigned user account has been removed from the system.",
    status: Status.CLOSED,
  },
];

async function main() {
  await prisma.issue.createMany({
    data: [...openIssues, ...closedIssues],
  });

  const [openCount, closedCount] = await Promise.all([
    prisma.issue.count({ where: { status: Status.OPEN, assignedToUserId: null } }),
    prisma.issue.count({ where: { status: Status.CLOSED } }),
  ]);

  console.log(`Seed complete. Open unassigned: ${openCount}, closed: ${closedCount}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
