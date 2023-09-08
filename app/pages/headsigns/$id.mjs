// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  const headsign = store.headsign || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <enhance-form
  action="/headsigns/${headsign.key}"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Headsign">
  <enhance-text-input label="Code" type="number" id="code" name="code" value="${headsign?.code}" errors="${problems?.code?.errors}"></enhance-text-input>
  <enhance-text-input label="Route" type="number" id="route" name="route" value="${headsign?.route}" errors="${problems?.route?.errors}"></enhance-text-input>
  <enhance-text-input label="Endpoint" type="text" id="endpoint" name="endpoint" value="${headsign?.endpoint}" errors="${problems?.endpoint?.errors}"></enhance-text-input>
  <input type="hidden" id="key" name="key" value="${headsign?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</enhance-page-container>`
}
