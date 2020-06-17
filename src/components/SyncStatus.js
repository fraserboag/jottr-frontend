import React from 'react';
import '../styles/components/SyncStatus.scss';

import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { IoIosSync } from 'react-icons/io';

export default function SyncStatus(props) {

	if (props.status === 'synced') {
		return <div className="SyncStatus"><IoIosCheckmarkCircleOutline /></div>
	}

	if (props.status === 'not synced') {
		return <div className="SyncStatus"><IoIosSync className="spin" /></div>
	}

	if (props.status === 'syncing') {
		return <div className="SyncStatus"><IoIosSync className="spin" /></div>
	}
	
}