import './main.css'
//Insert your HTML code here to develop offline
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `


<div class="lica-wrapper">







<div class="lica-container">

    <nav class="header">
        <h2 class="header__title">Choose the language</h2>
        <div class="header__buttons">
            <button class="buttons__new_language">Add new language</button>
            <button class="buttons__spam">SPAM</button>
        </div>
        <input type="text" placeholder="Search...">
    </nav>


    <section class="lica-body">
        <div class="lica-btn">
            <p class="lica-btn__title">Title</p>
            <button class="lica-btn__edit">
                <svg width="64px" height="64px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Edit_Pencil_Line_02"> <path id="Vector" d="M4 20.0001H20M4 20.0001V16.0001L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L8 20.0001L4 20.0001Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
            </button>
            <button class="lica-btn__delete"></button>
        </div>

    </section>


    <footer class="footer">
        <div class="footer__button">
            <h1 class="footer__title">Empty template</h1>
            <button class="settings">Settings</button>
        </div>
    </footer>


</div>



    </div>


`
// ============================Uncomment for production===========================================
// setTimeout(() => {
//   const parent = document.querySelector('.menu-sidebar.sidebar') as HTMLElement;
//   parent.style.width = '400px';
//   const container = document.createElement('div')
//   container.innerHTML = `




//   <div class="lica-container">

//   <nav class="header">
//       <h2 class="header__title">Choose the language</h2>
//       <div class="header__buttons">
//           <button class="buttons__new_language">Add new language</button>
//           <button class="buttons__spam">SPAM</button>
//       </div>
//       <input type="text" placeholder="Search...">
//   </nav>


//   <section class="lica-body">
//       <div class="lica-btn">
//           <h3>Title</h3>
//           <button>Edit</button>
//       </div>
//   </section>


//   <footer class="footer">
//       <div class="footer__button">
//           <h1 class="footer__title">Empty template</h1>
//           <button class="settings">Settings</button>
//       </div>
//   </footer>


// </div>



//   `
//   container.classList.add('lica-wrapper')
//   parent?.appendChild(container)



//   const licaBody = document.querySelector('.lica-body') as HTMLElement;
//   const addNewLanguageBtn = document.querySelector('.buttons__new_language');
//   addNewLanguageBtn?.addEventListener('click', () => {
//       createButton(licaBody)
//   })
  
//   function createButton(parentToAppendTo:HTMLElement) {
//       const newButton = document.createElement('div')
//       newButton.classList.add('lica-btn')
//       const newButtonTitle = document.createElement('h3')
//       newButtonTitle.innerText = 'New Language'
//       const newButtonEdit = document.createElement('button')
//       newButtonEdit.innerText = 'Edit'
//       newButton.appendChild(newButtonTitle)
//       newButton.appendChild(newButtonEdit)
//       parentToAppendTo.appendChild(newButton)
//   }

// }, 2500);
// =======================================================================

interface Button {
    title: string,
    id: number,
    categories: any[];
}

// global variables
let buttonsArray: Button[] = JSON.parse(localStorage.getItem('langs') || '[]')
 
console.log(`buttonsArray:`, buttonsArray)
// ======================

const licaBody = document.querySelector('.lica-body') as HTMLElement;
const addNewLanguageBtn = document.querySelector('.buttons__new_language');
addNewLanguageBtn?.addEventListener('click', () => {
    const btnObj = {
        id: Date.now(),
        title: 'New button',
        categories: [],
    }
    buttonsArray.push(btnObj)
    createButton(licaBody, btnObj)
    localStorage.setItem('langs', JSON.stringify(buttonsArray))
})

function createButton(parentToAppendTo:HTMLElement, btnObj: Button) {
    const newButton = document.createElement('div')
    newButton.classList.add('lica-btn')
    const newButtonTitle = document.createElement('p')
    newButtonTitle.classList.add('lica-btn__title')
    newButtonTitle.innerText = btnObj.title;
    newButton.id = btnObj.id.toString();
    const newButtonEdit = document.createElement('button')
    newButtonEdit.classList.add('lica-btn__edit')
    const newButtonDelete = document.createElement('button')
    newButtonDelete.classList.add('lica-btn__delete')

    newButton.appendChild(newButtonTitle)
    newButton.appendChild(newButtonEdit)
    newButton.appendChild(newButtonDelete)

    function newButtonDeleteLogic(parentToAppendTo:HTMLElement) {
        newButtonDelete.addEventListener('click', (e: MouseEvent) => {
            e.stopPropagation();
            const newButtonAccept = document.createElement('button')
            newButtonAccept.classList.add('lica-btn__accept')
            newButtonEdit.replaceWith(newButtonAccept)
    
            const newButtonCancel = document.createElement('button')
            newButtonCancel.classList.add('lica-btn__cancel')
            newButtonDelete.replaceWith(newButtonCancel)
    
            newButtonCancel.addEventListener('click', (e: MouseEvent) => {
                e.stopPropagation()
                newButtonAccept.replaceWith(newButtonEdit)
                newButtonCancel.replaceWith(newButtonDelete)
            })
            
            newButtonAccept.addEventListener('click', (e: MouseEvent) => {
                e.stopPropagation()
                const parentElement = (e.target as HTMLElement).parentElement;
                const targetId = parentElement!.id;
    
                if(parentElement) {
                    parentElement.remove();
                }
                buttonsArray.forEach((item, index) => {
                    if(item.id === parseInt(targetId))
                    buttonsArray.splice(index, 1);
                })
                console.log(buttonsArray)
                localStorage.setItem("langs",JSON.stringify(buttonsArray))
            })
        })
    }
    newButtonDeleteLogic(newButton)
    
    function newButtonEditLogic(parentToAppendTo:HTMLElement) {
        newButtonEdit.addEventListener('click', (e) => {
            e.stopPropagation()
            const newButtonAccept = document.createElement('button')
            newButtonAccept.classList.add('lica-btn__accept')
            newButtonEdit.replaceWith(newButtonAccept)
    
            const newButtonCancel = document.createElement('button')
            newButtonCancel.classList.add('lica-btn__cancel')
            newButtonDelete.replaceWith(newButtonCancel)
    
            newButtonCancel.addEventListener('click', (e) => {
                e.stopPropagation()
                newButtonAccept.replaceWith(newButtonEdit)
                newButtonCancel.replaceWith(newButtonDelete)
                newBtnTitleInput.replaceWith(newButtonTitle)
            })
            
            const newBtnTitleInput = document.createElement('input')
            newBtnTitleInput.classList.add('lica-btn__input')
            newButtonTitle.replaceWith(newBtnTitleInput)
    
            newBtnTitleInput.addEventListener('click', (e) => {
                e.stopPropagation()
            })
    
            newButtonAccept.addEventListener('click', (e) => {
                e.stopPropagation()
                // debugger
                const inputValue = newBtnTitleInput.value;
                newButtonTitle.innerText = inputValue;
                buttonsArray.forEach((item, index) => {
                    if(item.id === btnObj.id) {
                        btnObj.title = inputValue;
                        buttonsArray.splice(index, 1,btnObj)
                    }
                })
                console.log(buttonsArray)   
                localStorage.setItem('langs', JSON.stringify(buttonsArray))

                newBtnTitleInput.remove();
                newButtonAccept.replaceWith(newButtonTitle)
                newButton.appendChild(newButtonAccept)
                newButtonAccept.replaceWith(newButtonEdit)
                newButtonCancel.replaceWith(newButtonDelete)
    
            })
        })
    }
    newButtonEditLogic(newButton)

    // button modal
    newButton.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(btnObj.title, btnObj.id);
    })

    // parent to append to
    parentToAppendTo.appendChild(newButton)
}


function renderLangButtons() {
    buttonsArray.forEach(item => {
        const btnObj = {
            id: item.id,
            title: item.title,
            categories: item.categories,
        }
        createButton(licaBody, btnObj)
    })
}
renderLangButtons()


// open modal function
function openModal(title: string, buttonID: number) {
    const categories = document.createElement('div')
    categories.classList.add('categories')
    categories.innerHTML = `
    <!-- modal-categories -->
        <div class="categories">
            <nav class="categories__header">
                <h2 class="categories__title"></h2>
                <div class="categories__buttons">
                    <button class="categories__back"><< Back</button>
                    <button class="categories__new_category">Add new category</button>
                    <button class="buttons__spam">SPAM</button>
                </div>
                <input type="text" placeholder="Search...">
            </nav>
            <div class="categories__body"></div>
            <footer class="categories__footer">
                <div class="categories__footer-button">
                    <h1 class="categories__footer-title">Empty template</h1>
                    <button class="categories__footer-seetings">Settings</button>
                </div>
            </footer>
        </div>

    `
    licaBody.appendChild(categories)
    // variables
    const categoriesBackBtn = document.querySelector('.categories__back') as HTMLElement;
    const addNewCatBtn = document.querySelector('.categories__new_category') as HTMLElement;
    const categoriesTitle = document.querySelector('.categories__title') as HTMLElement;
    categoriesTitle.innerText = title;


    // categories.dataset.id = buttonID.toString();
    categoriesBackBtn.addEventListener('click', (e:MouseEvent) => {
        addNewCatBtn.removeEventListener('click', addNewCategory)
        const element = e.target as HTMLElement;
        element.parentNode?.parentNode?.parentElement?.parentElement?.remove()
    })
    console.log(categories.dataset.id)




    addNewCatBtn.addEventListener('click', addNewCategory)

    function addNewCategory() {
        const newButton = document.createElement('div')
        newButton.classList.add('lica-btn')
        const newButtonTitle = document.createElement('p')
        newButtonTitle.classList.add('lica-btn__title')
        newButtonTitle.innerText = 'New Category'
        newButton.id = (Date.now()).toString();
        const newButtonEdit = document.createElement('button')
        newButtonEdit.classList.add('lica-btn__edit')
        const newButtonDelete = document.createElement('button')
        newButtonDelete.classList.add('lica-btn__delete')
        const categoriesBody = document.querySelector('.categories__body')

        const categoriesObj = {
            id: Date.now(),
            languageID: buttonID.toString(),
            title: newButtonTitle.innerText,
            templates: [],
        }

        buttonsArray.forEach(item => {
            if(item.id === parseInt(categoriesObj.languageID)) {
                item.categories.push(categoriesObj)
            }
        })
        localStorage.setItem('langs', JSON.stringify(buttonsArray))

            // ================================
            newButton.appendChild(newButtonTitle)
            newButton.appendChild(newButtonEdit)
            newButton.appendChild(newButtonDelete)
            categoriesBody?.appendChild(newButton)

            newButtonDelete.addEventListener('click', (e: MouseEvent) => {
                e.stopPropagation();
                const newButtonAccept = document.createElement('button')
                newButtonAccept.classList.add('lica-btn__accept')
                newButtonEdit.replaceWith(newButtonAccept)
        
                const newButtonCancel = document.createElement('button')
                newButtonCancel.classList.add('lica-btn__cancel')
                newButtonDelete.replaceWith(newButtonCancel)
        
                newButtonCancel.addEventListener('click', (e: MouseEvent) => {
                    e.stopPropagation()
                    newButtonAccept.replaceWith(newButtonEdit)
                    newButtonCancel.replaceWith(newButtonDelete)
                })
                
                newButtonAccept.addEventListener('click', (e: MouseEvent) => {
                    e.stopPropagation()
                    const parentElement = (e.target as HTMLElement).parentElement;
        
                    if(parentElement) {
                        parentElement.remove();
                    }

                    buttonsArray.forEach((item,index) => {
                        if(item.id === parseInt(categoriesObj.languageID)) {
                             item.categories.splice(index,1)
                        }
                    })

                    console.table(buttonsArray)
                    localStorage.setItem("langs",JSON.stringify(buttonsArray))
        
        
                })
            })
        
            newButtonEdit.addEventListener('click', (e) => {
                e.stopPropagation()
                const newButtonAccept = document.createElement('button')
                newButtonAccept.classList.add('lica-btn__accept')
                newButtonEdit.replaceWith(newButtonAccept)
        
                const newButtonCancel = document.createElement('button')
                newButtonCancel.classList.add('lica-btn__cancel')
                newButtonDelete.replaceWith(newButtonCancel)
        
                newButtonCancel.addEventListener('click', (e) => {
                    e.stopPropagation()
                    newButtonAccept.replaceWith(newButtonEdit)
                    newButtonCancel.replaceWith(newButtonDelete)
                    newBtnTitleInput.replaceWith(newButtonTitle)
                })
                
                const newBtnTitleInput = document.createElement('input')
                newBtnTitleInput.classList.add('lica-btn__input')
                newButtonTitle.replaceWith(newBtnTitleInput)
        
                newBtnTitleInput.addEventListener('click', (e) => {
                    e.stopPropagation()
                })
        
                newButtonAccept.addEventListener('click', (e) => {
                    e.stopPropagation()
                    const inputValue = newBtnTitleInput.value;
                    newButtonTitle.innerText = inputValue;
                    buttonsArray.forEach(item => {
                        if(item.id === parseInt(categoriesObj.languageID)) {
                            categoriesObj.title = inputValue;
                            localStorage.setItem('langs', JSON.stringify(buttonsArray))
                        }
                    })
                    newBtnTitleInput.remove();
                    newButtonAccept.replaceWith(newButtonTitle)
                    newButton.appendChild(newButtonAccept)
                    newButtonAccept.replaceWith(newButtonEdit)
                    newButtonCancel.replaceWith(newButtonDelete)
        
                })
            })

    }
}


