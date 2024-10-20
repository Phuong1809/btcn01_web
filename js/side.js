const news =  [
    {
      "title": "NEWS 01",
      "content": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quaerat maxime vitae nam optio corporis molestias cum, magnam ab? Sequi amet a quisquam, error delectus saepe quia laborum illo natus.1"
    },
    {
      "title": "NEWS 02",
      "content": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quaerat maxime vitae nam optio corporis molestias cum, magnam ab? Sequi amet a quisquam, error delectus saepe quia laborum illo natus.2"
    },
    {
      "title": "NEWS 03",
      "content": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quaerat maxime vitae nam optio corporis molestias cum, magnam ab? Sequi amet a quisquam, error delectus saepe quia laborum illo natus.3"
    },
    {
      "title": "NEWS 04",
      "content": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quaerat maxime vitae nam optio corporis molestias cum, magnam ab? Sequi amet a quisquam, error delectus saepe quia laborum illo natus.4"
    }
];

var sideContent = document.getElementById('side');
for(let i = 0; i <= news.length;i++){
    let type = 'even-new-head-bgcolor'
    if(i % 2 === 0){
        type = 'odd-new-head-bgcolor';
    }
    if(i == news.length){
      sideContent.innerHTML += `<div id="blog-empty"></div>`;
      break;
    }
    // draggable="false"
    let temp = i + 1;
    sideContent.innerHTML += `
        <div id="blog-${temp}" class="news-blog" draggable="false" >
            <div class="news-title ${type} open">
                <i class="ti-arrow-down arrow-down"></i>
                <i class="ti-control-play control-play display-none"></i>
                <p>${news[i].title}</p>
                <i class="ti-arrows-vertical arrows-vertical"></i>
            </div>
            <div class="news-content"><p>${news[i].content}</p></div>
        </div>
    `;
}

var controlPlays = document.querySelectorAll('.news-blog .news-title .control-play');
controlPlays.forEach(ele =>ele.addEventListener('click', (e) =>{
    let title = e.target.parentNode;
    let content = title.nextElementSibling;
    let arrowDown = title.querySelector('.arrow-down');
    console.log(title,content,arrowDown);
    e.target.classList.add('display-none');
    content.classList.remove('display-none');
    arrowDown.classList.remove('display-none');        
}))
var arrowDowns = document.querySelectorAll('.news-blog .news-title .arrow-down');
arrowDowns.forEach(ele => ele.addEventListener('click',e=>{
    let title = e.target.parentNode;
    let content = title.nextElementSibling;
    let controlPlay = title.querySelector('.control-play');
    e.target.classList.add('display-none');
    content.classList.add('display-none');
    controlPlay.classList.remove('display-none');
}))


var arrowsVerticals = document.querySelectorAll('.news-blog .news-title .arrows-vertical');
for(let arrowsVertical of arrowsVerticals){
  arrowsVertical.addEventListener('mousedown',e=>{
    let temp = e.target;
    while(temp.parentElement !== sideContent){
      temp = temp.parentElement;
    }
    temp.setAttribute('draggable','true');
  })
  arrowsVertical.addEventListener('mouseup',e=>{
    let temp = e.target;
    while(temp.parentElement !== sideContent){
      temp = temp.parentElement;
    }
    temp.setAttribute('draggable','false');
  })
}
var newBlogs = document.querySelectorAll('.news-blog');
var dragId = null;
newBlogs.forEach(ele =>{
  ele.addEventListener('dragstart', e=>{
    dragId = e.target.id;
  });
  ele.addEventListener('dragover',e=>{
    e.preventDefault()
    let temp = e.target;
    while(temp.parentElement !== sideContent){
      temp = temp.parentElement;
    }
    let dragEle = document.querySelector('#' + dragId);
    if(temp.compareDocumentPosition(dragEle) ==2 ){
      sideContent.insertBefore(dragEle,temp.nextElementSibling);
    }else {
      sideContent.insertBefore(dragEle,temp);
    }
    
  });
  ele.addEventListener('drop', e=>{
    e.preventDefault();
    let dragEle = document.querySelector('#' + dragId);
    dragEle.setAttribute('draggable','false');
    console.log(dragEle.draggble);
    dragId = null;
  })
})