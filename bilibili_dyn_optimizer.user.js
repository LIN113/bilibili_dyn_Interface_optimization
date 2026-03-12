// ==UserScript==
// @name         Bilibili动态界面优化
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  扩展主内容区域宽度并移除右侧边栏
// @author       You
// @match        https://t.bilibili.com/?tab=video
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  // 添加自定义样式
  const style = document.createElement("style");
  style.textContent = `
        /* 设置纯白色背景 */
        html, body {
            background-color: #ffffff !important;
        }

        .bili-header,
        .bili-header__channel,
        .bili-header__banner,
        #app,
        main,
        .bili-dyn-list__items {
            background-color: #ffffff !important;
        }

        /* 扩展主内容区域宽度 */
        main {
            max-width: 90% !important;
            width: 90% !important;
            margin: 0 auto !important;
        }

        /* 隐藏右侧边栏 */
        aside.right {
            display: none !important;
        }

        /* 动态列表容器 - 网格布局 */
        .bili-dyn-list__items {
            display: grid !important;
            grid-template-columns: repeat(auto-fill, 310px) !important;
            grid-auto-rows: 269.38px !important;
            gap: 16px !important;
            padding: 20px !important;
            justify-content: center !important;
            align-items: start !important;
            /* 覆盖瀑布流布局 */
            height: auto !important;
            position: relative !important;
        }

        /* 隐藏非视频类型的动态 */
        .bili-dyn-list__item:not(:has(.bili-dyn-card-video)) {
            display: none !important;
        }

        /* 单个动态项容器 */
        .bili-dyn-list__item {
            width: 310px !important;
            max-width: 310px !important;
            min-width: 310px !important;
            height: 269.38px !important;
            max-height: 269.38px !important;
            min-height: 269.38px !important;
            position: relative !important;
            transform: none !important;
            top: auto !important;
            left: auto !important;
            margin: 0 !important;
            /* 强制覆盖可能的绝对定位 */
            inset: auto !important;
            overflow: hidden !important;
        }

        /* B站首页卡片样式 */
        .bili-dyn-item {
            width: 310px !important;
            max-width: 310px !important;
            min-width: 310px !important;
            height: 269.38px !important;
            max-height: 269.38px !important;
            min-height: 269.38px !important;
            background: #fff !important;
            border-radius: 20px !important;
            overflow: hidden !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08) !important;
            border: 0.2px solid #ececec !important;
            display: flex !important;
            flex-direction: column !important;
            cursor: pointer !important;
            padding: 0 !important;
            margin: 0 !important;
            position: relative !important;
        }

        .bili-dyn-item::before {
            content: '' !important;
            display: block !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        .bili-dyn-item:hover {
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12) !important;
            transform: translateY(-2px) !important;
            border-color: #00aeec !important;
        }

        /* 卡片内部布局优化 */
        .bili-dyn-item__main {
            width: 310px !important;
            max-width: 310px !important;
            height: 269.38px !important;
            max-height: 269.38px !important;
            padding: 0 !important;
            margin: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            overflow: hidden !important;
            gap: 0 !important;
        }

        /* 隐藏头像区域 */
        .bili-dyn-item__avatar {
            display: none !important;
        }

        /* 头部区域 - 包含作者和时间信息 */
        .bili-dyn-item__header {
            order: 2 !important;
            padding: 0 !important;
            margin: 0 !important;
            min-height: 0 !important;
        }

        /* 头部区域中的描述信息（作者、时间等） */
        .bili-dyn-item__header .bili-dyn-item__desc {
            display: block !important;
            padding: 6px 10px !important;
            margin: 0 !important;
        }

        /* 图片区域样式 */
        .bili-dyn-item__body {
            order: 1 !important;
            padding: 0 !important;
            margin: 0 !important;
            position: relative !important;
            line-height: 0 !important;
            font-size: 0 !important;
            display: block !important;
        }

        /* 移除B站原有的margin-top */
        .bili-dyn-content__orig__additional,
        .bili-dyn-content__orig__major.gap,
        .bili-dyn-content__orig__major.suit-video-card {
            margin-top: 0 !important;
        }

        /* 视频卡片容器 - 改为垂直布局 */
        .bili-dyn-card-video {
            width: 310px !important;
            max-width: 310px !important;
            height: 269.38px !important;
            max-height: 269.38px !important;
            flex-direction: column !important;
            border-radius: 0 !important;
            overflow: hidden !important;
            display: flex !important;
            margin: 0 !important;
            padding: 0 !important;
            vertical-align: top !important;
            gap: 0 !important;
        }

        /* 视频卡片封面区域 */
        .bili-dyn-card-video__header {
            width: 310px !important;
            max-width: 310px !important;
            height: 174.375px !important;
            max-height: 174.375px !important;
            min-height: 174.375px !important;
            position: relative !important;
            flex-shrink: 0 !important;
            overflow: hidden !important;
            border-radius: 20px 20px 0 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            display: block !important;
        }

        .bili-dyn-card-video__cover {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            border-radius: 20px 20px 0 0 !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        .bili-dyn-card-video__cover img,
        .bili-dyn-card-video__cover picture,
        .bili-dyn-card-video__cover .b-img,
        .bili-dyn-card-video__cover .b-img__inner {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            display: block !important;
        }

        /* 封面遮罩层 - 始终显示 */
        .bili-dyn-card-video__cover-shadow {
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            height: 40px !important;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent) !important;
            border-radius: 0 !important;
            opacity: 1 !important;
            transition: opacity 0.3s ease !important;
            display: flex !important;
            align-items: flex-end !important;
            padding: 0 8px 6px !important;
            box-sizing: border-box !important;
        }

        /* 时长标签 */
        .bili-dyn-card-video__cover-shadow .duration-time {
            position: absolute !important;
            bottom: 6px !important;
            right: 8px !important;
            font-size: 12px !important;
            color: #fff !important;
            background: rgba(0, 0, 0, 0.6) !important;
            padding: 2px 6px !important;
            border-radius: 4px !important;
        }

        /* 视频卡片内容区域 */
        .bili-dyn-card-video__body {
            width: 310px !important;
            max-width: 310px !important;
            height: 95px !important;
            max-height: 95px !important;
            min-height: 95px !important;
            border: none !important;
            border-radius: 0 !important;
            padding: 8px 10px !important;
            position: relative !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 4px !important;
        }

        /* 作者名称样式 */
        .bili-dyn-card-video__author {
            font-size: 12px !important;
            line-height: 16px !important;
            color: #61666d !important;
            margin: 0 0 2px 0 !important;
            padding: 0 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
        }

        /* 视频卡片标题 */
        .bili-dyn-card-video__title {
            font-size: 13px !important;
            line-height: 18px !important;
            color: #18191c !important;
            font-weight: 500 !important;
            padding: 0 !important;
            margin: 0 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            word-break: break-word !important;
            flex: 0 0 auto !important;
            max-height: 42px !important;
        }

        /* 显示bili-dyn-title作为作者信息 */
        .bili-dyn-card-video__body .bili-dyn-title {
            display: block !important;
            padding: 0 !important;
            margin: 0 !important;
            order: 1 !important;
        }

        .bili-dyn-card-video__body .bili-dyn-title__text {
            font-size: 13px !important;
            line-height: 18px !important;
            color: #18191c !important;
            font-weight: 500 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            word-break: break-word !important;
            max-height: 36px !important;
        }

        .bili-dyn-card-video__title:hover {
            color: #00aeec !important;
        }

        /* 隐藏视频卡片描述 */
        .bili-dyn-card-video__desc {
            display: none !important;
        }

        /* 视频卡片统计信息 - 移到图片上 */
        .bili-dyn-card-video__stat {
            position: absolute !important;
            bottom: 6px !important;
            left: 8px !important;
            right: 60px !important;
            margin: 0 !important;
            height: auto !important;
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
            font-size: 12px !important;
            color: #fff !important;
            z-index: 10 !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8) !important;
        }

        .bili-dyn-card-video__stat > span,
        .bili-dyn-card-video__stat > div {
            display: flex !important;
            align-items: center !important;
            gap: 4px !important;
            color: #fff !important;
        }

        .bili-dyn-card-video__stat svg {
            width: 16px !important;
            height: 16px !important;
            fill: #fff !important;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8)) !important;
        }

        .bili-dyn-card-video__stat svg path {
            fill: #fff !important;
        }

        /* 确保header中的统计信息显示 */
        .bili-dyn-card-video__header .bili-dyn-card-video__stat {
            display: flex !important;
        }

        /* 隐藏body中的统计信息（已移到图片上） */
        .bili-dyn-card-video__body .bili-dyn-card-video__stat {
            display: none !important;
        }

        /* 标题样式 - 类似首页卡片 */
        .bili-dyn-title {
            order: 2 !important;
            padding: 8px 10px 0 !important;
            margin: 0 !important;
            display: block !important;
        }

        .bili-dyn-title__text {
            font-size: 13px !important;
            line-height: 18px !important;
            color: #18191c !important;
            font-weight: 500 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            word-break: break-word !important;
            max-height: 36px !important;
            margin: 0 !important;
        }

        .bili-dyn-title__text:hover {
            color: #00aeec !important;
        }

        /* 底部信息区域 */
        .bili-dyn-item__footer {
            order: 3 !important;
            padding: 4px 10px 8px !important;
            margin: 0 !important;
        }

        /* 描述信息样式 - 显示作者和时间 */
        .bili-dyn-item__desc {
            padding: 4px 10px !important;
            margin: 0 !important;
            font-size: 12px !important;
            line-height: 16px !important;
            color: #61666d !important;
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
        }

        /* 作者信息样式 */
        .bili-dyn-item__author {
            font-size: 12px !important;
            color: #9499a0 !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 4px !important;
        }

        .bili-dyn-item__author:hover {
            color: #00aeec !important;
        }

        /* 时间信息样式 */
        .bili-dyn-time {
            font-size: 12px !important;
            color: #9499a0 !important;
            display: inline-flex !important;
            align-items: center !important;
        }

        /* 统计信息样式 */
        .bili-dyn-item__stat {
            font-size: 12px !important;
            color: #9499a0 !important;
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
        }

        .bili-dyn-item__stat > span {
            display: flex !important;
            align-items: center !important;
            gap: 4px !important;
        }

        /* 隐藏不需要的元素 */
        .bili-dyn-item__interaction,
        .bili-dyn-item__ornament,
        .bili-dyn-content__orig__desc {
            display: none !important;
        }

        /* 图片类型动态优化 */
        .bili-dyn-item__body img {
            width: 100% !important;
            height: auto !important;
            display: block !important;
            border-radius: 20px 20px 0 0 !important;
        }

        /* 响应式优化 */
        @media (max-width: 1600px) {
            .bili-dyn-list__items {
                grid-template-columns: repeat(auto-fill, 310px) !important;
                grid-auto-rows: 269.38px !important;
            }
            .bili-dyn-list__item,
            .bili-dyn-item,
            .bili-dyn-item__main,
            .bili-dyn-card-video {
                width: 310px !important;
                max-width: 310px !important;
                height: 269.38px !important;
                max-height: 269.38px !important;
            }
            .bili-dyn-card-video__header {
                width: 310px !important;
                height: 174.375px !important;
            }
            .bili-dyn-card-video__body {
                width: 310px !important;
                height: 95px !important;
            }
        }

        @media (max-width: 1200px) {
            .bili-dyn-list__items {
                grid-template-columns: repeat(auto-fill, 310px) !important;
                grid-auto-rows: 269.38px !important;
            }
            .bili-dyn-list__item,
            .bili-dyn-item,
            .bili-dyn-item__main,
            .bili-dyn-card-video {
                width: 310px !important;
                max-width: 310px !important;
                height: 269.38px !important;
                max-height: 269.38px !important;
            }
            .bili-dyn-card-video__header {
                width: 310px !important;
                height: 174.375px !important;
            }
            .bili-dyn-card-video__body {
                width: 310px !important;
                height: 95px !important;
            }
        }
    `;
  document.head.appendChild(style);

  // 等待DOM加载完成后移除右侧边栏元素
  function removeRightAside() {
    const rightAside = document.querySelector("aside.right");
    if (rightAside) {
      rightAside.remove();
      console.log("已移除右侧边栏");
    }
  }

  function removeleftAside() {
    const leftAside = document.querySelector("aside.left");
    if (leftAside) {
      leftAside.remove();
      console.log("已移除左侧边栏");
    }
  }

  function removePublishing() {
    const publishing = document.querySelector("div.bili-dyn-publishing");
    if (publishing) {
      publishing.remove();
      console.log("已移除发布动态区域");
    }
  }

  // 修复卡片布局
  function fixCardLayout() {
    const items = document.querySelectorAll(".bili-dyn-list__item");
    items.forEach((item) => {
      // 强制设置尺寸
      item.style.setProperty("width", "310px", "important");
      item.style.setProperty("max-width", "310px", "important");
      item.style.setProperty("min-width", "310px", "important");
      item.style.setProperty("height", "269.38px", "important");
      item.style.setProperty("max-height", "269.38px", "important");
      item.style.setProperty("min-height", "269.38px", "important");
      // 移除可能导致重叠的样式
      item.style.setProperty("position", "relative", "important");
      item.style.setProperty("transform", "none", "important");
      item.style.setProperty("top", "auto", "important");
      item.style.setProperty("left", "auto", "important");
      item.style.setProperty("margin", "0", "important");
      item.style.setProperty("inset", "auto", "important");
      item.style.setProperty("overflow", "hidden", "important");
    });

    // 确保容器使用网格布局
    const container = document.querySelector(".bili-dyn-list__items");
    if (container) {
      container.style.setProperty("display", "grid", "important");
      container.style.setProperty(
        "grid-template-columns",
        "repeat(auto-fill, 310px)",
        "important",
      );
      container.style.setProperty("grid-auto-rows", "269.38px", "important");
      container.style.setProperty("height", "auto", "important");
    }

    // 将统计信息移到图片上并填充SVG图标，添加作者名称
    document.querySelectorAll(".bili-dyn-card-video").forEach((card) => {
      const stat = card.querySelector(".bili-dyn-card-video__body .bili-dyn-card-video__stat");
      const header = card.querySelector(".bili-dyn-card-video__header");
      const body = card.querySelector(".bili-dyn-card-video__body");
      const title = body?.querySelector(".bili-dyn-card-video__title");

      // 添加统计信息到header
      if (stat && header && !header.querySelector(".bili-dyn-card-video__stat")) {
        const statClone = stat.cloneNode(true);
        const statItems = statClone.querySelectorAll(".bili-dyn-card-video__stat__item");

        statItems.forEach((item, index) => {
          const svg = item.querySelector("svg");
          if (svg && !svg.querySelector("path")) {
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("fill", "#ffffff");

            if (index === 0) {
              svg.innerHTML = '<path d="M12 4.99805C9.48178 4.99805 7.283 5.12616 5.73089 5.25202C4.65221 5.33949 3.81611 6.16352 3.72 7.23254C3.60607 8.4998 3.5 10.171 3.5 11.998C3.5 13.8251 3.60607 15.4963 3.72 16.76355C3.81611 17.83255 4.65221 18.6566 5.73089 18.7441C7.283 18.8699 9.48178 18.998 12 18.998C14.5185 18.998 16.7174 18.8699 18.2696 18.74405C19.3481 18.65655 20.184 17.8328 20.2801 16.76405C20.394 15.4973 20.5 13.82645 20.5 11.998C20.5 10.16965 20.394 8.49877 20.2801 7.23205C20.184 6.1633 19.3481 5.33952 18.2696 5.25205C16.7174 5.12618 14.5185 4.99805 12 4.99805zM5.60965 3.75693C7.19232 3.62859 9.43258 3.49805 12 3.49805C14.5677 3.49805 16.8081 3.62861 18.3908 3.75696C20.1881 3.90272 21.6118 5.29278 21.7741 7.09773C21.8909 8.3969 22 10.11405 22 11.998C22 13.88205 21.8909 15.5992 21.7741 16.8984C21.6118 18.7033 20.1881 20.09335 18.3908 20.23915C16.8081 20.3675 14.5677 20.498 12 20.498C9.43258 20.498 7.19232 20.3675 5.60965 20.2392C3.81206 20.0934 2.38831 18.70295 2.22603 16.8979C2.10918 15.5982 2 13.8808 2 11.998C2 10.1153 2.10918 8.39787 2.22603 7.09823C2.38831 5.29312 3.81206 3.90269 5.60965 3.75693z" fill="currentColor"></path><path d="M14.7138 10.96875C15.50765 11.4271 15.50765 12.573 14.71375 13.0313L11.5362 14.8659C10.74235 15.3242 9.75 14.7513 9.75001 13.8346L9.75001 10.1655C9.75001 9.24881 10.74235 8.67587 11.5362 9.13422L14.7138 10.96875z" fill="currentColor"></path>';
            } else if (index === 1) {
              svg.innerHTML = '<path d="M12 4.99805C9.48178 4.99805 7.283 5.12616 5.73089 5.25202C4.65221 5.33949 3.81611 6.16352 3.72 7.23254C3.60607 8.4998 3.5 10.171 3.5 11.998C3.5 13.8251 3.60607 15.4963 3.72 16.76355C3.81611 17.83255 4.65221 18.6566 5.73089 18.7441C7.283 18.8699 9.48178 18.998 12 18.998C14.5185 18.998 16.7174 18.8699 18.2696 18.74405C19.3481 18.65655 20.184 17.8328 20.2801 16.76405C20.394 15.4973 20.5 13.82645 20.5 11.998C20.5 10.16965 20.394 8.49877 20.2801 7.23205C20.184 6.1633 19.3481 5.33952 18.2696 5.25205C16.7174 5.12618 14.5185 4.99805 12 4.99805zM5.60965 3.75693C7.19232 3.62859 9.43258 3.49805 12 3.49805C14.5677 3.49805 16.8081 3.62861 18.3908 3.75696C20.1881 3.90272 21.6118 5.29278 21.7741 7.09773C21.8909 8.3969 22 10.11405 22 11.998C22 13.88205 21.8909 15.5992 21.7741 16.8984C21.6118 18.7033 20.1881 20.09335 18.3908 20.23915C16.8081 20.3675 14.5677 20.498 12 20.498C9.43258 20.498 7.19232 20.3675 5.60965 20.2392C3.81206 20.0934 2.38831 18.70295 2.22603 16.8979C2.10918 15.5982 2 13.8808 2 11.998C2 10.1153 2.10918 8.39787 2.22603 7.09823C2.38831 5.29312 3.81206 3.90269 5.60965 3.75693z" fill="currentColor"></path><path d="M15.875 10.75L9.875 10.75C9.46079 10.75 9.125 10.4142 9.125 10C9.125 9.58579 9.46079 9.25 9.875 9.25L15.875 9.25C16.2892 9.25 16.625 9.58579 16.625 10C16.625 10.4142 16.2892 10.75 15.875 10.75z" fill="currentColor"></path><path d="M17.375 14.75L11.375 14.75C10.9608 14.75 10.625 14.4142 10.625 14C10.625 13.5858 10.9608 13.25 11.375 13.25L17.375 13.25C17.7892 13.25 18.125 13.5858 18.125 14C18.125 14.4142 17.7892 14.75 17.375 14.75z" fill="currentColor"></path><path d="M7.875 10C7.875 10.4142 7.53921 10.75 7.125 10.75L6.625 10.75C6.21079 10.75 5.875 10.4142 5.875 10C5.875 9.58579 6.21079 9.25 6.625 9.25L7.125 9.25C7.53921 9.25 7.875 9.58579 7.875 10z" fill="currentColor"></path><path d="M9.375 14C9.375 14.4142 9.03921 14.75 8.625 14.75L8.125 14.75C7.71079 14.75 7.375 14.4142 7.375 14C7.375 13.5858 7.71079 13.25 8.125 13.25L8.625 13.25C9.03921 13.25 9.375 13.5858 9.375 14z" fill="currentColor"></path>';
            }
          }
        });

        header.appendChild(statClone);
      }

      // 添加作者名称到标题上方
      if (body && title && !body.querySelector(".bili-dyn-card-video__author")) {
        const dynItem = card.closest(".bili-dyn-list__item");
        const authorText = dynItem?.querySelector(".bili-dyn-title__text");

        if (authorText) {
          const authorDiv = document.createElement("div");
          authorDiv.className = "bili-dyn-card-video__author";
          authorDiv.textContent = authorText.textContent.trim();
          body.insertBefore(authorDiv, title);
        }
      }
    });
  }

  // 立即执行一次
  removeRightAside();
  removeleftAside();
  removePublishing();

  // 延迟执行布局修复，确保页面加载完成
  setTimeout(fixCardLayout, 500);
  setTimeout(fixCardLayout, 1000);
  setTimeout(fixCardLayout, 2000);

  // 使用MutationObserver监听DOM变化，防止动态加载的元素
  const observer = new MutationObserver(() => {
    removeRightAside();
    removeleftAside();
    removePublishing();
    fixCardLayout();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
