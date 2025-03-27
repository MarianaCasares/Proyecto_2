const ARTICLES = [
  {
    image: './assests/Nike_AirMax1.png',
    brand: 'Nike',
    model: 'Air Max 1',
    price: 120.0
  },
  {
    image: './assests/NB_9060.png',
    brand: 'New Balance',
    model: 'NB 9060',
    price: 80.0
  },
  {
    image: './assests/Nike_Revolution.png',
    brand: 'Nike',
    model: 'Nike Revolution',
    price: 90.0
  },
  {
    image: './assests/Adidas_ForumB.png',
    brand: 'Adidas',
    model: 'Forum Buckle',
    price: 100.0
  },
  {
    image: './assests/Adidas_Campus.png',
    brand: 'Adidas',
    model: 'Campus',
    price: 120.0
  },
  {
    image: './assests/NB_327.png',
    brand: 'New Balance',
    model: 'NB 327',
    price: 120.0
  },
  {
    image: './assests/Nike_DunkL.png',
    brand: 'Nike',
    model: 'Dunk Low',
    price: 100.0
  },
  {
    image: './assests/Adidas_Gazzelle.png',
    brand: 'Adidas',
    model: 'Gazelle',
    price: 90.0
  },
  {
    image: './assests/Nike_AirMaxSC.png',
    brand: 'Nike',
    model: 'Air Max SC',
    price: 150.0
  },
  {
    image: './assests/Adidas_HandballS.png',
    brand: 'Adidas',
    model: 'Handball Spezial',
    price: 120.0
  },
  {
    image: './assests/NB_480.png',
    brand: 'New Balance',
    model: 'NB 480',
    price: 150.0
  },
  {
    image: './assests/Nike_AirForce.png',
    brand: 'Nike',
    model: 'Air Force',
    price: 130.0
  },
  {
    image: './assests/NB_9060(2).png',
    brand: 'New Balance',
    model: 'NB 9060',
    price: 100.0
  },
  {
    image: './assests/Nike_FullForce.png',
    brand: 'Nike',
    model: 'Full Force',
    price: 70.0
  },
  {
    image: './assests/Nike_AirMaxSC(2).png',
    brand: 'Nike',
    model: 'Air Max SC',
    price: 160
  },
  {
    image: './assests/Adidas_HandballS(2).png',
    brand: 'Adidas',
    model: 'Handball Spezial',
    price: 140.0
  }
]
const PRICE_RANGES = [
  { label: 'Todos los precios', min: 0, max: Infinity },
  { label: 'Menos de €100', min: 0, max: 99.99 },
  { label: 'Entre €100 y €130', min: 100, max: 130 },
  { label: 'Más de €130', min: 130.01, max: Infinity }
]

let BRAND = ''
let PRICE_RANGE = PRICE_RANGES[0]

const createHeader = () => {
  const header = document.createElement('header')
  header.classList.add('flex-container')
  const logoDiv = document.createElement('div')
  logoDiv.classList.add('logo-container')
  const logoImg = document.createElement('img')
  logoImg.src = './assests/JD_Logo.png'
  logoImg.alt = 'Logo JD Sports'

  logoDiv.appendChild(logoImg)

  const nav = document.createElement('nav')
  const ul = document.createElement('ul')
  const optionNav = ['Hombre', 'Mujer', 'Niños', 'Ofertas']
  for (const option of optionNav) {
    const li = document.createElement('li')
    li.textContent = option
    ul.appendChild(li)
  }
  nav.appendChild(ul)

  const iconsDiv = document.createElement('div')
  iconsDiv.classList.add('icons-container')
  const icons = [
    { src: './assests/Icon_Filter.png' },
    { src: './assests/Icon_Shop.png' },
    { src: './assests/Icon_User.png' }
  ]
  for (const icon of icons) {
    const img = document.createElement('img')
    img.src = icon.src
    img.classList.add('icon-img')
    iconsDiv.appendChild(img)
  }
  header.appendChild(logoDiv)
  header.appendChild(nav)
  header.appendChild(iconsDiv)
  document.body.prepend(header)
}

const filter = () => {
  const filtered = ARTICLES.filter(
    (article) =>
      (article.brand === BRAND || BRAND === '') &&
      article.price >= PRICE_RANGE.min &&
      article.price <= PRICE_RANGE.max
  )

  printArticles(filtered)
}

const createSelectBrand = () => {
  const divFilters = document.querySelector('#filters')
  const selectBrand = document.createElement('select')
  selectBrand.id = 'selectBrand'
  const defaultOption = document.createElement('option')
  defaultOption.value = ''
  defaultOption.textContent = 'Todas las marcas'
  selectBrand.appendChild(defaultOption)

  const BRANDS = [...new Set(ARTICLES.map((article) => article.brand))]
  BRANDS.forEach((brand) => {
    const option = document.createElement('option')
    option.value = brand
    option.textContent = brand
    selectBrand.appendChild(option)
  })

  selectBrand.addEventListener('change', (event) => {
    BRAND = event.target.value
    filter()
  })

  divFilters.appendChild(selectBrand)
}

const createSelectPrice = () => {
  const divFilters = document.querySelector('#filters')
  const selectPrice = document.createElement('select')
  selectPrice.id = 'priceFilter'

  PRICE_RANGES.forEach((range) => {
    const option = document.createElement('option')
    option.value = JSON.stringify(range)
    option.textContent = range.label
    selectPrice.appendChild(option)
  })

  selectPrice.addEventListener('change', (event) => {
    PRICE_RANGE = JSON.parse(event.target.value)
    filter()
  })

  divFilters.appendChild(selectPrice)
}

const createClearButton = () => {
  const divFilters = document.querySelector('#filters')
  const clearButton = document.createElement('button')

  clearButton.classList.add('clear-filters')
  clearButton.textContent = 'Limpiar Filtros'

  clearButton.addEventListener('click', () => {
    BRAND = ''
    PRICE_RANGE = PRICE_RANGES[0]
    document.getElementById('selectBrand').selectedIndex = 0
    document.getElementById('priceFilter').selectedIndex = 0

    printArticles(ARTICLES)
  })

  divFilters.appendChild(clearButton)
}

const printArticles = (articles) => {
  const articleSection = document.querySelector('#articles')
  articleSection.classList.add('articles-container')
  articleSection.innerHTML = ''

  articles.forEach((article) => {
    const divArticle = document.createElement('div')
    const imgArticle = document.createElement('img')
    const divInfo = document.createElement('div')
    const brandInfo = document.createElement('h3')
    const modelInfo = document.createElement('p')
    const divPrice = document.createElement('div')
    const price = document.createElement('p')
    const buttonPrice = document.createElement('button')

    imgArticle.src = article.image
    brandInfo.textContent = article.brand
    modelInfo.textContent = article.model
    price.textContent = '€' + article.price.toFixed(2)
    buttonPrice.textContent = 'Comprar'

    divArticle.classList.add('article-card')
    divInfo.classList.add('article-info', 'flex')
    divPrice.classList.add('article-price', 'flex')
    buttonPrice.classList.add('buy-button')

    divArticle.appendChild(imgArticle)
    divArticle.appendChild(divInfo)
    divInfo.appendChild(brandInfo)
    divInfo.appendChild(modelInfo)
    divInfo.appendChild(price)
    divPrice.appendChild(buttonPrice)
    divArticle.appendChild(divPrice)
    articleSection.appendChild(divArticle)
  })
}

const createFooter = () => {
  const footer = document.getElementById('footer')

  const listas = [
    ['About Us', 'Contact Us', 'Careers'],
    ['Return', 'Shipping', 'Conditions']
  ]

  for (const lista of listas) {
    const ul = document.createElement('ul')
    for (const item of lista) {
      const li = document.createElement('li')
      li.textContent = item
      ul.appendChild(li)
    }
    footer.appendChild(ul)
  }
}

createFooter()
createHeader()
createSelectPrice()
createSelectBrand()
createClearButton()
printArticles(ARTICLES)
