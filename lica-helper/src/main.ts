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



// global variables
let buttonsArray = JSON.parse(localStorage.getItem('langs') || '[]')
 
console.log(`buttonsArray:`, buttonsArray)
// ======================

const licaBody = document.querySelector('.lica-body') as HTMLElement;
const addNewLanguageBtn = document.querySelector('.buttons__new_language') as  HTMLElement;
const spamBtn = document.querySelector('.buttons__spam') as HTMLElement;

spamBtn.addEventListener('click', () => {
    console.log(buttonsArray)
})


interface BtnObject {
    id: string,
    title: string,
    categories: [][],
}
interface CategoryObj {
    id: string,
    title: string,
    templates: [],
    languageID: string,
}
interface TemplateObj {
    id: string,
    title: string,
    text: string,
    categoryID: string,
}

// Add new language - listener
addNewLanguageBtn.addEventListener('click', () => {
    const btnObject: BtnObject = {
        id: (Date.now()).toString(),
        title: 'New Language',
        categories: [],
    }

    buttonsArray.push(btnObject)
    console.log(buttonsArray)
    localStorage.setItem('langs', JSON.stringify(buttonsArray))
    createButton(btnObject,licaBody)

})
// 1 level.
function createButton(btnObject: BtnObject, parent:HTMLElement) {
    // create main button
    const newButton = document.createElement('div')
    parent.appendChild(newButton)
    const newButtonTitle = document.createElement('p')
    newButtonTitle.classList.add('lica-btn__title')
    newButtonTitle.innerText = btnObject.title;
    newButton.appendChild(newButtonTitle)
    newButton.id = btnObject.id;
    newButton.classList.add('lica-btn')

    createEditBtn(newButton, btnObject)
    createDeleteBtn(newButton, btnObject)

        //Level 2
        newButton.addEventListener('click', () => {
            categoriesModal(btnObject)
        })
}

function createEditBtn(parent:HTMLElement, btnObject:BtnObject) {
    const btnEdit = document.createElement('button')
    btnEdit.classList.add('lica-btn__edit')
    parent.appendChild(btnEdit);

    // btnEdit listener
    btnEdit.addEventListener('click', (e) => {
        e.stopPropagation()
        editButtonsChange(btnObject)
    })
}
function editButtonsChange(btnObject:BtnObject) {
    const parent = document.getElementById(btnObject.id)
    const btnTitle = parent?.querySelector('.lica-btn__title') as HTMLElement
    const btnEdit = parent?.querySelector('.lica-btn__edit') as HTMLElement
    const btnDelete = parent?.querySelector('.lica-btn__delete') as HTMLElement
    
    
    editBtnChange(btnEdit)
    function editBtnChange(parent: HTMLElement) {
        // change edit btn to accept btn, delete btn to cancel btn
        const acceptBtn = document.createElement('button')
        acceptBtn.classList.add('lica-btn__accept')
        parent.replaceWith(acceptBtn)

        replaceTitleWithInput(parent, btnObject)
        function replaceTitleWithInput(parent: HTMLElement, btnObject:BtnObject) {
            // replace title with input
            const input = document.createElement('input')
            const cancelBtn = document.createElement('button')
            cancelBtn.classList.add('lica-btn__cancel')
            parent.appendChild(input)
            input.classList.add('lica-btn__input')
            btnTitle.replaceWith(input)

                changeTitle(parent,btnObject)
                function changeTitle(parent: HTMLElement, btnObject:BtnObject) {
                    // change title of the button based on input
                    acceptBtn.addEventListener('click', () => {
                        btnObject.title = input.value;
                        btnTitle.innerText = input.value;
                        localStorage.setItem('langs', JSON.stringify(buttonsArray))
                        input.replaceWith(btnTitle)
                        acceptBtn.replaceWith(btnEdit)
                        cancelBtn.replaceWith(btnDelete)

                    })
                }
                cancelBtnChange(parent,btnObject)
                function cancelBtnChange(parent:HTMLElement, btnObject:BtnObject) {
                    btnDelete.replaceWith(cancelBtn)
                    cancelBtn.addEventListener('click', () => {
                        cancelBtn.replaceWith(btnDelete)
                        input.replaceWith(btnTitle)
                        acceptBtn.replaceWith(btnEdit)
                    })
                }

                cancelBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                })

                input.addEventListener('click', (e) => {
                    e.stopPropagation();
                })
        }

        acceptBtn.addEventListener('click', (e) => {
            e.stopPropagation();
        })
        
    }

    editBtnDelete(btnDelete)
    function editBtnDelete(parent: HTMLElement) {
         // change delete btn to accept btn
         const acceptBtn = document.createElement('button')
         acceptBtn.classList.add('lica-btn__accept')
         parent.replaceWith(acceptBtn)
    }

}

function createDeleteBtn(parent:HTMLElement,btnObject:BtnObject) {
    const btnDelete = document.createElement('button')
    btnDelete.classList.add('lica-btn__delete')
    parent.appendChild(btnDelete);

    deleteBtnsChange(parent,btnObject)
    function deleteBtnsChange(parent:HTMLElement,btnObject:BtnObject) {
        btnDelete.addEventListener('click', (e) => {
            e.stopPropagation()
            const btnEdit = parent?.querySelector('.lica-btn__edit') as HTMLElement
            const acceptBtn = document.createElement('button')
            const cancelBtn = document.createElement('button')
            acceptBtn.classList.add('lica-btn__accept')
            cancelBtn.classList.add('lica-btn__cancel')

            btnEdit.replaceWith(acceptBtn)
            btnDelete.replaceWith(cancelBtn)

            acceptBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                buttonsArray.forEach((item,index)  => {
                    if(item.id === btnObject.id) {
                        buttonsArray.splice(index,1)
                        localStorage.setItem('langs', JSON.stringify(buttonsArray))
                        parent.remove();
                    }
                })
            })
            cancelBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                acceptBtn.replaceWith(btnEdit)
                cancelBtn.replaceWith(btnDelete)
            })
        })
    }
}




// render language buttons - lvl 1
renderLanguages(licaBody)
function renderLanguages(parent:HTMLElement) {
    buttonsArray.forEach(item => {
        // create main button
        const newButton = document.createElement('div')
        parent.appendChild(newButton)
        const newButtonTitle = document.createElement('p')
        newButtonTitle.classList.add('lica-btn__title')
        newButtonTitle.innerText = item.title;
        newButton.appendChild(newButtonTitle)
        newButton.id = item.id;
        newButton.classList.add('lica-btn')

        createEditBtn(newButton, item)
        createDeleteBtn(newButton, item)

                //Level 2
                newButton.addEventListener('click', () => {
                    categoriesModal(item)
                })
    })

}















function categoriesModal(btnObject:BtnObject) {

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
                    <button class="categories__footer-settings">Settings</button>
                </div>
            </footer>
        </div>

    `
    licaBody.appendChild(categories)

    const categoriesBackBtn = document.querySelector('.categories__back') as HTMLElement;
    const addNewCatBtn = document.querySelector('.categories__new_category') as HTMLElement;
    const categoriesTitle = document.querySelector('.categories__title') as HTMLElement;
    categoriesTitle.innerText = btnObject.title;
    categories.id = btnObject.id
    const categoriesBody = document.querySelector('.categories__body') as HTMLElement;


    // back btn
    categoriesBackBtn.addEventListener('click', () => {
        categories.remove();
    })

    // add new category buttons
    addNewCatBtn.addEventListener('click', () => {
        const categoryObj: CategoryObj = {
            id: (Date.now()).toString(),
            title: 'New Category',
            languageID: (btnObject.id).toString(),
            templates: [],
        }

        // adding category object to buttons[category]
        buttonsArray.forEach(item => {
            if(item.id === categoryObj.languageID) {
                item.categories.push(categoryObj)
            }           
        })
        console.log(buttonsArray)
        localStorage.setItem('langs', JSON.stringify(buttonsArray))

        createButton(btnObject, categoryObj, categoriesBody)
        categoriesBody.innerHTML = ''

    })
    function createButton(btnObject:BtnObject, categoryObj:CategoryObj, parent:HTMLElement) {
        // create main button
        const newButton = document.createElement('div')
        parent.appendChild(newButton)
        const newButtonTitle = document.createElement('p')
        newButtonTitle.classList.add('lica-btn__title')
        newButtonTitle.innerText = categoryObj.title;
        newButton.appendChild(newButtonTitle)
        newButton.id = categoryObj.id;
        newButton.classList.add('lica-btn')


        // create edit btn
        createEditBtnCategories(btnObject,categoryObj,newButton)
        function createEditBtnCategories(btnObject:BtnObject, categoryObj:CategoryObj, parent:HTMLElement) {
            const editBtn = document.createElement('button')
            editBtn.classList.add('lica-btn__edit')
            parent.appendChild(editBtn)

            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();

                // change title to input, and add accept and cance lbuttons
                buttonsChange(btnObject,categoryObj,newButton)
                function buttonsChange(btnObject:BtnObject, categoryObj:CategoryObj, parent:HTMLElement){
                    const btnEdit = parent.querySelector('.lica-btn__edit') as HTMLElement
                    const btnDelete = parent.querySelector('.lica-btn__delete') as HTMLElement
                    const btnTitle = parent.querySelector('.lica-btn__title') as HTMLElement

                    const input = document.createElement('input')
                    input.classList.add('lica-btn__input')
                    btnTitle.replaceWith(input)

                    const acceptBtn = document.createElement('button')
                    acceptBtn.classList.add('lica-btn__accept')
                    btnEdit.replaceWith(acceptBtn)

                    const cancelBtn = document.createElement('button')
                    cancelBtn.classList.add('lica-btn__cancel')
                    btnDelete.replaceWith(cancelBtn)

                    //input
                    input.addEventListener('click', (e) => {
                        e.stopPropagation()
                    })

                    //accept
                    acceptBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        categoryObj.title = input.value;
                        newButtonTitle.innerText = input.value; 
                        localStorage.setItem('langs', JSON.stringify(buttonsArray))
                        console.log(buttonsArray)

                        input.replaceWith(btnTitle)
                        acceptBtn.replaceWith(btnEdit)
                        cancelBtn.replaceWith(btnDelete)
                    })

                    // cancel 
                    cancelBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        input.replaceWith(btnTitle)
                        acceptBtn.replaceWith(btnEdit)
                        cancelBtn.replaceWith(btnDelete)
                    })
                }
            })
        }
        // create delete btn
        createDeleteBtnCategories(btnObject,categoryObj,newButton)
        function createDeleteBtnCategories(btnObject:BtnObject, categoryObj:CategoryObj, parent:HTMLElement) {
            const deleteBtn = document.createElement('button')
            deleteBtn.classList.add('lica-btn__delete')
            parent.appendChild(deleteBtn) 

            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();

                // change buttons to accept and cancel
                buttonsChange(btnObject,categoryObj,newButton)
                function buttonsChange(btnObject:BtnObject, categoryObj:CategoryObj, parent:HTMLElement) {
                    const btnEdit = parent.querySelector('.lica-btn__edit') as HTMLElement
                    const btnDelete = parent.querySelector('.lica-btn__delete') as HTMLElement


                    const acceptBtn = document.createElement('button')
                    acceptBtn.classList.add('lica-btn__accept')
                    btnEdit.replaceWith(acceptBtn)

                    const cancelBtn = document.createElement('button')
                    cancelBtn.classList.add('lica-btn__cancel')
                    btnDelete.replaceWith(cancelBtn)

                    //accept
                    acceptBtn.addEventListener('click', (e:MouseEvent) => {
                        e.stopPropagation();
                        const parent = e.currentTarget as HTMLElement;
                        buttonsArray.forEach(item => {
                            item.categories.forEach((category,index) => {
                                if(category.id === parent.parentElement.id) {
                                    item.categories.splice(index, 1)
                                    parent.parentElement.remove()
                                    localStorage.setItem('langs', JSON.stringify(buttonsArray))
                                }
                            })
                        })
                    })

                    //cancel
                    cancelBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        acceptBtn.replaceWith(btnEdit)
                        cancelBtn.replaceWith(btnDelete)
                    })
                }
            })
        }

        newButton.addEventListener('click', () => {
            categoriesBody.innerHTML = ''
            renderTemplates(categoryObj)
        })
    }


    // render logic for lvl 2
    renderCategories(btnObject)
    function renderCategories(btnObject:BtnObject) {
        buttonsArray.forEach(item => {
            item.categories.forEach(category => {
                if(category.languageID === categories.id) {
                    createButton(btnObject, category, categoriesBody)
                }
            })
        })
    }














    //render templates for categories - lvl 3
    function renderTemplates(categoryObj:CategoryObj) {
    
    const templates = document.createElement('div')
    templates.classList.add('templates')
    templates.innerHTML = `
    <!-- modal-templates -->
        <div class="templates">
            <nav class="templates__header">
                <h2 class="templates__title"></h2>
                <div class="templates__buttons">
                    <button class="templates__back"><< Back</button>
                    <button class="templates__new_template">Add new template</button>
                    <button class="buttons__spam">SPAM</button>
                </div>
                <input type="text" placeholder="Search...">
            </nav>
            <div class="templates__body"></div>
            <footer class="templates__footer">
                <div class="templates__footer-button">
                    <h1 class="templates__footer-title">Empty template</h1>
                    <button class="templates__footer-settings">Settings</button>
                </div>
            </footer>
        </div>

    `
    categoriesBody.appendChild(templates)

    const templatesBackBtn = document.querySelector('.templates__back') as HTMLElement;
    const addNewTemplateBtn = document.querySelector('.templates__new_template') as HTMLElement;
    const templatesTitle = document.querySelector('.templates__title') as HTMLElement;
    templatesTitle.innerText = categoryObj.title;
    templates.id = categoryObj.id
    const templatesBody = document.querySelector('.templates__body') as HTMLElement;


    // back btn
    templatesBackBtn.addEventListener('click', () => {
        templates.remove();
    })

    // add new template buttons
    addNewTemplateBtn.addEventListener('click', (e) => {
        const templateObj: TemplateObj = {
            id: (Date.now()).toString(),
            title: 'New Template',
            categoryID: (categoryObj.id).toString(),
            text: `Ваш шаблон / Your template goes here`
        }
        const parent = e.target as HTMLElement;

        buttonsArray.forEach(item => {
            item.categories.forEach(category => {
                if(category.id === templateObj.categoryID) {
                    category.templates.push(templateObj)
                    localStorage.setItem('langs', JSON.stringify(buttonsArray))
                    console.log(buttonsArray)
                }
            })
        })
        
        createTemplate(templateObj, categoryObj, templatesBody)
        
    })

    // create button
    function createTemplate(templateObj: TemplateObj, categoryObj:CategoryObj, parent: HTMLElement ) {
        // create main button
        const newButton = document.createElement('div')
        parent.appendChild(newButton)
        const newButtonTitle = document.createElement('p')
        newButtonTitle.classList.add('lica-btn__title')
        newButtonTitle.innerText = templateObj.title;
        newButton.appendChild(newButtonTitle)
        newButton.id = templateObj.id;
        newButton.classList.add('lica-btn')

        // create edit btn
        createEditBtnTemplate(templateObj,categoryObj,newButton)
        function createEditBtnTemplate(templateObj: TemplateObj, categoryObj:CategoryObj, parent: HTMLElement) {
            const editBtn = document.createElement('button')
            editBtn.classList.add('lica-btn__edit')
            parent.appendChild(editBtn)

            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();

                // change title to input, and add accept and cancel buttons
                buttonsChange(templateObj,categoryObj,newButton)
                function buttonsChange(templateObj: TemplateObj, categoryObj:CategoryObj, parent:HTMLElement){
                    const btnEdit = parent.querySelector('.lica-btn__edit') as HTMLElement
                    const btnDelete = parent.querySelector('.lica-btn__delete') as HTMLElement
                    const btnTitle = parent.querySelector('.lica-btn__title') as HTMLElement

                    const input = document.createElement('input')
                    input.classList.add('lica-btn__input')
                    btnTitle.replaceWith(input)

                    const acceptBtn = document.createElement('button')
                    acceptBtn.classList.add('lica-btn__accept')
                    btnEdit.replaceWith(acceptBtn)

                    const cancelBtn = document.createElement('button')
                    cancelBtn.classList.add('lica-btn__cancel')
                    btnDelete.replaceWith(cancelBtn)

                    //input
                    input.addEventListener('click', (e) => {
                        e.stopPropagation()
                    })

                    //accept
                    acceptBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        templateObj.title = input.value;
                        newButtonTitle.innerText = input.value; 
                        localStorage.setItem('langs', JSON.stringify(buttonsArray))
                        console.log(buttonsArray)

                        input.replaceWith(btnTitle)
                        acceptBtn.replaceWith(btnEdit)
                        cancelBtn.replaceWith(btnDelete)
                    })

                    // cancel 
                    cancelBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        input.replaceWith(btnTitle)
                        acceptBtn.replaceWith(btnEdit)
                        cancelBtn.replaceWith(btnDelete)
                    })
                }
            })
        }

        // create delete btn
        createDeleteBtnCategories(templateObj,categoryObj,newButton)
        function createDeleteBtnCategories(templateObj: TemplateObj, categoryObj:CategoryObj, parent: HTMLElement) {
            const deleteBtn = document.createElement('button')
            deleteBtn.classList.add('lica-btn__delete')
            parent.appendChild(deleteBtn) 

            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();

                // change buttons to accept and cancel
                buttonsChange(templateObj,categoryObj,newButton)
                function buttonsChange(templateObj: TemplateObj, categoryObj:CategoryObj, parent:HTMLElement) {
                    const btnEdit = parent.querySelector('.lica-btn__edit') as HTMLElement
                    const btnDelete = parent.querySelector('.lica-btn__delete') as HTMLElement


                    const acceptBtn = document.createElement('button')
                    acceptBtn.classList.add('lica-btn__accept')
                    btnEdit.replaceWith(acceptBtn)

                    const cancelBtn = document.createElement('button')
                    cancelBtn.classList.add('lica-btn__cancel')
                    btnDelete.replaceWith(cancelBtn)

                    //accept
                    acceptBtn.addEventListener('click', (e:MouseEvent) => {
                        e.stopPropagation();
                        const parent = e.currentTarget as HTMLElement;
                        // loop over languages. item = langauge
                        buttonsArray.forEach(item => { 
                            // loop over categoris. category = category
                            item.categories.forEach((category,index) => {
                                // loop over templates. template = template
                                category.templates.forEach((template,index) => {
                                    if(template.id === parent.parentElement.id) {
                                        category.templates.splice(index, 1)
                                        console.log(buttonsArray)
                                        parent.parentElement.remove()
                                        localStorage.setItem('langs', JSON.stringify(buttonsArray))
                                    }
                                })
                                    
                            })
                        })
                    })

                    //cancel
                    cancelBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        acceptBtn.replaceWith(btnEdit)
                        cancelBtn.replaceWith(btnDelete)
                    })
                }
            })
        }
    }





        // render logic for lvl 3
        renderCategories(categoryObj)
        function renderCategories(categoryObj:CategoryObj) {
            buttonsArray.forEach(item => {
                item.categories.forEach(category => {
                    category.templates.forEach(template => {
                        if(template.categoryID === templates.id) {
                            createButton(categoryObj, template, templatesBody)
                        }
                    })
                    if(category.languageID === categories.id) {
                        createButton(btnObject, category, categoriesBody)
                    }
                })
            })
        }

} 
}


// Логика для добавления 3ьего уровня - рабоатет. Но теперь надо сделать рендер 



















