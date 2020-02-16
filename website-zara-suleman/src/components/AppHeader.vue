<template>
<header class="Header">
	<div class="App__inner App__inner--fullHeight">

		<b-link to="/">
			<h1 class="Header__title App--center">
				Zahra Suleman
			</h1>
		</b-link>

		<nav
			class="Header__menu"
			:class="isNavOpen ? '' : 'hidden'">
			<li
				class="Header__menu__item"
				v-for="(link, index) in nav"
				:key="index">

				<a
					v-if="link.isAbsolute"
					v-text="link.name"
					:href="link.path"
					target="_blank"
					@click="toggleNav">
					<i
						v-if="link.children"
						class="fa"/>
				</a>

				<router-link
					v-else
					v-text="link.name"
					:to="link.path"
					exact
					@click.native="toggleNav" >
					<i v-if="link.children" class="fa"/>
				</router-link>

				<ul
					v-if="link.children"
					class="sub-nav">
					<li
						v-for="(subLink, index) in link.children"
						:key="index">

						<a
							v-if="subLink.isAbsolute"
							v-text="subLink.name"
							:href="subLink.path"
							target="_blank"/>

						<router-link
							v-else
							v-text="subLink.name"
							:to="subLink.path" exact/>

					</li>
				</ul>

			</li>
		</nav>

		<div :class="['menu-toggle', isNavOpen ? 'on' : '']" @click="isNavOpen = !isNavOpen">
			<div class="one"></div>
			<div class="two"></div>
			<div class="three"></div>
		</div>

	</div>
</header>
</template>

<script>
import { navRef, mediaRef } from '../tamiat/admin/firebase_config';

export default {
	firebase: {
		// load settings as object instead of array (default)
		nav: {
			source: navRef
		},
		media: {
			source: mediaRef
		}
	},
	computed: {
		// relates to OG tamiat's logo
		loadLogo() {
			let i = this.media.length;
			let url = null;
			while (i--) {
				if (this.media[i].name === 'WebsiteLogo') {
					url = this.media[i].src;
				}
			}
			return url;
		}
	},
	data() {
		return {
			isNavOpen: false
		};
	},
	methods: {
		toggleNav(event) {
			const targetElement = event.target.parentElement.parentElement;
			if (targetElement.nodeName === 'LI') {
				targetElement.className = targetElement.className === 'open' ? '' : 'open';
			}
			this.isNavOpen = !this.isNavOpen;
			event.preventDefault();
		}
	}
};
</script>

<style lang="scss">
@import '../settings';

$headerHeight: $Header-Height;
$background: $Theme-Colour;
$shadowColour: $Shadow-Colour;
$textColour: $Highlight-Colour;
$mobileBreak: $Mobile-Width;

.Header{
	background: $background;
	height: $headerHeight;
	position: fixed;
	color: $textColour;
	width: 100%;
	z-index: 10;
	transition: box-shadow 350ms ease-in-out;

	&__title{
		color: $textColour;
		margin: auto;
		display: block;
		display: inline-block;
		left: 0;
	}

	&__menu{
		float: right;
		font-size: 24px;
		top: 50%;
		transform: translateY(-50%);
		right: 0;
		position: absolute;

		&__item {
			float: left;
			margin-right: 1rem;

			&:last-of-type {
				margin-right: 0;
			}

			.router-link-active {
				text-decoration: underline;
			}
		}
	}

	&__inner{
		height: 100%;
	}

	&--shadow {
		box-shadow: 0 4px 15px -4px $shadowColour;
	}

	&--responsive {

		@media all and (max-width: $mobileBreak) {
			width: 100%;
		}
	}

}
</style>
