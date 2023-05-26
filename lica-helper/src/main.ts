import './main.css'
//Insert your HTML code here to develop offline
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="menu-sidebar sidebar">




<div class="container">
    <nav class="header">
        <h2 class="header__title">Choose the language</h2>
        <div class="header__buttons">
            <button>Add new language</button>
            <button>SPAM</button>
        </div>
    </nav>
    <section class="body"></section>
    <footer class="footer">
        <div class="footer__button">
            <h1 class="footer__title">Empty template</h1>
            <button class="settings">Settings</button>
        </div>
    </footer>
</div>




</div>
`
// =======================================================================
setTimeout(() => {
  const parent = document.querySelector('.menu-sidebar.sidebar');
  const container = document.createElement('div')
  container.id = 'container'
  parent?.appendChild(container)

  container.innerHTML = `
    <div class="container">
        <h1>hello</h1>
    </div>
  `
}, 2500);
// =======================================================================
