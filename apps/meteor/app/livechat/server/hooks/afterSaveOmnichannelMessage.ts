import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { LivechatRooms } from '@rocket.chat/models';

import { callbacks } from '../../../../lib/callbacks';

callbacks.add(
	'afterSaveMessage',
	async (message, room) => {
		if (!isOmnichannelRoom(room)) {
			return message;
		}

		const updater = LivechatRooms.getUpdater();
		await callbacks.run('afterOmnichannelSaveMessage', message, { room, roomUpdater: updater });

		if (updater.hasChanges()) {
			await updater.persist({ _id: room._id });
		}

		return message;
	},
	callbacks.priority.MEDIUM,
	'after-omnichannel-save-message',
);
