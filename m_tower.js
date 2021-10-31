var u = require("./util");

while (1) {
  var img = images.captureScreen();
  if (u.find_image("./assets/m_tower/按钮/无法进入.png", { image: img })) {
    break;
  }

  sleep(1000);
  u.find_image("./assets/m_tower/按钮/进入下一层.png", {
    click: true,
    image: img,
  });
}
