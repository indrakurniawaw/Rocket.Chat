import type { ServerMethods } from '@rocket.chat/ui-contexts';
import { MatrixBridgedUser } from '@rocket.chat/models';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../app/authorization/server/functions/hasPermission';
import { setUserActiveStatus } from '../../app/lib/server/functions/setUserActiveStatus';

declare module '@rocket.chat/ui-contexts' {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	interface ServerMethods {
		setUserActiveStatus(userId: string, active: boolean, confirmRelinquish?: boolean): boolean;
	}
}

Meteor.methods<ServerMethods>({
	async setUserActiveStatus(userId, active, confirmRelinquish) {
		check(userId, String);
		check(active, Boolean);

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'setUserActiveStatus',
			});
		}

		const uid = Meteor.userId();

		if (!uid || (await hasPermissionAsync(uid, 'edit-other-user-active-status')) !== true) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', {
				method: 'setUserActiveStatus',
			});
		}

		const remoteUser = await MatrixBridgedUser.getExternalUserIdByLocalUserId(uid);
		if (remoteUser) {
			throw new Meteor.Error('error-not-allowed', 'User is participating in matrix federation, user deactivation is not allowed, only deletion is allowed',
				{ method: 'deleteUser' },
			);
		}
		await setUserActiveStatus(userId, active, confirmRelinquish);

		return true;
	},
});
