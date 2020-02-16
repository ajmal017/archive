<template>
	<div>

		<b-modal
			:title="titleText"
			:visible="visible"
			class="App"
			@hidden="emitClose">

			<b-form-group
				label="First Name"
				label-for="addMemberFirstName"
				horizontal>
				<b-form-input
					id="addMemberFirstName"
					v-model="fname"
					:state="isFirstNameValid"/>
			</b-form-group>

			<b-form-group
				label="Last Name"
				label-for="addMemberLastName"
				horizontal>
				<b-form-input
					id="addMemberLastName"
					v-model="lname"/>
			</b-form-group>

			<b-form-group
				label-for="addMemberSex"
				label="Sex"
				horizontal>
				<b-form-radio-group
					id="addMemberSex"
					buttons
					button-variant="outline-primary"
					v-model="sex"
					:options="sexOptions"
					:state="isSexValid"/>
			</b-form-group>

			<b-form-group
				label-for="addMemberBirthday"
				label="Birthday"
				horizontal>
				<vuejs-datepicker
					id="addMemberBirthday"
					v-model="birthday"
					clear-button/>
			</b-form-group>

			<b-row>
				<b-col>
					<b-form-group
						label-for="addMemberMother"
						label="Mother"
						horizontal>
						<multiselect
							id="addMemberMother"
							v-model="mother"
							track-by="name"
							placeholder="Type to search"
							:options="motherOptions"
							:searchable="true">
							<template
								slot="singleLabel"
								slot-scope="props">
								<span v-text="formatBirthdayForMultiselect(props)"/>
								<span class="option__desc">
									<span
										class="option__title"
										v-text="props.option.fname"/>
									<span
										class="option__title"
										v-text="props.option.lname"/>
								</span>
							</template>
							<template
								slot="option"
								slot-scope="props">
								<span v-text="formatBirthdayForMultiselect(props)"/>
								<span v-text="props.option.fname"/>
								<span v-text="props.option.lname"/>
							</template>
						</multiselect>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group
						label-for="addMemberFather"
						label="Father"
						horizontal>
						<multiselect
							id="addMemberFather"
							v-model="father"
							track-by="name"
							placeholder="Type to search"
							:options="fatherOptions"
							:searchable="true">
							<template
								slot="singleLabel"
								slot-scope="props">
								<span v-text="formatBirthdayForMultiselect(props)"/>
								<span class="option__desc">
									<span
										class="option__title"
										v-text="props.option.fname"/>
									<span
										class="option__title"
										v-text="props.option.lname"/>
								</span>
							</template>
							<template
								slot="option"
								slot-scope="props">
								<span v-text="formatBirthdayForMultiselect(props)"/>
								<span v-text="props.option.fname"/>
								<span v-text="props.option.lname"/>
							</template>
						</multiselect>
					</b-form-group>
				</b-col>
			</b-row>

			<template slot="modal-footer">
				<b-button
					v-if="isDeleteButtonVisible"
					variant="danger"
					v-text="'Delete'"
					@click="onDeleteButtonClick"/>
				<b-button
					v-text="'Cancel'"
					@click="onCancelButtonClick"/>
				<b-button
					variant="primary"
					v-text="submitButtonText"
					:disabled="!isFormValid"
					@click="onSubmitButtonClick"/>
			</template>

		</b-modal>

		<b-modal
			title="Delete"
			:visible="isConfirmDeleteModalVisible"
			@ok="onConfirmDeleteButtonClick"
			@hidden="onConfirmDeleteModalClose">
			<p>Are you sure you want to delete this member?</p>
		</b-modal>

	</div>
</template>

<script>
/**
 * Member pop up component. Will handle adding new members and editing existing ones.
 *
 *	Props:
 *	- visible: sets whether the modal can be seen on screen
 * 	- mode ['add' / 'edit']: sets whether this modal is adding a new member or editing an existing one
 *  - doFetch: sets whether this modal should manage fetching data itself
 *
 *	Events:
 *	- submit: triggered when the modal updates a value in firebase
 * 	- close: triggered when modals closes (use this to keep the visible prop in sync)
 */

import { mapGetters, mapActions } from 'vuex';
import VuejsDatepicker from 'vuejs-datepicker';
import Multiselect from 'vue-multiselect';

export default {
	components: {
		VuejsDatepicker,
		Multiselect
	},
	props: {
		visible: {
			type: Boolean
		},
		mode: {
			type: String,
			default: 'add'
		},
		id: {
			type: String
		},
		doFetch: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		visible() {
			if (!this.visible) return;
			if (this.mode === 'add') {
				this.clear();
			} else if (this.mode === 'edit') {
				this.prepareToEdit();
			}
		},
		mother() {
			if (!this.mother) return;
			if (this.father) if (this.father.lname) return;
			this.lname = this.mother.lname;
		},
		father() {
			if (!this.father) return;
			if (this.father.lname) this.lname = this.father.lname;
		}
	},
	data() {
		return {
			fname: null,
			lname: null,
			sex: null,
			birthday: null,
			mother: null,
			father: null,
			sexOptions: [
				'female',
				'male'
			],
			isConfirmDeleteModalVisible: false
		};
	},
	computed: {
		...mapGetters({
			member: 'family/member',
			members: 'family/members'
		}),
		titleText() {
			if (this.mode === 'add') return 'Add Member';
			if (this.mode === 'edit') return 'Edit Member';
			return false;
		},
		submitButtonText() {
			if (this.mode === 'add') return 'Add';
			if (this.mode === 'edit') return 'Update';
			return false;
		},
		isDeleteButtonVisible() {
			return this.mode === 'edit';
		},
		motherOptions() {
			return this.members.filter(m => m.sex === this.sexOptions[0]);
		},
		fatherOptions() {
			return this.members.filter(m => m.sex === this.sexOptions[1]);
		},
		isFirstNameValid() {
			return !!this.fname;
		},
		isSexValid() {
			return !!this.sex;
		},
		isFormValid() {
			if (!this.isFirstNameValid) return false;
			if (!this.isSexValid) return false;
			return true;
		}
	},
	methods: {
		...mapActions({
			addMember: 'family/addMember',
			updateMember: 'family/updateMember',
			fetchMember: 'family/fetchMember',
			fetchMembers: 'family/fetchMembers'
		}),
		async onSubmitButtonClick() {
			if (this.birthday) this.birthday = this.birthday.toISOString();
			if (!this.lname) {
				if (this.mother) if (this.mother.lname) this.lname = this.mother.lname;
				if (this.father) if (this.father.lname) this.lname = this.father.lname;
			}
			const member = {
				fname: this.fname,
				lname: this.lname,
				sex: this.sex,
				birthday: this.birthday
			};
			if (this.mother) member.motherId = this.mother._id;
			if (this.father) member.fatherId = this.father._id;
			if (this.mode === 'add') {
				await this.addMember({ member });
			} else if (this.mode === 'edit') {
				await this.updateMember({ id: this.member._id, member });
			}
			this.emitSubmit();
		},
		onCancelButtonClick() {
			this.emitClose();
		},
		onDeleteButtonClick() {
			this.isConfirmDeleteModalVisible = true;
		},
		async onConfirmDeleteButtonClick() {
			await this.updateMember({ id: this.member._id, member: null });
			this.emitSubmit();
		},
		onConfirmDeleteModalClose() {
			this.isConfirmDeleteModalVisible = false;
		},
		formatBirthdayForMultiselect(props) {
			const birthday = new Date(props.option.birthday);
			return `b. ${birthday.getYear()}`;
		},
		emitClose() {
			this.clear();
			this.$emit('close');
		},
		emitSubmit() {
			this.$emit('submit');
			this.emitClose();
		},
		clear() {
			this.fname = null;
			this.lname = null;
			this.sex = null;
			this.birthday = null;
			this.mother = null;
			this.father = null;
		},
		async prepareToEdit() {
			if (!this.id) return;
			await this.fetchMember({ id: this.id });
			this.fname = this.member.fname;
			this.sex = this.member.sex;
			if (this.member.lname) this.lname = this.member.lname;
			if (this.member.birthday) this.birthday = new Date(this.member.birthday);
			if (this.member.motherId) this.mother = this.motherOptions.find(m => m._id === this.member.motherId);
			if (this.member.fatherId) this.father = this.fatherOptions.find(f => f._id === this.member.fatherId);
		}
	},
	created() {
		if (this.doFetch) this.fetchMembers();
	}
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"/>

