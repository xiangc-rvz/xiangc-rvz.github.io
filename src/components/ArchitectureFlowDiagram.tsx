type FlowNode = {
  title: string;
  subtitle?: string;
  emphasize?: boolean;
};

export type ArchitectureFlowBlock = {
  type: "architectureFlow";
  caption: string;
  realWorld: string;
  inputs: FlowNode[];
  /** Passed along the arrow after AI Understanding (not a boxed step). */
  transferLabel: string;
  stages: FlowNode[];
  branch: {
    left: FlowNode[];
    right: FlowNode;
  };
  loopNote: string;
};

type Props = {
  block: ArchitectureFlowBlock;
};

function Node({ title, subtitle, emphasize }: FlowNode) {
  return (
    <div className={`arch-flow-node${emphasize ? " is-emphasize" : ""}`}>
      <span className="arch-flow-node-title">{title}</span>
      {subtitle ? <span className="arch-flow-node-sub">{subtitle}</span> : null}
    </div>
  );
}

function Connector({ label }: { label?: string }) {
  return (
    <div className={`arch-flow-connector${label ? " has-label" : ""}`}>
      <div className="arch-flow-arrow" aria-hidden="true">
        <span className="arch-flow-arrow-stem" />
        <span className="arch-flow-arrow-head" />
      </div>
      {label ? <span className="arch-flow-edge-label">{label}</span> : null}
    </div>
  );
}

export function ArchitectureFlowDiagram({ block }: Props) {
  const { branch, stages } = block;
  const [aiStage, ...afterAi] = stages;
  const midStages = afterAi.slice(0, -1);
  const finalStage = afterAi[afterAi.length - 1];
  const [firstLeft, ...restLeft] = branch.left;

  return (
    <figure className="arch-flow-wrap">
      <div className="arch-flow">
        <div className="arch-flow-band">{block.realWorld}</div>

        <div className="arch-flow-inputs">
          {block.inputs.map((input) => (
            <Node key={input.title} {...input} />
          ))}
        </div>

        <div className="arch-flow-input-arrows" aria-hidden="true">
          {block.inputs.map((input) => (
            <Connector key={`${input.title}-arrow`} />
          ))}
        </div>

        {aiStage ? <Node {...aiStage} /> : null}

        <Connector label={block.transferLabel} />

        {midStages.map((stage) => (
          <div key={stage.title} className="arch-flow-stack">
            <Node {...stage} />
            <Connector />
          </div>
        ))}

        {finalStage ? <Node {...finalStage} /> : null}

        <div className="arch-flow-split">
          <div className="arch-flow-split-left">
            <Connector />
            {firstLeft ? <Node {...firstLeft} /> : null}
            {restLeft.map((node) => (
              <div key={node.title} className="arch-flow-stack">
                <Connector />
                <Node {...node} />
              </div>
            ))}
          </div>
          <div className="arch-flow-split-right">
            <Connector />
            <Node {...branch.right} />
          </div>
        </div>

        <p className="arch-flow-loop">{block.loopNote}</p>
      </div>
      <figcaption className="project-inline-caption">{block.caption}</figcaption>
    </figure>
  );
}
