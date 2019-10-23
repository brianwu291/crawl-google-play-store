let request = new Request('/app/group')

function createPostInit(inputData) {
  let Header = new Headers({ 'Content-Type': 'application/json' })
  let data = JSON.stringify({ data: inputData })
  let postInit = { method: 'POST', headers: Header, body: data }
  return postInit
}

export default { request, createPostInit }