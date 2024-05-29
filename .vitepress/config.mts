import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/saltedfish/logo.png' }]],
  base: "/saltedfish/",
  title: "Yomiko451",
  description: "Yomiko451的个人文档",
  themeConfig: {

    // https://vitepress.dev/reference/default-theme-config

    logo: '/logo.png',
    nav: [
      { text: '技术分享', link: '/doc/技术分享/' },
      { text: '娱乐资讯', link: '/doc/娱乐资讯/' },
      { text: '动漫资讯', link: '/markdown-examples' },
    ],

    sidebar: {
      '/doc/技术分享': [
        {
          text: '简介',
          items: [
            { text: '分享什么', link: '/doc/技术分享/' },
            
          ]
        },
        {
          text: '前端',
          items: [
            { text: '技术分享', link: '/doc/技术分享/' },
            
          ]
        },
        {
          text: 'Rust',
          items: [
            { text: '初次尝试WebAssembly', link: '/doc/技术分享/rust/初次尝试WebAssembly' },
            
          ]
        },
        {
          text: 'Python',
          items: [
            { text: '技术分享', link: '/doc/技术分享/' },
            
          ]
        },
        {
          text: '其他',
          items: [
            { text: 'markdown基本语法', link: '/doc/技术分享/' },
            
          ]
        }
      ],
      '/doc/娱乐资讯/': [
        {
          text: '简介',
          items: [
            { text: '包括哪些', link: '/doc/娱乐资讯/' },
          ]
        },
        {
          text: '动漫',
          items: [
            { text: '动漫', link: '/doc/娱乐资讯/' },
          ]
        },
        {
          text: '游戏',
          items: [
            { text: '游戏', link: '/doc/娱乐资讯/' },
          ]
        },
        {
          text: '其他',
          items: [
            { text: '其他', link: '/doc/娱乐资讯/' },
          ]
        }
      ],    
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yomiko451' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Chen Chao'
    },
  }
})
