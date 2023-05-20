(function () {
  const doc = document.documentElement

  doc.classList.remove('no-js')
  doc.classList.add('js')

  // Reveal animations
  if (document.body.classList.contains('has-animations')) {
    /* global ScrollReveal */
    const sr = window.sr = ScrollReveal()

    sr.reveal('.feature, .testimonial', {
      duration: 600,
      distance: '50px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      origin: 'bottom',
      interval: 100
    })

    /* global anime */
    const heroAnimation = anime.timeline({ autoplay: false })

    heroAnimation.add({
      targets: '.fadeup-animation',
      offset: 1300, // Starts at 1300ms of the timeline
      translateY: {
        value: [100, 0],
        duration: 1500,
        easing: 'easeOutElastic',
        delay: function (el, i) {
          return i * 150
        }
      },
      opacity: {
        value: [0, 1],
        duration: 200,
        easing: 'linear',
        delay: function (el, i) {
          return i * 150
        }
      }
    })

    doc.classList.add('anime-ready')
    heroAnimation.play()
  }
}())

async function loadBackend () {
  // eslint-disable-next-line no-undef
  const resource = await fetch('https://www.agendarexamedevista.com.br/otica/backend/backend.json')
  const json = await resource.json()
  return json.stores

  // const resource = await fetch('http://localhost:3001/backend/backend.json').then(response => response.json())
  // return resource.stores
}

function getUniqueCitisFrom (backend) {
  const citis = backend.map(({ location }) => location.city)
  let uniqueCitis = new Set(citis)
  uniqueCitis = Array.from(uniqueCitis)
  return uniqueCitis
}

function createCenteredDiv () {
  const element = document.createElement('div')
  element.classList.add('wrapper-app')
  return element
}

function clearChildrenFrom (element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild)
  }
}

function filterUsersFromState (backend, selectedCity, element) {
  const divFilteredUsers = element.querySelector('.filteredUsers')
  clearChildrenFrom(divFilteredUsers)

  const filteredUsers = backend.filter(
    ({ location }) => location.city === selectedCity
  )

  renderUsers(filteredUsers, divFilteredUsers)
}

function renderApp (usersBackend) {
  const citis = getUniqueCitisFrom(usersBackend)
  const element = document.querySelector('#app')
  const divData = createCenteredDiv()

  const select = document.createElement('select')
  select.classList.add('input')

  for (const city of citis) {
    const option = document.createElement('option')
    option.value = city
    option.textContent = city

    select.appendChild(option)
  }

  select.addEventListener('change', ({ currentTarget }) => {
    filterUsersFromState(usersBackend, currentTarget.value, element)
  })

  const divFilteredUsers = document.createElement('div')
  divFilteredUsers.classList.add('filteredUsers')

  divData.appendChild(select)
  divData.appendChild(divFilteredUsers)
  clearChildrenFrom(element)
  element.appendChild(divData)
  filterUsersFromState(usersBackend, citis[0], element)
}

function renderUser (store) {
  console.log(store)

  const { whatsapp } = store

  const liStore = document.createElement('li')
  liStore.classList.add('control')

  liStore.innerHTML = `
      <a class="button button-primary button-block" target="_blank" rel="noopener noreferrer" href="${whatsapp}">Agendar Consulta</a>
  `

  if (store.location.city === 'Escolha a Cidade') {
    return ''
  } else {
    return liStore
  }

  // return liStore
}

function renderUsers (stores, element) {
  const ulStores = document.createElement('ul')
  ulStores.classList.add('control-list')

  for (const store of stores) {
    const liStore = renderUser(store)
    ulStores.appendChild(liStore)
  }

  element.append(ulStores)
}

async function start () {
  const usersBackend = await loadBackend()
  renderApp(usersBackend)
}

start()
