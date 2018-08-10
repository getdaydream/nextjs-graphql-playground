<template>
  <div>
    <nuxt/>
  </div>
</template>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: rgb(39, 40, 56);
  color: #bcc0cc;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.card {
  padding: 20px;
  background-color: #2c2c41;
  border-radius: 1px;
}

.shadow {
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
}
</style>
