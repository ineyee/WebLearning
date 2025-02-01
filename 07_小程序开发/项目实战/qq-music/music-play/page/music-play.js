// music-play/page/music-play.js
import { getSongDetail, getLyric } from "../service/music-play-servcie.js";

/*
  视频播放界面我们用的是小程序框架自带的视频播放组件
  但是这里音乐播放界面很明显是自定义音乐播放组件的 UI，所以我们不能用小程序框架自带的音乐播放组件，只能自定义 UI + 使用音频播放库
*/
// 创建音频播放上下文
const _audioPlayer = wx.createInnerAudioContext();

Page({
  data: {
    statusBarHeight: 44,
    contentHeight: 0,

    id: 0,
    songDetail: {},
    lyric: {},
    selectedIndex: 0, // 0-歌曲，1-歌词

    isPlaying: false,
    curDuration: 0,
    totalDuration: 0,
    userChangingSlider: false,
  },

  onLoad(options) {
    const app = getApp();
    this.setData({
      statusBarHeight: app.globalData.safeAreaHeightTop,
      contentHeight: app.globalData.contentHeight,
    });

    this._getSongDetail(options.id);
    this._getLyric(options.id);
    this._prepare(options.id);
  },

  onUnload() {
    this._destroy();
  },

  onTapBack() {
    wx.navigateBack();
  },

  onTapSong() {
    if (this.data.selectedIndex === 0) {
      return;
    }

    this.setData({
      selectedIndex: 0,
    });
  },

  onTapLyric() {
    if (this.data.selectedIndex === 1) {
      return;
    }

    this.setData({
      selectedIndex: 1,
    });
  },

  onTapPlayPause() {
    if (this.data.isPlaying) {
      this._pause();
    } else {
      this._play();
    }
  },

  onIndexChange(event) {
    this.setData({
      selectedIndex: event.detail.current,
    });
  },

  // 用户拖动进度条时
  onSliderValueChanging(event) {
    this.data.userChangingSlider = true;

    this.setData({
      curDuration: event.detail.value,
    });
  },

  // 用户拖动进度条结束时 + 用户点击进度条结束时
  onSliderValueChanged(event) {
    this.data.userChangingSlider = false;

    this.setData({
      curDuration: event.detail.value,
    });
    this._seek(this.data.curDuration);
    console.log("跳转播放：", this.data.curDuration);
  },

  // vm
  async _getSongDetail(id) {
    const data = await getSongDetail(id);
    this.setData({
      songDetail: data,
      totalDuration: data.dt,
    });
  },

  async _getLyric(id) {
    const data = await getLyric(id);
    this.setData({
      lyric: data.lyric,
    });
  },

  // =========== _audioPlayer相关 ===========
  _prepare(id) {
    // 设置音频
    _audioPlayer.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;

    // 监听音频播放错误
    _audioPlayer.onError((error) => {
      console.log("音频播放错误：", error);
    });

    // 监听音频进入可以播放状态
    _audioPlayer.onCanplay(() => {
      console.log("音频进入可以播放状态");
    });

    // 监听音频播放进度更新
    _audioPlayer.onTimeUpdate(() => {
      if (this.data.userChangingSlider === false) {
        this.setData({
          curDuration: _audioPlayer.currentTime * 1000,
        });
        console.log("音频播放进度更新：", this.data.curDuration);
      }
    });

    // 监听音频加载中。当音频因为数据不足，需要停下来加载时会触发
    _audioPlayer.onWaiting(() => {
      console.log("音频加载中...");
    });

    // 监听音频播放结束
    _audioPlayer.onEnded(() => {
      console.log("音频播放结束");

      this.setData({
        isPlaying: false,
        curDuration: 0,
      });
    });
  },

  _play() {
    this.setData({
      isPlaying: true,
    });

    _audioPlayer.play();
  },

  _pause() {
    this.setData({
      isPlaying: false,
    });

    _audioPlayer.pause();
  },

  _seek(position) {
    _audioPlayer.seek(position / 1000);
  },

  _destroy() {
    _audioPlayer.destroy();
  },
})