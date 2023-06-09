// aos 初始化
AOS.init();

// // nav選單切換
const nav = document.getElementById('nav')
const icon = document.getElementById('icon')

icon.addEventListener('click', () => {
  nav.style.display = nav.style.display == 'none' ? 'block' : 'none';
})


// -------------------------我是分隔線--------------------------------

// 新增user資料庫、文字
let userData = [];
const user = document.getElementById('user');
let content = ""

// 串接user
function getUserData() {
  axios('https://randomuser.me/api/')
    .then((res) => {
      userData.push(res.data.results)
    })
    .catch((error) => console.log(error));
}

// 新增四筆
function getCountUser() {
  for (let i = 0; i < 4; i++) {
    getUserData();
  }
  addUser()
}

// 確認取得資料
function addUser() {
  let checkUser =
    setInterval(() => {
      if (userData.length == 4) {
        dataAll();
        addHtml();
        console.log(userData);
        clearInterval(checkUser) //取得四筆資料後停止程式碼
      }
    }, 100)
}
// 新增資料
function addHtml() {
  user.innerHTML = content
}

function dataAll() {
  userData.forEach(function (item) {
    content += `      <div class="flex justify-center   md:w-1/2  md:mb-14 xl:mb-32 mb-10 jdustify-center  group xl:pl-10  "  >
    <img src="${item.[0].picture.large}" alt="" 
      class="md:w-1/2 group-hover:outline group-hover:outline-[5px] md:group-hover:outline-[10px] brightness-50 group-hover:brightness-100 group-hover:outline-primary  group-hover:shadow-2xl duration-300 w-[150px] h-[150px] object-cover object-center    sm:w-[250px] sm:h-[250px]  md:h-[300px]  xl:w-[350px] xl:h-full">
    <div class="pl-4 md:pl-4  sm:mt-14 xl:pl-12  xl:mt-24 w-1/2">
      <p class="font-bold text-lg sm:text-[20px]  2xl:text-[40px] xl:mb-3">${item.[0].name.first}${item.[0].name.last}</p>
      <p class="text-xs 2xl:text-xl overflow-hidden">${item.[0].email}</p>
      <div
        class="w-[80px] h-[80px] bg-gray-light3 rounded-full  relative flex justify-center items-center mt-11  group-hover:bg-primary duration-300 scale-50 xl:scale-100">
        <div class="">
          <div class="  bg-white h-1 w-[53px]"></div>
          <div class=" bg-white h-1 w-[30px]  -rotate-45  right-2 bottom-7 absolute"></div>
          <div class=" bg-white h-1 w-[30px]  rotate-45  right-2 top-7 absolute"></div>
        </div>
      </div>
    </div>
  </div>
    
  `
  });
}



getCountUser();