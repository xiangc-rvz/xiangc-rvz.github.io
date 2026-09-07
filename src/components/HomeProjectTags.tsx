type HomeProjectTagsProps = {
  tags?: string[];
};

export function HomeProjectTags({ tags }: HomeProjectTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <ul className="home-project-tags project-tags-list">
      {tags.map((tag) => (
        <li key={tag} className="project-tag">
          {tag}
        </li>
      ))}
    </ul>
  );
}
