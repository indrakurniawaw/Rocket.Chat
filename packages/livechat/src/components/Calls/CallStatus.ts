export const enum CallStatus {
	RINGING = 'ringing',
	DECLINED = 'declined',
	IN_PROGRESS = 'inProgress', 
	IN_PROGRESS_SAME_TAB = 'inProgressSameTab',
	IN_PROGRESS_DIFFERENT_TAB = 'inProgressDifferentTab',
	ENDED = 'ended',
}

export const isCallOngoing = (callStatus: CallStatus) =>
	callStatus === CallStatus.IN_PROGRESS ||
	callStatus === CallStatus.IN_PROGRESS_DIFFERENT_TAB ||
	callStatus === CallStatus.IN_PROGRESS_SAME_TAB;
