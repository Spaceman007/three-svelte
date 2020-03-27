import App from './App'

const app = new App({
  target: document.querySelector('#root'),
  props: {
    title: 'from earth'
  }
})

export default app
