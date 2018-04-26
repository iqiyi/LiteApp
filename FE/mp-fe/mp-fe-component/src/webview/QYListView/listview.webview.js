export default {
  listview_showRightIndex : function(){
    const blockIndexWrap = this.querySelector('.qy-listview-block_index_list');
    const centerEl = this.querySelector('.center_tip');
    let indexNow;
    const handler = (e)=>{
      e.stopPropagation();
      e.preventDefault();
      let index = document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY).getAttribute('rightindexblock');
      if(!index)return;
      if(index === indexNow)return;
      indexNow = index;
      showCenter(centerEl,index);
      let block = document.querySelector(`[blockindex=${index}]`)
      window.scrollTo(0,getOffset(block).top)
    }
    blockIndexWrap.addEventListener('touchmove',handler)
    blockIndexWrap.addEventListener('touchstart',handler)
  }
}

function getOffset(el) {
  el = el.getBoundingClientRect();
  return {
    hoverLeft : el.left,
    hoverTop : el.top,
    left: el.left + window.scrollX,
    top: el.top + window.scrollY
  }
}

function showCenter( centerEl , index ){
  if(!centerEl)return;
  centerEl.textContent = index;
  centerEl.style.display = 'block';
  setTimeout(()=>{
    centerEl.style.display = 'none';
  },1000)
}
