// 请求截图
if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}

sleep(1000);

const fuben = require("./fb_meiri");

fuben(3);
