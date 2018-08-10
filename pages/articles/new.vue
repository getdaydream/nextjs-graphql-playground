<template>
  <div>
    <button
      type="button"
      class="btn btn-dark">Primary</button>
    <div id="markdown-editor"/>
  </div>
</template>

<script>

export default {
  mounted() {
    import('bootstrap');
    import('codemirror/lib/codemirror.css'); // codemirror
    import('tui-editor/dist/tui-editor.css'); // editor ui
    import('tui-editor/dist/tui-editor-contents.css'); // editor content
    import('highlight.js/styles/github.css'); // code block highlight
    const el = document.getElementById('markdown-editor');
    const Editor = require('tui-editor');
    const editor = new Editor({
      el: document.getElementById('markdown-editor'),
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: '300px',
    });
    const ele = document.querySelector('.te-switch-button.wysiwyg');
    ele.textContent = 'Preview'
  },
};
</script>
