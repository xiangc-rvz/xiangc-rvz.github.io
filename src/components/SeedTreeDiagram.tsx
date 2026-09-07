type SeedTreeBlock = {
  type: "seedTree";
  caption: string;
  root: string;
  midLeft: string;
  midCenter: string;
  midRight: string;
  queriesLabel: string;
  top: string;
};

type Props = {
  block: SeedTreeBlock;
};

export function SeedTreeDiagram({ block }: Props) {
  return (
    <figure className="seed-tree-wrap">
      <div className="seed-tree" aria-hidden="false">
        <div className="seed-tree-node seed-tree-top">{block.top}</div>
        <div className="seed-tree-join seed-tree-join-up" aria-hidden="true">
          <span>↗</span>
          <span>↑</span>
          <span>↖</span>
        </div>
        <div className="seed-tree-row">
          <div className="seed-tree-node">{block.queriesLabel}</div>
          <div className="seed-tree-node">{block.queriesLabel}</div>
          <div className="seed-tree-node">{block.queriesLabel}</div>
        </div>
        <div className="seed-tree-join seed-tree-join-up" aria-hidden="true">
          <span>↗</span>
          <span>↑</span>
          <span>↖</span>
        </div>
        <div className="seed-tree-row">
          <div className="seed-tree-node">{block.midLeft}</div>
          <div className="seed-tree-node">{block.midCenter}</div>
          <div className="seed-tree-node">{block.midRight}</div>
        </div>
        <div className="seed-tree-join seed-tree-join-down" aria-hidden="true">
          <span>↖</span>
          <span>↑</span>
          <span>↗</span>
        </div>
        <div className="seed-tree-node seed-tree-root">
          <span className="seed-tree-emoji" aria-hidden="true">
            🌱
          </span>
          {block.root}
        </div>
      </div>
      <figcaption className="project-inline-caption">{block.caption}</figcaption>
    </figure>
  );
}
