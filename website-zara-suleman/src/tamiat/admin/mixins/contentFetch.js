export default {
	methods: {
		selectContentByTypeAndId(type, id) {
			const contentsByType = this.getContentsByType(type);
			return contentsByType.filter(content => content['.key'] === id)[0] || {};
		},
		getContentsByType(contentType) {
			let selectedContentsData = [];
			const selectedContents = this.contents.filter(content => content.name === contentType);
			selectedContents.forEach(content => {
				const contentDataArray = this.convertContentDataToArray(content.data);
				selectedContentsData = selectedContentsData.concat(contentDataArray || []);
			});
			return selectedContentsData;
		},
		convertContentDataToArray(contentData) {
			const contentDataArray = [];
			for (const key in contentData) {
				contentDataArray.push({
					...contentData[key],
					'.key': key
				});
			}
			return contentDataArray;
		}
	}
};
