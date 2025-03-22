# 浙江越鑫检测技术有限公司网站

这是浙江越鑫检测技术有限公司的官方网站项目。网站使用HTML、CSS和JavaScript构建，采用响应式设计，确保在不同设备上都能提供良好的用户体验。

## 项目描述

网站包含以下主要板块：
- 公司简介
- 服务项目
- 业绩展示
- 我们的优势
- 联系方式

## 技术特点

- 响应式设计，适配各种设备尺寸
- 现代化的UI界面，提供良好的用户体验
- 平滑滚动和动画效果，使用AOS动画库
- 轮播展示业绩案例
- 微信二维码悬浮显示
- 交互性导航栏，显示当前浏览位置
- 视差滚动效果提升视觉体验

## 需要的图片资源

请确保在`images`文件夹中放置以下图片：

1. `banner.jpg` - 网站顶部横幅图片（建议尺寸：1920x1080像素）
2. `about.jpg` - 公司介绍图片（建议尺寸：800x600像素）
3. `achievement1.jpg` ~ `achievement4.jpg` - 业绩展示图片（建议尺寸：600x400像素）
4. `wechat-qrcode.jpg` - 微信联系二维码（建议尺寸：300x300像素）

> 提示：
> - 可以使用公司实际照片
> - 如果暂时没有图片，可以使用占位图片，例如从Unsplash、Pexels或Placeholder.com获取
> - 微信二维码可以通过微信小程序"草料二维码"生成

## 部署说明

1. 确保所有文件放置在正确的目录结构中
2. 将所需的图片放入`images`文件夹
3. 可以直接通过浏览器打开`index.html`查看本地效果
4. 部署到服务器时，将所有文件上传至服务器根目录

## 更新联系信息

若需更新联系信息，请编辑`index.html`文件中的联系部分：

```html
<!-- 联系我们 -->
<section id="contact" class="section">
    <div class="container">
        <div class="section-header">
            <h2>联系我们</h2>
            <div class="line"></div>
        </div>
        <div class="contact-container">
            <div class="contact-info">
                <!-- 地址 -->
                <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <h4>地址</h4>
                        <p>浙江省嘉兴市南湖区亚太路522号2幢302室</p>
                    </div>
                </div>
                <!-- 电话 -->
                <div class="info-item">
                    <i class="fas fa-phone-alt"></i>
                    <div>
                        <h4>电话</h4>
                        <p>13735395726（徐经理）</p>
                    </div>
                </div>
                <!-- 微信 -->
                <div class="info-item">
                    <i class="fab fa-weixin"></i>
                    <div>
                        <h4>微信</h4>
                        <p>
                            <div class="wechat-container">
                                <span>扫码添加微信</span>
                                <div class="wechat-qrcode">
                                    <img src="images/wechat-qrcode.jpg" alt="微信二维码">
                                </div>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

## 自定义样式

网站设计采用了变量定义主题颜色，可以通过修改`css/styles.css`文件中的根变量来快速更改网站整体色调：

```css
:root {
    --primary-color: #0056b3;    /* 主色调 */
    --secondary-color: #003a7a;  /* 次色调 */
    --light-color: #e0f0ff;      /* 浅色调 */
    --dark-color: #001f40;       /* 深色调 */
    --white-color: #ffffff;      /* 白色 */
    --grey-color: #f8f9fa;       /* 灰色背景 */
    --dark-grey: #333333;        /* 深灰色文字 */
}
```

## 动画设置

网站使用AOS（Animate On Scroll）库实现滚动动画效果。如需调整动画，可以修改`js/main.js`文件中的AOS初始化参数：

```javascript
// 初始化AOS动画库
AOS.init({
    duration: 1000,         // 动画持续时间
    once: true,             // 是否只播放一次
    offset: 100,            // 触发偏移量
    delay: 100,             // 延迟时间
    easing: 'ease-in-out'   // 缓动函数
});
```

## 浏览器兼容性

网站兼容所有现代浏览器，包括：
- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 联系方式

如有任何问题，请联系徐经理：
- 电话：13735395726
- 微信：扫描网站上的二维码添加

---

版权所有 © 2023 浙江越鑫检测技术有限公司 