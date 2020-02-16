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
				<v-progress-circular indeterminate/>
			</div>

			<p class="HolisticList__message" v-else-if="items.length === 0">There are currently no items in the list</p>

			<v-list v-else two-line class="w-100">
				<v-list-tile
					v-for="item in items"
					:key="item._id"
					ripple
					@click="handleItemClick(item)">

					<v-layout class="rounded">
						<v-flex xs4 class="HolisticList__cell HolisticList__cell--dark">
							<v-list-tile-content>
								<v-list-tile-title class="font-bold" v-text="item.title"/>
								<v-list-tile-sub-title v-html="item.subTitle"/>
							</v-list-tile-content>
						</v-flex>

						<v-flex xs8 class="HolisticList__cell">
							<v-list-tile-content>

								<section class="HolisticList__cell__header">
									<v-chip
										v-for="(chip, i) in item.chips"
										:key="i"
										class="App__chip"
										:color="chip.colour || 'grey'"
										v-text="chip.text"/>
								</section>

								<v-list-tile-title class="mt-4" v-text="item.text"/>

							</v-list-tile-content>
						</v-flex>
					</v-layout>
				</v-list-tile>
			</v-list>
		</v-layout>

		<section class="HolisticList__controls">

			<b-pagination
				class="mr-3"
				size="sm"
				hide-goto-end-buttons
				v-model="currentPage"
				:total-rows="total"
				:per-page="perPage"/>

			<b-form-group description="Per Page">
				<b-form-select
					size="sm"
					v-model="perPage"
					:options="perPageOptions"/>
			</b-form-group>

		</section>

	</div>
</template>

<script>

export default {
	props: {
		items: {
			type: Array,
			default: [],
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
			default: () => {
				return 'Items'
			}
		},
		options: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			currentPage: 1,
			perPage: 5,
		}
	},
	computed: {
		perPageOptions() {
			const options = [5, 10, 20, 50, 100];
			const validOptions = options.filter((o, i) => {
				if (i === 0) return true;
				return this.total > options[i-1];
			});
			return validOptions;
		},
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
}
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

	&__cell {
		height: auto;
		border: 1px solid darken($white, 4);
		padding: 1.5rem 2.5rem;

		&--dark {
			background-color: darken($white, 4);

			.v-list__tile__content { justify-content: space-around !important; }
		}

		&__header {
			width: 100%;
			display: flex;
			justify-content: flex-end;
		}

	}

	&__message {
		margin-top: 1rem;
		width: 100%;
		text-align: center;
		font-weight: bold;
		font-size: 1.1rem;
	}

	&__controls {
		@extend .flexbox;
		flex-direction: row;
		align-items: baseline;
		justify-content: flex-end;
		z-index: 2;
		height: auto;
	}

}

</style>
