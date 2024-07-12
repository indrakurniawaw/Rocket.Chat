import { Box, IconButton } from '@rocket.chat/fuselage';
import type { FC, ReactNode } from 'react';
import React from 'react';

import VoiceCallSettingsButton from './CallSettingsButton';

const VoiceCallHeader: FC<{ title: ReactNode; hideSettings?: boolean; onClose?: () => void }> = ({ title, hideSettings, onClose }) => {
	return (
		<Box is='header' style={{ gap: '8px' }} p={12} pbe={8} display='flex' justifyContent='space-between'>
			{title && <h3 style={{ fontSize: '14px', fontWeight: '700' }}>{title}</h3>}

			{!hideSettings && <VoiceCallSettingsButton mini />}
			{onClose && <IconButton mini icon='cross' onClick={onClose} />}
		</Box>
	);
};

export default VoiceCallHeader;