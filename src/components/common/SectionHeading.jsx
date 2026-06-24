/**
 * Shared section heading used at the top of every content page:
 *   <div class="sh-tag">TAG</div>
 *   <h2>TITLE <em>EMPHASIS</em></h2>
 *
 * Both parts carry the `.rv` scroll-reveal class so they animate in
 * via the page's <Reveal> wrapper / useReveal hook.
 */
export default function SectionHeading({ tag, title, emphasis }) {
  return (
    <div className="sh">
      <div className="sh-tag rv">{tag}</div>
      <h2 className="rv d1">
        {title} {emphasis ? <em>{emphasis}</em> : null}
      </h2>
    </div>
  );
}
