import './main.css'
//Insert your HTML code here to develop offline
// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
// <div class="menu-sidebar sidebar">


//     <div class="container">
//         <h1>hello</h1>
//     </div>


// </div>
// `
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
