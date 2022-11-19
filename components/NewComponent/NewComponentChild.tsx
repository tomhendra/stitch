/*
  A sub-component used exclusively by
  NewComponent.tsx (or other components in
  this directory).
*/

function NewComponentChild({ count }: { count: number }) {
  return <span>The count is {count}</span>;
}

export { NewComponentChild };
