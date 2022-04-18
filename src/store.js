
// File Name      : store.js
// Description    : Testkit using Svelte.
// Author         : Arpan Jain
// version        : 1.0
// Created Date   : 24/03/2022
// Updated By     : Arpan Jain
// Updated Date   : 11/04/2022
// Last Update    : 12/04.2022



import{writable} from 'svelte/store';
export let count = writable(0);
export const option=writable([]);
