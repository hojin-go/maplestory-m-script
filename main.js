
// 请求截图
if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}

sleep(1000);



var u3 = require("./user_util.js");
u3.get_mission_bonus();