var util = {};

/**
 * 直到找到图片后再停止查找，如果超时也会中止查找
 * @param {string} name 图片路径
 * @param {object} options timeout: 超时时间
 * @param {object} options timeout_callback: 超时回调事件
 * @param {object} options delay: 点击前等待时间
 * @param {object} options click: 找到图片时是否点击
 * @param {object} options next_callback: 一轮没有找到图片，触发响应方法
 */
util.until_find_image = (name, options) => {
  var tmp = images.read(name);

  var beginTime = Date.now();

  // console.log("等待查找图片", name, options);

  var bClick =
    options != null && options["click"] != null && options["click"] == true;

  var matchResult = false;

  var times = 0;
  do {
    var p = null;
    img = images.captureScreen();
    if (options != null && options["region"] != null) {
      var region = options["region"];
      p = images.findImage(img, tmp, {
        threshold: 0.8,
        region: [region.x, region.y, region.w, region.h],
      });
    } else {
      p = images.findImage(img, tmp, {
        threshold: 0.8,
      });
    }

    if (p != null) {
      if (bClick) {
        var x = p.x + tmp.width * 0.5;
        var y = p.y + tmp.height * 0.5;

        var delay = options["delay"];
        if (delay != null) {
          sleep(delay);
        }

        click(x, y);
        console.log("点击了", x, y);
        var sleepMs = options["sleep"];
        if (sleepMs == null) {
          sleepMs = 1000;
        }
        sleep(sleepMs);
      }

      if (options != null && options["check_callback"] != null) {
        var p2 = images.findImage(images.captureScreen(), tmp, {
          threshold: 0.8,
        });
        if (p2 != null) {
          options["check_callback"]();
        }
      }
      //   toast("找到了" + name);
      console.log("找到了", name);
      matchResult = true;
      break;
    }

    // 循环之间间隔1s
    sleep(1000);

    if (
      options != null &&
      options["timeout"] != null &&
      options["timeout"] > 0
    ) {
      var timeout = options["timeout"];
      var timeoutDelta = Date.now() - beginTime;
      if (timeoutDelta > timeout) {
        if (options["timeout_callback"] != null) {
          options["timeout_callback"]();
        }
        break;
      }
    }

    if (options != null && options["next_callback"]) {
      options["next_callback"](times);
    }

    times++;
  } while (1);
  tmp.recycle();

  if (!bClick) {
    // 如果只是查找图片，不需要点击，等待1s
    sleep(1000);
  }

  return matchResult;
};

util.find_image = (name, options) => {
  var tmp = images.read(name);

  var img;
  if (options == null || options["image"] == null) {
    img = images.captureScreen();
  } else {
    img = options["image"];
  }

  var p = null;
  if (options != null && options["region"] != null) {
    var region = options["region"];
    p = images.findImage(img, tmp, {
      threshold: 0.8,
      region: [region.x, region.y, region.w, region.h],
    });
  } else {
    p = images.findImage(img, tmp, {
      threshold: 0.8,
    });
  }

  if (
    p != null &&
    options != null &&
    options["click"] != null &&
    options["click"] == true
  ) {
    var delay = options["delay"];
    if (delay != null) {
      sleep(delay);
    }

    var times = 1;
    if (options["times"] != null && options["times"] > 0) {
      times = options["times"];
    }
    for (let index = 0; index < times; index++) {
      click(p.x + tmp.width * 0.5, p.y + tmp.height * 0.5);
      console.log("点击了", p.x + tmp.width * 0.5, p.y + tmp.height * 0.5);

      var sleepMs = options["sleep"];
      if (sleepMs == null) {
        sleepMs = 1000;
      }
      sleep(sleepMs);
    }
  }
  tmp.recycle();

  if (p != null) {
    console.log("找到图片", name, p);
  } else {
    console.log("未找到图片", name);
  }
  return p != null;
};

// 点击矩形中心
util.clickR = (x, y, w, h, sleepMs) => {
  var center = util.getCenter(x, y, w, h);
  click(center.x, center.y);
  console.log("区域点击", x, y, w, h, center);

  if (sleepMs != null) {
    sleep(sleepMs);
  }
};

// 点击矩形中心
util.clickWithRect = (rect, sleepMs) => {
  var center = util.getCenter(rect.x, rect.y, rect.w, rect.h);
  click(center.x, center.y);
  console.log("区域点击", rect, center);

  if (sleepMs != null) {
    sleep(sleepMs);
  }
};

util.getCenter = (x, y, w, h) => {
  return {
    x: x + w * 0.5,
    y: y + h * 0.5,
  };
};

util.move = (startPoint, endPoint, durationMs) => {
  swipe(startPoint.x, startPoint.y, endPoint.x, endPoint.y, durationMs);
};

// 添加自动挂机时长
util.add_auto_fight_time = () => {
  // 确认在主页面，否则停留
  util.until_find_image("./assets/main/菜单入口.png", { click: false });

  var entryRect = {
    x: 785,
    y: 1413,
    w: 118,
    h: 112,
  };

  // 点击自动战斗按钮，出现增加时间弹窗
  util.clickWithRect(entryRect, 1000);

  // 等待弹出弹窗
  util.until_find_image("./assets/auto_fight_time_id.png", { click: false });
  var free2hoursRect = {
    x: 1760,
    y: 851,
    w: 211,
    h: 91,
  };

  // 领取免费2小时时长
  util.clickWithRect(free2hoursRect, 1000);

  // 找可以添加时长的按钮，点击3次
  util.find_image("./assets/auto_fight_time_addable_id.png", { click: true });
  util.find_image("./assets/auto_fight_time_addable_id.png", { click: true });
  util.find_image("./assets/auto_fight_time_addable_id.png", { click: true });

  // 关闭弹窗
  var quitRect = {
    x: 1926,
    y: 290,
    w: 87,
    h: 85,
  };
  util.clickWithRect(quitRect, 1000);
};

util.clear_bag = () => {
  // 确认在主页面，否则停留
  util.until_find_image("./assets/main/菜单入口.png", { click: false });

  // 点击背包
  util.clickWithRect(
    {
      x: 2288,
      y: 31,
      w: 97,
      h: 81,
    },
    1000
  );

  // 售卖
  util.until_find_image("./assets/bag_id.png");
  util.clickWithRect(
    {
      x: 2222,
      y: 1378,
      w: 303,
      h: 111,
    },
    1000
  );
  // 物品多的时候，这里可能会加载慢一点
  // 打开了售卖页面
  util.until_find_image("./assets/bag_items_sale_id.png");
  // 点击售卖按钮
  util.clickWithRect(
    {
      x: 2146,
      y: 1382,
      w: 379,
      h: 95,
    },
    1000
  );

  // 售卖确认
  var match = util.until_find_image("./assets/bag_items_sale_dialog_id.png", {
    timeout: 2000,
  });
  if (match != null) {
    util.clickWithRect(
      {
        x: 1312,
        y: 1076,
        w: 538,
        h: 136,
      },
      1000
    );
  }

  sleep(2000);

  // 关闭售卖
  util.until_find_image("./assets/main/关闭菜单.png", { click: true });

  // 分解
  util.until_find_image("./assets/bag_id.png");
  util.clickWithRect(
    {
      x: 1901,
      y: 1378,
      w: 303,
      h: 111,
    },
    1000
  );
  // 物品多的时候，这里可能会加载慢一点
  // 打开了分解页面
  util.until_find_image("./assets/bag_items_break_id.png");
  // 点击分解按钮
  util.clickWithRect(
    {
      x: 2129,
      y: 1374,
      w: 399,
      h: 119,
    },
    1000
  );

  // 分解确认
  var match = util.until_find_image("./assets/bag_items_break_dialog_id.png", {
    timeout: 2000,
  });
  if (match != null) {
    sleep(1000);
    util.clickWithRect(
      {
        x: 1316,
        y: 1309,
        w: 538,
        h: 136,
      },
      1000
    );
  }

  // 分解完成
  var match = util.until_find_image(
    "./assets/bag_items_break_finished_id.png",
    {
      timeout: 2000,
    }
  );
  if (match != null) {
    sleep(1000);
    util.find_image("./assets/bag_items_break_finished_close.png", {
      click: true,
    });
  }

  // 关闭分解
  util.until_find_image("./assets/main/关闭菜单.png", { click: true });

  // 关闭背包
  util.until_find_image("./assets/main/关闭菜单.png", { click: true });
};

// 领取任务奖励
util.get_mission_bonus = () => {
  // 确认在主页面，否则停留
  util.until_find_image("./assets/main/菜单入口.png", { click: true });
  util.until_find_image("./assets/main/任务完成清单.png", { click: true });

  // 进入任务奖励页面
  util.until_find_image("./assets/mission_bonus_id.png");
  var tab1 = {
    x: 4,
    y: 249,
    w: 415,
    h: 183,
  };

  var tab2 = {
    x: 4,
    y: 434,
    w: 415,
    h: 158,
  };

  var tab3 = {
    x: 4,
    y: 601,
    w: 415,
    h: 172,
  };

  var tabs = [tab1, tab2, tab3];

  var getBonusRect = {
    x: 2172,
    y: 1334,
    w: 343,
    h: 146,
  };

  // 依次切换前三个任务tab，并领取奖励
  for (var tab of tabs) {
    util.clickWithRect(tab, 1000);
    util.clickWithRect(getBonusRect, 1000);

    // 如果奖励领取成功，点击确认按钮关闭弹窗
    var success = util.until_find_image(
      "./assets/mission_get_bonus_success_id.png",
      { timeout: 2000 }
    );
    if (success != null) {
      util.find_image("./assets/mission_get_bonus_dialog_close.png", {click: true});
    }
  }

  // 关闭任务页面
  util.until_find_image("./assets/main/关闭菜单.png", { click: true });

  // 关闭主菜单
  util.until_find_image("./assets/main/关闭菜单.png", { click: true });
};

module.exports = util;
