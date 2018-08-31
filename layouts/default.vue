<template>
  <div>
    <!-- https://bulma.io/documentation/components/navbar/ -->
    <nav
      class="navbar has-shadow is-fixed-top">
      <div class="container">
        <!-- the left side, always visible, which usually contains the logo and optionally some links or icons -->
        <div class="navbar-brand">

          <!-- The navbar-burger is a hamburger menu that only appears on mobile.  -->
          <a
            :class="{'is-active': isMenuOpen}"
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            @click="isMenuOpen = !isMenuOpen">
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
          </a>
        </div>
        <!-- the right side, hidden on touch devices, visible on desktop -->
        <div
          :class="{'is-active': isMenuOpen}"
          class="navbar-menu"
          @click="isMenuOpen = false">
          <div class="navbar-start">
            <nuxt-link
              to="/"
              class="navbar-item">
              <span class="icon has-text-primary">
                <i class="mdi mdi-home mdi-24px"/>
              </span>
              <span>首页</span>
            </nuxt-link>
            <nuxt-link
              to="/article"
              class="navbar-item">
              <span class="icon has-text-info">
                <i class="mdi mdi-book-open mdi-24px"/>
              </span>
              <span>文章</span>
            </nuxt-link>
            <nuxt-link
              to="article"
              class="navbar-item">
              <span class="icon has-text-warning">
                <i class="mdi mdi-star mdi-24px"/>
              </span>
              <span>收藏</span>
            </nuxt-link>
            <nuxt-link
              to="article"
              class="navbar-item">
              <span class="icon has-text-danger">
                <i class="mdi mdi-heart mdi-24px"/>
              </span>
              <span>收藏</span>
            </nuxt-link>
          </div>
          <div class="navbar-end"/>
        </div>
      </div>
    </nav>

    <main>
      <nuxt/>
    </main>
  </div>
</template>

<script>
/**
 * 引入 material design icons
 * https://materialdesignicons.com/
 */
import '@mdi/font/css/materialdesignicons.min.css';

export default {
  data() {
    return {

      isMenuOpen: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll(e) {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 100) {
        this.isSpaced = false;
      } else {
        this.isSpaced = true;
      }
    },
  },
};
</script>

<style lang="scss">
// 自定义主题
// https://buefy.github.io/#/documentation/customization
// Import Bulma's core
@import '~bulma/sass/utilities/_all';

// Set your colors
$primary: #3273dc;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  'white': ($white, $black),
  'black': ($black, $white),
  'light': ($light, $light-invert),
  'dark': ($dark, $dark-invert),
  'primary': ($primary, $primary-invert),
  'info': ($info, $info-invert),
  'success': ($success, $success-invert),
  'warning': ($warning, $warning-invert),
  'danger': ($danger, $danger-invert),
  'twitter': ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import '~bulma';
@import '~buefy/src/scss/buefy';

body {
  min-height: 100vh;
  background: #f6f6f6;
}
</style>


<style lang="scss" scoped>
@import '~/assets/scss/layout/default.scss';
</style>


