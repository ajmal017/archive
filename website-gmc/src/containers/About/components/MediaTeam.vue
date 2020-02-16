<template>
	<section class="MediaTeam">

		<v-card
			v-for="person in people"
			:key="person.name"
			class="MediaTeam__card">

			<v-img height="200px" :src="person.image"/>

			<v-card-title class="MediaTeam__card__info">
				<span class="MediaTeam__card__text MediaTeam__card__text--name" v-text="person.name"/>
				<span class="MediaTeam__card__text MediaTeam__card__text--country" v-text="person.country"/>
			</v-card-title>
		</v-card>
	</section>
</template>

<script>

export default {
	data() {
		return {
			people: [
				{
					name: 'Abdul Aziz Bane',
					country: 'Senegal',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Fabdoul-aziz-bane-Senegal.jpg?alt=media&token=b4198cdb-4b13-4e00-9e18-531190d060a7'
				},
				{
					name: 'Alassane Yattara',
					country: 'Mali',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Falassane-yattara-Mali.jpg.jpeg?alt=media&token=2e14fe3c-598f-48af-aff2-31f44cd1097a'
				},
				{
					name: 'Ayo Bello',
					country: 'Nigeria',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Fayo-bello-Nigeria.jpg?alt=media&token=fa37bfc3-0759-430c-a6a3-39a33e1a2282'
				},
				{
					name: 'Almoudou Mahamane Bangou',
					country: 'Mali',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Falmoudou-mahamane-bangou-Mali.jpg?alt=media&token=9353cd85-e471-4c5a-80b7-690590ec9f6b'
				},
				{
					name: 'Deji Adefila',
					country: 'Nigeria',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Fdeji-adefila-Nigeria.jpg?alt=media&token=ef3b213b-b1bb-403e-9a1e-8e1b1e24abb0'
				},
				{
					name: 'Dr Wilberforce Oti',
					country: 'Nigeria',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Fdr-wilberforce-oti-Nigeria.jpg?alt=media&token=abe0d1c5-579d-448b-abe2-3aa55a00a674'
				},
				{
					name: 'Fatoumata Bagayoko',
					country: 'Mali',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Ffatoumata-bagayoko-Mali.jpg?alt=media&token=cd612a3a-0b34-47b5-adce-f0399259c8c8'
				},
				{
					name: 'Gift Abu',
					country: 'Nigeria',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Fgift-abu-Nigeria.png?alt=media&token=a1bdbaf2-ad9a-47c0-8a71-e35c41bccd51'
				},
				{
					name: 'Ifrah Ahmed',
					country: 'Somalia',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Fifrah-ahmed-Somalia.jpg?alt=media&token=d30367c9-35a6-49cb-96ee-9af5b456ec6d'
				},
					{
					name: 'Imam Mamadou Traore',
					country: 'Mali',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Fimam-mamadou-traore-Mali.jpg?alt=media&token=e574a5e4-450b-4a96-8f52-1ad4b292bb76'
				},
					{
					name: 'Imam Moustapha Wele',
					country: 'Senegal',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Fimam-moustapha-wele-Senegal.jpg?alt=media&token=b25da56a-58ba-4d51-bd06-7b5af76de717'
				},
				{
					name: 'Jaha Dukureh',
					country: 'The Gambia',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Fjaha-dukureh-Gambia.png?alt=media&token=0f14ce3c-f130-4a40-8b67-dd1a24cf61fc'
				},
				{
					name: 'Lorna Meipuki',
					country: 'Kenya',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Florna-andisi-Kenya.jpg?alt=media&token=511015ca-568c-4ba4-84a4-cd7259c7b32b'
				},
				{
					name: 'Moussa Oumar Gueye',
					country: 'Senegal',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Fmoussa-oumar-gueye-Senegal.jpg?alt=media&token=8a4613a0-45ea-4ef1-a4b2-75238625505a'
				},
				{
					name: 'Oumou Salif Toure',
					country: 'Mali',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Foumou-salif-tour%C3%A9-Mali.jpg?alt=media&token=e64010ce-c30e-4f16-88d8-bbf0d07b4d19'
				},
				{
					name: 'Ousmane Niang',
					country: 'Senegal',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Fousmane-niang-Senegal.jpg?alt=media&token=3a39f9ed-60e2-486a-83a7-fd3ffe053e50'
				},
				{
					name: 'Raymond Opkani',
					country: 'Nigeria',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Fraymond-okpani-Nigeria.jpg?alt=media&token=3adc64f9-ba73-4c40-b109-f7d589debd66'
				},
				{
					name: 'Sadia Hussein',
					country: 'Kenya',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Fsadia-hussein-Kenya.png?alt=media&token=87683e65-c494-4b99-abd8-b59a367ebba7'
				},
				{
					name: 'Salamutu Kamara',
					country: 'Sierra Leone',
					image: 'https://firebasestorage.googleapis.com/v0/b/website-gmc.appspot.com/o/assets%2Fimages%2Fpeople%2Fsalimatu-kamara-Sierra%20Leone.jpg?alt=media&token=55409863-9fa5-4bc3-9f4d-55d984346a58'
				}
			]
		}
	}
};

</script>

<style lang="scss">
@import '../../../styles/colours';

.MediaTeam {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;

	&__card {
		background-size: cover;
		background-position: center;
		display: flex;
		flex-direction: column;
		width: 18rem;
		padding: 0;
		margin-bottom: 2rem;

		&__text {
			font-size: 1rem;

			&--country {
				font-weight: bold;
			}
		}

		&__info {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}
}

</style>
