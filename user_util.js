var u = require("./util.js");

module.exports = {
  add_auto_fight_time: () => {
    // 确认在主页面，否则停留
    u.until_find_image("./assets/main/菜单入口.png", { click: false });

    var entryRect = {
      x: 785,
      y: 1413,
      w: 118,
      h: 112,
    };

    // 点击自动战斗按钮，出现增加时间弹窗
    u.clickWithRect(entryRect, 1000);

    // 等待弹出弹窗
    u.until_find_image("./assets/auto_fight_time_id.png", { click: false });
    var free2hoursRect = {
      x: 1760,
      y: 851,
      w: 211,
      h: 91,
    };

    // 领取免费2小时时长
    u.clickWithRect(free2hoursRect, 1000);

    // 找可以添加时长的按钮，点击3次
    u.find_image("./assets/auto_fight_time_addable_id.png", { click: true });
    u.find_image("./assets/auto_fight_time_addable_id.png", { click: true });
    u.find_image("./assets/auto_fight_time_addable_id.png", { click: true });

    // 关闭弹窗
    var quitRect = {
      x: 1926,
      y: 290,
      w: 87,
      h: 85,
    };
    u.clickWithRect(quitRect, 1000);
  },
  clear_bag: () => {
    // 确认在主页面，否则停留
    u.until_find_image("./assets/main/菜单入口.png", { click: false });

    // 点击背包
    u.clickWithRect(
      {
        x: 2288,
        y: 31,
        w: 97,
        h: 81,
      },
      1000
    );

    // 售卖
    u.until_find_image("./assets/bag_id.png");
    u.clickWithRect(
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
    u.until_find_image("./assets/bag_items_sale_id.png");
    // 点击售卖按钮
    u.clickWithRect(
      {
        x: 2146,
        y: 1382,
        w: 379,
        h: 95,
      },
      1000
    );

    // 售卖确认
    var match = u.until_find_image("./assets/bag_items_sale_dialog_id.png", {
      timeout: 2000,
    });
    if (match != null) {
      u.clickWithRect(
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
    u.until_find_image("./assets/main/关闭菜单.png", { click: true });

    // 分解
    u.until_find_image("./assets/bag_id.png");
    u.clickWithRect(
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
    u.until_find_image("./assets/bag_items_break_id.png");
    // 点击分解按钮
    u.clickWithRect(
      {
        x: 2129,
        y: 1374,
        w: 399,
        h: 119,
      },
      1000
    );

    // 分解确认
    var match = u.until_find_image("./assets/bag_items_break_dialog_id.png", {
      timeout: 2000,
    });
    if (match != null) {
      sleep(1000);
      u.clickWithRect(
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
    var match = u.until_find_image("./assets/bag_items_break_finished_id.png", {
      timeout: 2000,
    });
    if (match != null) {
      sleep(1000);
      u.find_image("./assets/bag_items_break_finished_close.png", {
        click: true,
      });
    }

    // 关闭分解
    u.until_find_image("./assets/main/关闭菜单.png", { click: true });

    // 关闭背包
    u.until_find_image("./assets/main/关闭菜单.png", { click: true });
  },
  get_mission_bonus: () => {
    // 确认在主页面，否则停留
    u.until_find_image("./assets/main/菜单入口.png", { click: true });
    u.until_find_image("./assets/main/任务完成清单.png", { click: true });

    // 进入任务奖励页面
    u.until_find_image("./assets/mission_bonus_id.png");
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
      u.clickWithRect(tab, 1000);
      u.clickWithRect(getBonusRect, 1000);

      // 如果奖励领取成功，点击确认按钮关闭弹窗
      var success = u.until_find_image(
        "./assets/mission_get_bonus_success_id.png",
        { timeout: 2000 }
      );
      if (success != null) {
        u.find_image("./assets/mission_get_bonus_dialog_close.png", {
          click: true,
        });
      }
    }

    // 关闭任务页面
    u.until_find_image("./assets/main/关闭菜单.png", { click: true });

    // 关闭主菜单
    u.until_find_image("./assets/main/关闭菜单.png", { click: true });
  },
  receive_msg: () => {
    // 确认在首页
    u.until_find_image("./assets/main_menu_msg_box.png", { click: true });

    // 确认在信箱弹窗
    u.until_find_image("./assets/msg_open_id.png");

    // 切换公用， 并全部领取
    var pubRect = {
      x: 466,
      y: 333,
      w: 536,
      h: 95,
    };
    u.clickWithRect(pubRect, 1000);

    // 等待领取成功弹窗，超时2s，如果弹出，关闭弹窗
    if (
      u.until_find_image("./assets/btn_all_receive.png", {
        click: true,
        timeout: 2000,
      }) != null
    ) {
      u.until_find_image("./assets/btn_confirm.png", {
        click: true,
        timeout: 2000,
      });
    }

    // 切换个人信箱，并全部领取
    var personalRect = {
      x: 1013,
      y: 333,
      w: 549,
      h: 95,
    };
    u.clickWithRect(personalRect, 1000);

    // 等待领取成功弹窗，超时2s，如果弹出，关闭弹窗
    if (
      u.until_find_image("./assets/btn_all_receive.png", {
        click: true,
        timeout: 2000,
      }) != null
    ) {
      u.until_find_image("./assets/btn_confirm.png", {
        click: true,
        timeout: 2000,
      });
    }
    // 关闭信箱
    u.until_find_image("./assets/main/关闭菜单.png", { click: true });

    // 关闭菜单
    u.until_find_image("./assets/main/关闭菜单.png", { click: true });
  },
};
