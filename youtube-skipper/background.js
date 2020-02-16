chrome.runtime.onInstalled.addListener(() => {

	chrome.storage.sync.set({color: '#3aa757'}, () => {
		console.log("The color is bean.");
	});

	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
		chrome.declarativeContent.onPageChanged.addRules([{
		conditions: [new chrome.declarativeContent.PageStateMatcher({
			pageUrl: {hostEquals: 'www.youtube.com'},
		})
		],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});

});
