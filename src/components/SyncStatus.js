import React from 'react';
import '../styles/components/SyncStatus.scss';
import iconSynced from '../images/icon-synced.png';
import iconSyncing from '../images/icon-syncing.png';
import iconNotSynced from '../images/icon-notsynced.png';

export default function SyncStatus(props) {

	if (props.status === 'synced') {
		return (
			<div className="SyncStatus">
				<img src={iconSynced} alt="" /> Synced
			</div>
		);
	}

	if (props.status === 'not synced') {
		return (
			<div className="SyncStatus">
				<img src={iconNotSynced} alt="" /> Not Synced
			</div>
		);
	}

	if (props.status === 'syncing') {
		return (
			<div className="SyncStatus">
				<img src={iconSyncing} className="spin" alt="" /> Syncing
			</div>
		);
	}
	
}