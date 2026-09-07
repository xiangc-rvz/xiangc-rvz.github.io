type WorkflowStripBlock = {
  type: "workflowStrip";
  caption: string;
  steps: { title: string; body: string }[];
};

type Props = {
  block: WorkflowStripBlock;
};

export function WorkflowStripDiagram({ block }: Props) {
  return (
    <figure className="workflow-strip-wrap">
      <div className="workflow-strip-scroll">
        <div className="workflow-strip" role="list">
          {block.steps.map((step, index) => (
            <div key={step.title} className="workflow-strip-unit" role="listitem">
              <article className="workflow-strip-card">
                <h3 className="workflow-strip-title">
                  <span className="workflow-strip-index" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className="workflow-strip-name">{step.title}</span>
                </h3>
                <p className="workflow-strip-body">{step.body}</p>
              </article>
              {index < block.steps.length - 1 ? (
                <span className="workflow-strip-arrow" aria-hidden="true">
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="project-inline-caption">{block.caption}</figcaption>
    </figure>
  );
}
