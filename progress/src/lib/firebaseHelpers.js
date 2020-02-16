/**
 * A collection of helper functions for dealing with the firebase module in vue
 */

import data from './data/snapshot-20_09_18.json';

/**
 * Returns true if the client currently has a connection to the database
 * @param {Object} rootState the rootState object available in vuex actions
 */
export function isConnected(rootState) {
	// eslint-disable-next-line no-underscore-dangle
	const connected = rootState.firebase.database().repo_.persistentConnection_.connected_;
	return connected;
}

export function getOfflineUsers() {
	return data.users;
}

export function getOfflinePosts() {
	return data.posts;
}

