<script lang="ts">
import { onMount, getContext } from 'svelte';
import { get } from 'svelte/store';
import { replace } from 'svelte-spa-router';

import { isLogin } from '../stores';

import { Color } from '../../ui/enums';
import View from '../../ui/components/view/View.svelte';
import ViewContent from '../../ui/components/view/ViewContent.svelte';
import Card from '../../ui/components/card/Card.svelte';
import CardHeader from '../../ui/components/card/CardHeader.svelte';
import CardContent from '../../ui/components/card/CardContent.svelte';
import Button from '../../ui/components/buttons/Button.svelte';

// Microsoft Graph API token will be passed
let graphToken;

onMount(async () => {
	console.log('[TaskList] : onMount');
	if (get(isLogin)) {
		// Not login
	} else {
		// Route to the welcome page for signing in
		replace('/welcome');
	}
});

function signout() {
	isLogin.set(false);
}
</script>

<View>
	<ViewContent>
		<Card cardId="tasklist">
			<CardHeader title="Task List" />
			<CardContent>
				<Button
					title="Sign Out"
					color="{Color.Primary}"
					navi="{{
						itemId: 'signout',
						onSelect: async () => signout(),
					}}" />
			</CardContent>
		</Card>
	</ViewContent>
</View>
