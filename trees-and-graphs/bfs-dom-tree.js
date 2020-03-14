function bfs(DOM) {
  const nodesByLevel = [[DOM]];
  while (true) {
    const parents = nodesByLevel[nodesByLevel.length - 1]; // [HTMLElement]
    let children = parents.flatMap(element => Array.from(element.children));
    if (children.length === 0) {
      return nodesByLevel;
    }

    nodesByLevel.push(children);
  }
}

const result = bfs(document);
console.log(result);
