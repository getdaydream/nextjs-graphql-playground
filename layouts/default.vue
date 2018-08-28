<template>
  <div>
    <!-- https://bulma.io/documentation/components/navbar/ -->
    <nav
      :class="{'is-spaced': isSpaced}"
      class="navbar has-shadow is-fixed-top">
      <div class="container">
        <!-- the left side, always visible, which usually contains the logo and optionally some links or icons -->
        <div class="navbar-brand">

          <!-- The navbar-burger is a hamburger menu that only appears on mobile.  -->
          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            :class="{'is-active': isMenuOpen}"
            @click="isMenuOpen = !isMenuOpen">
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
          </a>
        </div>
        <!-- the right side, hidden on touch devices, visible on desktop -->
        <div
          class="navbar-menu"
          :class="{'is-active': isMenuOpen}"
          @click="isMenuOpen = false">
          <div class="navbar-start">
            <nuxt-link
              to="article"
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

    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div
            class="box"
            style="height:248px;"/>
        </div>
      </div>
    </section>

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
      isSpaced: true,

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


<style lang="sass">
@import 'bulma/bulma.sass'
</style>

<style lang="scss">
body {
  min-height: 100vh;
  background: #f6f6f6;
}
</style>


<style lang="scss" scoped>
@import '~/assets/scss/layout/default.scss';
</style>


