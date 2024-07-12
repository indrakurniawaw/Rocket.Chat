import { css } from '@rocket.chat/css-in-js';
import { Box } from '@rocket.chat/fuselage';
import React from 'react';

import DialPadButton from './DialPadButton';
import { DialPadInput } from './DialPadInput';

type DialPadProps = {
	editable?: boolean;
	value: string;
	onChange(value: string, digit?: string): void;
};

const DIGITS = [
	['1', ''],
	['2', 'ABC'],
	['3', 'DEF'],
	['4', 'GHI'],
	['5', 'JKL'],
	['6', 'MNO'],
	['7', 'PQRS'],
	['8', 'TUV'],
	['9', 'WXYZ'],
	['*', ''],
	['0', '+', '+'],
	['#', ''],
];

const dialPadClassName = css`
	display: flex;
	gap: 8px;
	justify-content: center;
	flex-wrap: wrap;
	padding: 12px 12px 16px;
	background-color: #ffffff;
`;

const DialPad = ({ editable, value, onChange }: DialPadProps) => {
	return (
		<Box display='flex' flexDirection='column'>
			<Box display='flex' p={12} pb={8} backgroundColor='#E4E7EA'>
				<DialPadInput
					readOnly={!editable}
					value={value}
					onChange={(e) => onChange(e.currentTarget.value)}
					onBackpaceClick={() => onChange(value.slice(0, -1))}
				/>
			</Box>

			<Box className={dialPadClassName}>
				{DIGITS.map(([primaryDigit, subDigit, longPressDigit]) => (
					<DialPadButton
						key={primaryDigit}
						digit={primaryDigit}
						subDigit={subDigit}
						longPressDigit={longPressDigit}
						onClick={(digit: string) => onChange(`${value}${digit}`, digit)}
					/>
				))}
			</Box>
		</Box>
	);
};

export default DialPad;