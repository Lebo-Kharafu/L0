<template>
  <div class="about">
    <div class="content-wrapper">
      <h1>Overview</h1>
      
      <p class="intro">
        The L0 is frontend task to see where I stand with regards to web dev,
        using the technologies and stack used for frontend.
      </p>

      <div class="tech-stack">
        <h2>Core Technologies Learned</h2>
        
        <div class="stack-item">
          <h3>Vue 3 Composition API</h3>
          <p>Utilizes <code>script setup</code>, reactive refs, computed properties, and lifecycle hooks (onMounted) for a clean, TypeScript-friendly codebase.</p>
        </div>

        <div class="stack-item">
          <h3>Pinia State Management</h3>
          <p>Implements a centralized store using the Model-View-Update pattern. It handles complex logic including CRUD operations, an Undo/History stack, and state hydration.</p>
        </div>

        <div class="stack-item">
          <h3>Data Persistence</h3>
          <p>Features a custom synchronization layer that bridges reactive state with LocalStorage, ensuring data integrity across page reloads and sessions.</p>
        </div>

        <div class="stack-item">
          <h3>Vue Router</h3>
          <p>Manages Single Page Application navigation with dynamic route matching for editing tasks and programmatic navigation control.</p>
        </div>
      </div>
      
      <div class="footer">
        <p>Built for skill assessment and learning.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  background-color: var(--color-background);
  color: var(--color-text);
}

.content-wrapper {
  max-width: 800px;
  width: 100%;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 1rem;
}

h2 {
  font-size: 1.8rem;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  color: var(--color-heading);
}

h3 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: var(--vt-c-indigo);
}

.intro {
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--color-text);
  margin-bottom: 2rem;
}

.stack-item {
  background-color: var(--color-background-soft);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.stack-item p {
  font-size: 1.1rem;
  line-height: 1.5;
  margin: 0;
  color: var(--color-text);
}

code {
  background-color: var(--color-background-mute);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
}

.footer {
  margin-top: 3rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--color-border-hover);
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
}

@media (max-width: 600px) {
  h1 { font-size: 2rem; }
  .stack-item { padding: 1rem; }
}
</style>