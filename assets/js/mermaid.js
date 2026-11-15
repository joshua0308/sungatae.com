const diagrams = [...document.querySelectorAll('pre.mermaid')];

if (diagrams.length) {
  // Keep the source available for theme changes and failed renders.
  const sources = new Map(diagrams.map((node) => [node, node.textContent]));
  try {
    const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@12.3.0/dist/mermaid.esm.min.mjs');
    await document.fonts.ready;
    let pending = Promise.resolve();
    const render = () => {
      // Serialize renders so a theme change cannot interrupt an active render.
      pending = pending.then(async () => {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'default',
        });
        for (const node of diagrams) {
          node.textContent = sources.get(node);
          node.removeAttribute('data-processed');
          try {
            await mermaid.run({ nodes: [node] });
          } catch (error) {
            node.textContent = sources.get(node);
            console.error('Unable to render Mermaid diagram:', error);
          }
        }
      });
    };
    new MutationObserver(render).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    render();
  } catch (error) {
    console.error('Unable to load Mermaid:', error);
  }
}
