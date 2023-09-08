// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  let headsigns = store.headsigns || []
  const headsign = store.headsign || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Headsigns page</h1>
    ${headsigns.map(item => `<article class="mb2">
<div class="mb0">
  <p class="pb-2"><strong class="capitalize">code: </strong>${item?.code || ''}</p>
  <p class="pb-2"><strong class="capitalize">route: </strong>${item?.route || ''}</p>
  <p class="pb-2"><strong class="capitalize">endpoint: </strong>${item?.endpoint || ''}</p>
  <p class="pb-2"><strong class="capitalize">key: </strong>${item?.key || ''}</p>
</div>
<p class="mb-1">
  <enhance-link href="/headsigns/${item.key}">Edit this headsign</enhance-link>
</p>
<form action="/headsigns/${item.key}/delete" method="POST" class="mb-1">
  <enhance-submit-button><span slot="label">Delete this headsign</span></enhance-submit-button>
</form>
</article>`).join('\n')}
<details class="mb0" ${Object.keys(problems).length ? 'open' : ''}>
    <summary>New headsign</summary>
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
</details>
</main>
</enhance-page-container>
  `
}
