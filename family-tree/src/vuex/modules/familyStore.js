function buildLocalMember(key, member) {
	if (!member) return null;
	member._id = key;
	member.fullName = `${member.fname} ${member.lname}`;
	return member;
}

function cleanLocalMember(member) {
	if (!member) return null;
	member._id = null;
	member.fullName = null;
	return member;
}

export default {
	namespaced: true,
	state: {
		path: 'members',
		members: [],
		member: {}
	},
	mutations: {
		SET_MEMBERS(state, members) {
			state.members = members;
		},
		SET_MEMBER(state, member) {
			state.member = member;
		}
	},
	actions: {
		async fetchMembers({ state, commit, rootState, rootGetters }) {
			const members = rootState.db.ref(`users/${rootGetters['auth/user'].uid}/${state.path}`);
			const snap = await members.once('value');
			if (!snap.val()) return null;
			const items = Object.keys(snap.val()).map(key => {
				const item = snap.val()[key];
				const member = buildLocalMember(key, item);
				return member;
			});
			commit('SET_MEMBERS', items);
			return items;
		},
		async fetchMember({ state, commit, rootState, rootGetters }, { id }) {
			const memberRef = rootState.db.ref(`users/${rootGetters['auth/user'].uid}/${state.path}/${id}`);
			const snap = await memberRef.once('value');
			const item = snap.val();
			if (!item) return null;
			const member = buildLocalMember(id, item);
			commit('SET_MEMBER', member);
			return member;
		},
		async addMember({ state, rootState, rootGetters }, { member }) {
			const memberRef = rootState.db.ref(`users/${rootGetters['auth/user'].uid}/${state.path}`);
			const memberSanitized = cleanLocalMember(member);
			const result = await memberRef.push(memberSanitized);
			return result;
		},
		async updateMember({ state, rootState, rootGetters }, { id, member }) {
			const memberRef = rootState.db.ref(`users/${rootGetters['auth/user'].uid}/${state.path}/${id}`);
			const memberSanitized = cleanLocalMember(member);
			const result = await memberRef.set(memberSanitized);
			return result;
		}
	},
	getters: {
		members: state => state.members,
		member: state => state.member
	}
};
