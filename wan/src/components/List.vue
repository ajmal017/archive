<template>
	<div class="HolisticList">

		<v-layout class="HolisticList__header">
			<v-flex xs4 d-block>
				<h3 class="HolisticList__header__title HolisticList__header__title--borderRight" v-text="name"/>
			</v-flex>
			<v-flex xs8 d-block>

				<h3 class="HolisticList__header__title" v-text="'Details'"/>
			</v-flex>
		</v-layout>

		<v-layout class="HolisticList__content">

			<div v-if="isLoading" class="flex space-around m-5">
				<v-progress-circular indeterminate class="HolisticList__loader"/>
			</div>

			<v-list v-else two-line class="HolisticList__list">
				<v-list-tile
					v-for="item in items"
					:key="item.id"
					ripple
					@click="handleItemClick(item)">

					<v-layout class="rounded">
						<v-flex xs4 class="HolisticList__cell HolisticList__cell--dark">
							<v-list-tile-content>
								<v-list-tile-title class="font-bold" v-text="item.title"/>
								<v-list-tile-sub-title v-text="item.subTitle"/>
							</v-list-tile-content>
						</v-flex>

						<v-flex xs8 class="HolisticList__cell">
							<v-list-tile-content>

								<v-chip class="HolisticList__cell__chip" v-text="item.chipText"/>

								<v-list-tile-title class="mt-4" v-text="item.text"/>

							</v-list-tile-content>
						</v-flex>
					</v-layout>
				</v-list-tile>
			</v-list>
		</v-layout>

		<section class="HolisticList__controls">

			<v-pagination
				v-model="currentPage"
				:length="totalPages"/>

			<v-select
				v-model="perPage"
				:items="perPageOptions"/>

		</section>

	</div>
</template>

<script>

export default {
	props: {
		items: {
			type: Array,
			default: () => [],
			required: true
		},
		total: {
			type: Number,
			required: true
		},
		isLoading: {
			type: Boolean
		},
		name: {
			type: String,
			default: () => 'Items'
		},
		options: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			currentPage: 1,
			perPage: 5
		};
	},
	computed: {
		perPageOptions() {
			const options = [5, 10, 20, 50, 100];
			const validOptions = options.filter((o, i) => {
				if (i === 0) return true;
				return this.total > options[i - 1];
			});
			return validOptions;
		},
		totalPages() {
			return Math.ceil(this.total / this.perPage);
		}
	},
	methods: {
		handleTableChange() {
			this.$emit('table-change', {
				currentPage: this.currentPage,
				perPage: this.perPage
			});
		},
		handleItemClick(item) {
			this.$emit('item-click', item);
		}
	},
	watch: {
		options: {
			immediate: true,
			handler() {
				if (this.options.currentPage) this.currentPage = this.options.currentPage;
				if (this.options.perPage) this.perPage = this.options.perPage;
			}
		},
		perPage: 'handleTableChange',
		currentPage: 'handleTableChange'
	}
};
</script>


<style lang="scss">
@import "../styles/index.scss";

.HolisticList {
	width: 100%;
	display: flex;
	flex-direction: column;
	color: $grey-dark;
	justify-content: space-between;
	position: relative;
	min-height: 10rem;

	.layout {
		width: 100%;
		height: 100%;
		.v-list {
			background: $white-off;
			&__tile {
				&__sub-title, &__title {
					white-space: unset;
					overflow: unset;
				}
				&__content {
					justify-content: flex-start;
				}
				&--link {
					height: 13rem;
					padding: 0;
				}
			}
			>div {
				background: $white;
				border-radius: 3px;
				border: 1px solid $grey-pale;
				margin-bottom: 1rem;
			}
			.v-chip {
				&__content {
					height: auto;
				}
			}
		}
	}

	&__header {
		background: $grey-light;
		min-height: 4rem;
		max-height: 4rem;
		height: 4rem !important;

		&__title {
			display: flex;
			font-size: 1.25rem;
			padding: 1.25rem 2.5rem;
			letter-spacing: 0.2rem;
			text-transform: uppercase;

			&--borderRight {
				border-right: 2px solid darken($white, 10);
			}

		}

	}

	&__content {
		overflow: auto;
		padding-bottom: 2rem;

		>.v-list.theme--light {
			background: transparent;
		}
	}

	&__loader {
		margin: 3rem auto;
		display: flex;
	}

	&__list {
		width: 100%;
	}

	&__cell {
		height: auto;
		border: 1px solid darken($white, 4);
		padding: 1.5rem 2.5rem;

		&--dark {
			background-color: darken($white, 4);

			.v-list__tile__content { justify-content: space-around !important; }
		}

		&__chip {
			position: absolute;
			top: 1rem;
			right: 1rem;
			background-color: darken($white, 4);
			padding: 0.2rem 1.3rem;
		}

	}

	&__controls {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		z-index: 2;
		position: absolute;
		bottom: 0;
		right: 0;
		height: auto;
	}
}

</style>
