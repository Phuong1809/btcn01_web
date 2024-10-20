var menuFooterItems = document.querySelectorAll('#footer .menu-footer-item');
var menuFooterItemSelected = document.querySelector('#footer .menu-footer-item .footer-menu-selected');

for(let menuFooterItem of menuFooterItems){
    menuFooterItem.addEventListener('click', e=>{
        menuFooterItem.querySelector('a').classList.add('footer-menu-selected');
        menuFooterItemSelected.classList.remove('footer-menu-selected');
        menuFooterItemSelected = menuFooterItem.querySelector('a');
    })
}