<style lang="postcss">
h2 {
  color: rgb(var(--svelte-rgb));
}
</style>

<script lang="ts">
import logo from '../../assets/svelte.png';

import { replace } from 'svelte-spa-router';

import { isLogin } from '../stores';

import { Color } from '../../ui/enums';
import View from '../../ui/components/view/View.svelte';
import ViewContent from '../../ui/components/view/ViewContent.svelte';
import Button from '../../ui/components/buttons/Button.svelte';
import Typography from '../../ui/components/Typography.svelte';
</script>

<View>
  <ViewContent>
    <Typography>Buttons info</Typography>
    <img width="48" height="48" src="{logo}" alt="Svelte Logo" class="inline-block" />
    <h2 class="text-4xl uppercase font-thin leading-tight my-8 mx-auto max-w-xs sm:max-w-xs">
      Microsoft To Do
    </h2>
    <Button
      title="Primary Button"
      color="{Color.Primary}"
      navi="{{
        itemId: 'primary',
        onSelect: async () => console.log('secondary'),
      }}" />
  </ViewContent>
</View>
