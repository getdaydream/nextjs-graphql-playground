<template>
  <div>
    <div id="markdown-editor"/>
  </div>
</template>

<script>
export default {
  mounted() {
    require('codemirror/lib/codemirror.css'); // codemirror
    require('tui-editor/dist/tui-editor.css'); // editor ui
    require('tui-editor/dist/tui-editor-contents.css'); // editor content
    require('highlight.js/styles/github.css'); // code block highlight
    const el = document.getElementById('markdown-editor');
    const Editor = require('tui-editor');
    const editor = new Editor({
      el: document.getElementById('markdown-editor'),
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: '300px',
    });
  },
};
</script>

<style>
</style>
