// music-play/page/music-play.js
import { getSongDetail, getLyric } from "../service/music-play-servcie.js";
import { parseLyric } from "../../util/parse-lyric-util.js";

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
    lyricInfos: [],
    selectedIndex: 0, // 0-歌曲，1-歌词

    isPlaying: false,
    curDuration: 0,
    totalDuration: 0,
    userChangingSlider: false,

    curLyricIndex: -1,
    curLyricText: "",
    scrollTop: "0rpx",
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

  onTapLyricItem(event) {
    if (event.currentTarget.dataset.index === this.data.curLyricIndex) {
      return;
    }
    this.setData({
      curDuration: event.currentTarget.dataset.time,
      curLyricIndex: event.currentTarget.dataset.index,
      curLyricText: this.data.lyricInfos[event.currentTarget.dataset.index].text,
      scrollTop: `${event.currentTarget.dataset.index * 70}rpx`,
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
    const list = parseLyric(data.lyric);
    this.setData({
      lyricInfos: list,
      curLyricIndex: list.length - 1,
      curLyricText: list[0].text,
    });
  },

  /*
    匹配当前应该点亮的歌词，歌词匹配算法用一句话来概括，其实就是：
    * 选中开始时间比当前播放时间大的那一句歌词，firstWhere 即可停止
    * 然后 index 减 1，就是当前应该点亮的那句歌词
  */
  _matchCurLyric(curTime) {
    // curIndex 的初始值需要设置为数组长度 - 1
    // 因为下面的 for 循环会使得 index 的值最大为 this.data.lyricInfos.length - 1，也就是说下面的 for 循环只能保证最后一句歌词往前的每句歌词被匹配到
    // 所以我们索性把初始值设置为最后一句歌词，如果不到最后一句那就正常通过 for 循环去匹配，如果到了最后一句歌词，for 循环执行完毕也不会改变它，于是就选中最后一句歌词了
    let curIndex = this.data.lyricInfos.length - 1;
    for (let index = 0; index < this.data.lyricInfos.length; index++) {
      const lyricInfo = this.data.lyricInfos[index];
      if (lyricInfo.time > curTime) {
        curIndex = index - 1;
        break;
      }
    }

    if (this.data.curLyricIndex === curIndex) {
      return;
    }
    this.setData({
      curLyricIndex: curIndex,
      curLyricText: this.data.lyricInfos[curIndex].text,
      scrollTop: `${curIndex * 70}rpx`,
    });
    console.log("当前歌词：", this.data.curLyricText);
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
        this._matchCurLyric(_audioPlayer.currentTime * 1000);
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
        scrollTop: "0rpx",
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