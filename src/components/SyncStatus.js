import React from 'react';
import '../styles/components/SyncStatus.scss';

import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { IoIosSync } from 'react-icons/io';
import { AiOutlineEdit } from 'react-icons/ai';

export default function SyncStatus(props) {

	if (props.status === 'synced') {
		return <div className="SyncStatus">Saved <IoIosCheckmarkCircleOutline /></div>
	}

	if (props.status === 'not synced') {
		return <div className="SyncStatus">Modified <AiOutlineEdit /></div>
	}

	if (props.status === 'syncing') {
		return <div className="SyncStatus">Saving <IoIosSync className="spin" /></div>
	}
	
}