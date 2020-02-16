<template>
	<b-card class="CompanyCard"
		no-body
		:header="company.title"
		@click.prevent="goToCompany">

		<b-list-group flush>

		</b-list-group>

		<b-list-group-item>
			<b>Address</b>
			<br>
			<span>
				{{company.address_snippet}}
			</span>
		</b-list-group-item>

		<b-list-group-item>
			<b>Date of Creation</b>
			<br>
			<span>
				{{company.date_of_creation}}
			</span>
		</b-list-group-item>

		<b-list-group-item>
			<b>Company Type</b>
			<br>
			<span>
				{{company.company_type}}
			</span>
		</b-list-group-item>

		<b-list-group-item>
			<b>Description</b>
			<br>
			<span>
				{{company.description}}
			</span>
		</b-list-group-item>

		<b-list-group-item>
			<b>Kind</b>
			<br>
			<span>
				{{company.kind}}
			</span>
		</b-list-group-item>

		<b-list-group-item>
			<b>Status</b>
			<br>
			<span>
				{{company.company_status}}
			</span>
		</b-list-group-item>

		<b-list-group-item>
			<b>Company Number</b>
			<br>
			<span>
				{{company.company_number}}
			</span>
		</b-list-group-item>

	</b-card>
</template>

<script>
export default {
	props: {
		company: {
			type: Object,
			required: true
		}
	},
	computed: {
		companiesHouseLink() {
			return `https://beta.companieshouse.gov.uk${this.company.links.self}`;
		}
	},
	methods: {
		goToCompany() {
			const companyPage = window.open(this.companiesHouseLink, '_blank');
			companyPage.focus();
		}
	}
};
</script>

<style lang="scss">
$animationTime: 0.25s;

.CompanyCard {
	transition: box-shadow $animationTime, margin $animationTime;
	cursor: pointer;

	&:hover {
		margin-top: -3px;
		box-shadow: 0 1px #dfdfdf;
	}

}
</style>

