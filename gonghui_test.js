// 请求截图
if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}

sleep(1000);

const gonghui = require("./fb_gonghui");

gonghui();
