// 请求截图
if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}

sleep(1000);

var u = require("./util");
var adx = require("./adx");

while (1) {
  sleep(500);
  var img = images.captureScreen();
  var option = { image: img };
  var clickOption = { image: img, click: true };

  if (u.find_image("./assets/任务/选择其中一个任务完成.png", clickOption)) {
    sleep(100);
  }

  if (u.find_image("./assets/任务/选择其中一个任务进行.png", clickOption)) {
    sleep(100);
  }

  if (u.find_image("./assets/任务/跳过对话.png", clickOption)) {
    sleep(100);
  }

  if (u.find_image("./assets/任务/完成对话.png", clickOption)) {
    sleep(100);
  }

  if (u.find_image("./assets/任务/完成对话2.png", clickOption)) {
    sleep(100);
  }

  if (u.find_image("./assets/任务/完成对话3.png", clickOption)) {
    sleep(100);
  }

  if (u.find_image("./assets/任务/领取经历.png", clickOption)) {
    sleep(500);

    // 只领取第一行的任务
    u.find_image("./assets/任务/有新任务小圆点.png", {
      image: img,
      click: true,
      region: [145, 368, 521, 116],
    });
    sleep(500);
  }

  if (u.find_image("./assets/ads/exp_up/经验翻倍活动标识.png", option)) {
    u.find_image("./assets/ads/exp_up/关闭.png", clickOption);
    sleep(500);
  }

  adx.exec();
}
