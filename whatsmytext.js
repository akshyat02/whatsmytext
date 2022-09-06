
  function newtitle(newTitle) {
    document.title = newTitle;
  }

  const toggle = document.getElementById("theme-toggle");
  const inputVal = document.getElementsByClassName('inputVal')[0];
  const addTaskBtn = document.getElementsByClassName('btn')[0];
  const clearTaskBtn = document.getElementsByClassName('clearTask')[0];
  const titlename = "whatsmytext";
  var discomode = false;
  var discospeed = 100;
  var backuptoggle = document.documentElement.getAttribute('data-theme');

  const checkbox = document.getElementById('checkbox');
  checkbox.addEventListener('change', () => {
    try {
      clearInterval(disco);
    }
    catch (err) { }
    finally {
      toggling();
    }
  })

  function toggling() {
    var currentTheme = document.documentElement.getAttribute("data-theme");

    var targetTheme = "light";
    if (currentTheme === "light") {
      targetTheme = "dark";
      document.querySelector('meta[name="theme-color"').setAttribute('content', '#1b1b1b')
    } else {
      targetTheme = "light";
      document.querySelector('meta[name="theme-color"').setAttribute('content', '#e0e5ec')
    }

    document.documentElement.setAttribute('data-theme', targetTheme);

  }
  function icon(e) {
    e.firstElementChild.classList.toggle("fa-sun");
  }

  addTaskBtn.addEventListener('click', function () {

    if (inputVal.value.trim() != 0) {
      let localItems = JSON.parse(localStorage.getItem('localItem'))
      if (localItems === null) {
        taskList = []

      } else {
        taskList = localItems;
      }
      taskList.push(inputVal.value)
      localStorage.setItem('localItem', JSON.stringify(taskList));
    }
    newtitle("Added text to whatsmytext");
    setTimeout(newtitle, 1000, titlename);
    showItem()
    inputVal.value = "";
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  inputVal.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      if (inputVal.value.trim() == "--clear all") {
        localStorage.clear()
        newtitle("Cleared all texts from whatsmytext");
        setTimeout(newtitle, 3000, titlename);
        showItem()
        inputVal.value = "";
      }
      else if (inputVal.value.trim() == "--disco start") {
        inputVal.value = "";
        checkbox.parentElement.style = "width: 0; overflow: hidden; margin-left: 0; opacity: 0;";
        discostart();
      }
      else if (inputVal.value.trim() == "--disco stop") {
        inputVal.value = "";
        checkbox.parentElement.style = "width: 50px; overflow: visible; margin-left: 20px; opacity: 1;";
        discostop();
      }
      else if (inputVal.value.trim() == "--disco slow") {
        inputVal.value = "";
        if (discomode) {
          discospeed += 100;
          discostop();
          discostart();
        }
        else {
          alert("Turn ON Disco Mode first");
        }
      }
      else if (inputVal.value.trim() == "--disco speed") {
        inputVal.value = "";
        if (discomode) {
          if (discospeed > 100) {
            discospeed -= 100;
            discostop();
            discostart();
          }
          else if (discospeed <= 100 && discospeed > 20) {
            discospeed -= 20;
            discostop();
            discostart();
          }
          else {
            checkbox.parentElement.style = "width: 50px; overflow: visible; margin-left: 20px; opacity: 1;";
            discostop();
          }
        }
        else {
          alert("Turn ON Disco Mode first");
        }
      }
      else if (inputVal.value.trim() == "--refresh") {
        showItem();
        inputVal.value = "";
      }
      else {
        addTaskBtn.click();
        newtitle("Added text to whatsmytext");
        setTimeout(newtitle, 1000, titlename);
      }
    }
  })
  function discostart() {
    if (discomode) {
    } else {
      backuptoggle = document.documentElement.getAttribute("data-theme");
      backupthemecolor = document.querySelector('meta[name="theme-color"]').getAttribute("content");
      discomode = true;
      disco = setInterval(() => {
        toggling();
      }, discospeed);
    }
  }
  function discostop() {
    if (discomode) {
      clearInterval(disco);
      document.documentElement.setAttribute('data-theme', backuptoggle);
      document.querySelector('meta[name="theme-color"]').setAttribute('content', backupthemecolor);
      discomode = false;
    }
  }
  function showItem() {
    let localItems = JSON.parse(localStorage.getItem('localItem'))
    if (localItems === null) {
      taskList = []

    } else {
      taskList = localItems;
    }


    let html = '';
    let itemShow = document.querySelector('.myTodo');
    var b = false;
    taskList.forEach((data, index) => {
      b = !b;
      if (b == true) {
        html = `
<div data-aos="flip-right" class="todoList" style="background-color: var(--evendiv) !important;">
<p class="pText" onClick="copy(this)">${data}</p>
<button class="deleteTask" onClick="deleteItem(${index})">
  <i class="fa-regular fa-circle-minus"></i>  
</button>
</div>
`+ html
      }
      else {
        html = `
<div data-aos="zoom-in-up" class="todoList">
<p class="pText" onClick="copy(this)">${data}</p>
<button class="deleteTask" onClick="deleteItem(${index})">
  <i class="fa-regular fa-circle-minus"></i>  
</button>
</div>
`+ html
      }
    })
    itemShow.innerHTML = html;
  }
  showItem()
  function copy(that) {
    var inp = document.createElement('input');
    document.body.appendChild(inp);
    inp.value = that.textContent;
    inp.select();
    document.execCommand('copy', that);
    inp.remove();
    newtitle("Copied! "+that.innerHTML);
    setTimeout(newtitle, 1000, titlename);
  }
  function deleteItem(index) {

    let localItems = JSON.parse(localStorage.getItem('localItem'))
    taskList.splice(index, 1)
    localStorage.setItem('localItem', JSON.stringify(taskList));
    showItem();
    newtitle("Deleted text from whatsmytext");
    setTimeout(newtitle, 1000, titlename);
  }

  function clearTask() {
    inputVal.focus();
    if (inputVal.value == "clear all") {

      localStorage.clear();
      newtitle("Cleared all texts from whatsmytext");
      setTimeout(newtitle, 3000, titlename);
      showItem();
      inputVal.value = "";
    }
    else {
      inputVal.placeholder = "Type 'clear all' to clear everything.";
      window.alert("Type 'clear all' before pressing clear button to clear everything. ");
      setInterval(function () {
        inputVal.placeholder = "Add your task... max(150)";
      }, 5000)
    }
  }


  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const scrollToBottomBtn = document.getElementById("scrollToBottomBtn");

  window.onscroll = function () { scrollFunction() };

  function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      scrollToTopBtn.style.display = "block";
      scrollToBottomBtn.style.display = "none";
    } else {
      scrollToTopBtn.style.display = "none";
      scrollToBottomBtn.style.display = "block";
    }
  }
  function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  };
  function bottomFunction() {
    document.getElementById('site-footer').scrollIntoView({ behavior: "smooth" });
  }


  scrollToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    topFunction();
  });

  scrollToBottomBtn.addEventListener("click", function (e) {
    e.preventDefault();
    bottomFunction();
  });

