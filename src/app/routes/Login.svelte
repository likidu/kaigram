<script lang="ts">
  import View from '../../ui/components/view/View.svelte';
  import ViewContent from '../../ui/components/view/ViewContent.svelte';
  import Typography from '../../ui/components/Typography.svelte';
  import ViewHeader from '../../ui/components/view/ViewHeader.svelte';
  import Button from '../../ui/components/buttons/Button.svelte';
  import InputRow from 'src/ui/components/form/InputRow.svelte';

  let mobile = '2067711184';

  function login() {
    return true;
  }
</script>

<View>
  <ViewHeader>Login</ViewHeader>
  <ViewContent>
    <InputRow label="Mobile" value="{mobile}" placeholder="Mobile number..." onChange="{(val) => (mobile = val)}" />
    <Button
      title="Login"
      navi="{{
        itemId: 'BUTTON_LOGIN',
        onSelect: async () => login(),
      }}" />
  </ViewContent>
</View>
