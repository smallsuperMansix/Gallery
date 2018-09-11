const loading = (that) => {
  return () => {
    that.setData({
      pageing: {
        state: 'loading',
        message: '加载中...'
      }
    })
  }
}

const error = (that, message) => {
  return (message = '请检查您的网络连接') => {
    that.setData({
      pageing: {
        state: 'error',
        message
      }
    })
  }
}

const empty = (that, message) => {
  return (message = '没有更多内容了') => {
    that.setData({
      pageing: {
        state: 'empty',
        message
      }
    })
  }
}

const finish = (that) => {
  return () => {
    that.setData({
      pageing: {
        state: 'finish',
        message: ''
      }
    })
  }
}

export default (that) => {
  return {
    loading: loading(that),
    error: error(that),
    empty: empty(that),
    finish: finish(that)
  }
}