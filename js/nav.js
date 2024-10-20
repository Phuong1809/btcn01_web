var navItems = document.querySelectorAll('#nav .menu-item');
var navItemSelected = document.querySelector('#nav .menu-item.nav-menu-selected')

for(let navItem of navItems){
    navItem.addEventListener('click', e=>{
        e.target.classList.add('nav-menu-selected');
        navItemSelected.classList.remove('nav-menu-selected');
        navItemSelected = e.target;
    })
}