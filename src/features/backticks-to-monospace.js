import { getAllComments } from "../libs/dom-utils";
import { paths } from "../libs/paths";

function init() {
  // More refinement might be required to cater to minor exception
  const backtickRegex = /`(.*?)`/g;

  const comments = getAllComments();

  for (const comment of comments) {
    const commentSpan = comment.querySelector("div.comment span.commtext");

    // Ensure commentSpan exists before trying to modify its innerHTML
    if (commentSpan && commentSpan.innerHTML) {
      // Check if there are any backticks to avoid unnecessary replace operations
      if (commentSpan.innerHTML.includes('`')) {
        const monospacedHtml = commentSpan.innerHTML.replace(
          backtickRegex,
          "<code>$1</code>"
        );
        // Only update if the content actually changed to avoid potential reflows
        if (commentSpan.innerHTML !== monospacedHtml) {
          commentSpan.innerHTML = monospacedHtml;
        }
      }
    }
  }

  return true;
}

const details = {
  id: "backticks-to-monospace",
  pages: {
    include: [...paths.comments, ...paths.specialComments],
    exclude: [],
  },
  loginRequired: false,
  init,
};

export default details;