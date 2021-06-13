import SimpleReact from './simpleReact'
window.React = {}
React.createElement = SimpleReact.createElement

class Cpp extends SimpleReact.Component {
    render() {
        return (
            <div>
                <h1>111</h1>
                <h2>2222</h2>
                <Bpp />
            </div>
        )
    }
}


class Bpp extends SimpleReact.Component {
    render() {
        return <h3>我是Bpp</h3>
    }
}

class App extends SimpleReact.Component {
    constructor() {
        super()
        this.state = {
            count: 0
        }

        setInterval(() => {
            this.setState({
                count: this.state.count + 1,
            })
        }, 1000)
    }
    render() {
        return (
            <div>
                <h1><div>{this.state.count}</div></h1>
                <h2>我是h2<div></div></h2>
                <h3>我是h3</h3>
            </div>
        )
    }
}
SimpleReact.render(<App />, document.querySelector('#app'))
