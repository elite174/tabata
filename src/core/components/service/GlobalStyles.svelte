<style lang="scss">
  @use 'styles/lib' as *;

  :global(:root) {
    --font-family: 'Rubik', sans-serif;
    --color-text: rgb(12, 12, 12);
    --color-text-secondary: rgb(92, 92, 92);
    --color-neutral: rgb(243, 243, 243);
    --color-hover: rgba(0, 0, 0, 0.1);
    --color-active: rgba(59, 133, 230, 0.3);
    --color-background: rgb(238, 238, 238);
    --color-panel: rgb(230, 230, 230);

    --color-accent: rgb(60, 151, 211);
    --color-accent-supply: white;
    --color-disabled: rgb(182, 182, 182);
    --color-error: rgb(219, 47, 47);

    --box-shadow: 0 6px 40px rgba(0, 0, 0, 0.07);
    --border-radius: #{px(12)};
  }

  :global(body) {
    margin: 0;

    background-color: var(--color-background);
    color: var(--color-text);
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  :global(button) {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;

    &:disabled {
      cursor: revert;
    }
  }
</style>
